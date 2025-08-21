#!/usr/bin/env python3
import os
import re
import glob
from collections import defaultdict

def extract_css_classes_from_scss():
    """Extract all CSS classes defined in SCSS files"""
    defined_classes = set()
    class_locations = defaultdict(list)

    # Find all SCSS files
    scss_files = glob.glob('src/scss/**/*.scss', recursive=True)

    for file_path in scss_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.split('\n')

                for line_num, line in enumerate(lines, 1):
                    # Find CSS class definitions
                    class_pattern = r'\.([a-zA-Z][a-zA-Z0-9_-]*)'
                    classes = re.findall(class_pattern, line)

                    for class_name in classes:
                        defined_classes.add(class_name)
                        class_locations[class_name].append(f"{file_path}:{line_num}")

        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    return defined_classes, class_locations

def extract_used_classes_from_files():
    """Extract all CSS classes used in HTML, TSX, and JS files"""
    used_classes = set()
    usage_locations = defaultdict(list)

    # Find all relevant files
    html_files = glob.glob('*.html')
    tsx_files = glob.glob('src/**/*.tsx', recursive=True)
    js_files = glob.glob('src/**/*.js', recursive=True)
    js_files.extend(glob.glob('src/**/*.jsx', recursive=True))

    all_files = html_files + tsx_files + js_files

    for file_path in all_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.split('\n')

                for line_num, line in enumerate(lines, 1):
                    # Find class attributes in HTML
                    class_pattern = r'class=["\']([^"\']*)["\']'
                    class_matches = re.findall(class_pattern, line)

                    for class_string in class_matches:
                        classes = class_string.split()
                        for class_name in classes:
                            used_classes.add(class_name)
                            usage_locations[class_name].append(f"{file_path}:{line_num}")

                    # Find className attributes in TSX/JSX
                    className_pattern = r'className=["\']([^"\']*)["\']'
                    className_matches = re.findall(className_pattern, line)

                    for class_string in className_matches:
                        classes = class_string.split()
                        for class_name in classes:
                            used_classes.add(class_name)
                            usage_locations[class_name].append(f"{file_path}:{line_num}")

                    # Find dynamic class usage (template literals, string concatenation)
                    dynamic_patterns = [
                        r'["\']([a-zA-Z][a-zA-Z0-9_-]*)["\']',  # String literals
                        r'`([a-zA-Z][a-zA-Z0-9_-]*)`',  # Template literals
                        r'className\s*\+\s*["\']([a-zA-Z][a-zA-Z0-9_-]*)["\']',  # String concatenation
                    ]

                    for pattern in dynamic_patterns:
                        matches = re.findall(pattern, line)
                        for class_name in matches:
                            if class_name not in ['true', 'false', 'null', 'undefined']:
                                used_classes.add(class_name)
                                usage_locations[class_name].append(f"{file_path}:{line_num} (dynamic)")

        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    return used_classes, usage_locations

def analyze_css_usage():
    """Main function to analyze CSS usage"""
    print("🔍 Analyzing CSS usage in detail...")

    # Extract defined and used classes
    defined_classes, class_locations = extract_css_classes_from_scss()
    used_classes, usage_locations = extract_used_classes_from_files()

    print(f"📊 Found {len(defined_classes)} defined CSS classes")
    print(f"📊 Found {len(used_classes)} used CSS classes")

    # Find unused classes
    unused_classes = defined_classes - used_classes

    print(f"🗑️  Found {len(unused_classes)} potentially unused CSS classes")

    # Find classes that are used but not defined (might be from external libraries)
    undefined_classes = used_classes - defined_classes

    print(f"❓ Found {len(undefined_classes)} used classes that are not defined in SCSS")

    # Save detailed results
    with open('unused_css_detailed.txt', 'w', encoding='utf-8') as f:
        f.write("Potentially unused CSS classes with locations:\n")
        f.write("=" * 60 + "\n\n")

        for class_name in sorted(unused_classes):
            f.write(f"🔴 {class_name}\n")
            for location in class_locations[class_name]:
                f.write(f"   📍 {location}\n")
            f.write("\n")

    # Categorize unused classes
    categories = {
        'advertising': [],
        'layout': [],
        'typography': [],
        'components': [],
        'utilities': [],
        'other': []
    }

    for class_name in unused_classes:
        if any(prefix in class_name.lower() for prefix in ['ad', 'banner', 'annonse']):
            categories['advertising'].append(class_name)
        elif any(prefix in class_name.lower() for prefix in ['layout', 'grid', 'row', 'column', 'desktop', 'mobile']):
            categories['layout'].append(class_name)
        elif any(prefix in class_name.lower() for prefix in ['font', 'text', 'typography', 'headline', 'body']):
            categories['typography'].append(class_name)
        elif any(prefix in class_name.lower() for prefix in ['button', 'form', 'input', 'modal', 'dialog']):
            categories['components'].append(class_name)
        elif any(prefix in class_name.lower() for prefix in ['bg-', 'color', 'border', 'margin', 'padding']):
            categories['utilities'].append(class_name)
        else:
            categories['other'].append(class_name)

    # Save categorized results
    with open('unused_css_categorized.txt', 'w', encoding='utf-8') as f:
        f.write("Unused CSS classes by category:\n")
        f.write("=" * 40 + "\n\n")

        for category, classes in categories.items():
            if classes:
                f.write(f"📂 {category.upper()} ({len(classes)} classes):\n")
                f.write("-" * 30 + "\n")
                for class_name in sorted(classes):
                    f.write(f"  • {class_name}\n")
                f.write("\n")

    # Print summary
    print("\n📋 Summary:")
    print(f"✅ Defined classes: {len(defined_classes)}")
    print(f"✅ Used classes: {len(used_classes)}")
    print(f"❌ Potentially unused: {len(unused_classes)}")
    print(f"❓ Undefined but used: {len(undefined_classes)}")

    print(f"\n📂 Unused classes by category:")
    for category, classes in categories.items():
        if classes:
            print(f"   {category}: {len(classes)} classes")

    if unused_classes:
        print(f"\n🗑️  Top 20 potentially unused classes:")
        for i, class_name in enumerate(sorted(unused_classes)[:20]):
            print(f"  {i+1:2d}. {class_name}")

    print(f"\n💾 Results saved to:")
    print(f"   - unused_css_detailed.txt (with file locations)")
    print(f"   - unused_css_categorized.txt (by category)")

    # Suggest safe removals
    safe_to_remove = []
    for class_name in unused_classes:
        # Classes that are likely safe to remove
        if any(prefix in class_name.lower() for prefix in ['dummy', 'test', 'temp', 'old', 'deprecated']):
            safe_to_remove.append(class_name)

    if safe_to_remove:
        print(f"\n✅ Classes likely safe to remove ({len(safe_to_remove)}):")
        for class_name in sorted(safe_to_remove):
            print(f"   • {class_name}")

if __name__ == "__main__":
    analyze_css_usage()


