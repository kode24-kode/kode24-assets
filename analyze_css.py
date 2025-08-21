#!/usr/bin/env python3
import os
import re
import glob
from collections import defaultdict

def extract_css_classes_from_scss():
    """Extract all CSS classes defined in SCSS files"""
    defined_classes = set()

    # Find all SCSS files
    scss_files = glob.glob('src/scss/**/*.scss', recursive=True)

    for file_path in scss_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

                # Find CSS class definitions
                # Match .class-name, .class_name, .class, etc.
                class_pattern = r'\.([a-zA-Z][a-zA-Z0-9_-]*)'
                classes = re.findall(class_pattern, content)

                for class_name in classes:
                    defined_classes.add(class_name)

        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    return defined_classes

def extract_used_classes_from_files():
    """Extract all CSS classes used in HTML and TSX files"""
    used_classes = set()

    # Find all HTML and TSX files
    html_files = glob.glob('*.html')
    tsx_files = glob.glob('src/**/*.tsx', recursive=True)

    all_files = html_files + tsx_files

    for file_path in all_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

                # Find class attributes in HTML
                class_pattern = r'class=["\']([^"\']*)["\']'
                class_matches = re.findall(class_pattern, content)

                for class_string in class_matches:
                    # Split multiple classes
                    classes = class_string.split()
                    for class_name in classes:
                        used_classes.add(class_name)

                # Find className attributes in TSX
                className_pattern = r'className=["\']([^"\']*)["\']'
                className_matches = re.findall(className_pattern, content)

                for class_string in className_matches:
                    # Split multiple classes
                    classes = class_string.split()
                    for class_name in classes:
                        used_classes.add(class_name)

        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    return used_classes

def analyze_css_usage():
    """Main function to analyze CSS usage"""
    print("🔍 Analyzing CSS usage...")

    # Extract defined and used classes
    defined_classes = extract_css_classes_from_scss()
    used_classes = extract_used_classes_from_files()

    print(f"📊 Found {len(defined_classes)} defined CSS classes")
    print(f"📊 Found {len(used_classes)} used CSS classes")

    # Find unused classes
    unused_classes = defined_classes - used_classes

    print(f"🗑️  Found {len(unused_classes)} potentially unused CSS classes")

    # Find classes that are used but not defined (might be from external libraries)
    undefined_classes = used_classes - defined_classes

    print(f"❓ Found {len(undefined_classes)} used classes that are not defined in SCSS")

    # Save results to files
    with open('unused_css_classes.txt', 'w', encoding='utf-8') as f:
        f.write("Potentially unused CSS classes:\n")
        f.write("=" * 40 + "\n")
        for class_name in sorted(unused_classes):
            f.write(f"{class_name}\n")

    with open('undefined_css_classes.txt', 'w', encoding='utf-8') as f:
        f.write("Used classes not defined in SCSS (might be from external libraries):\n")
        f.write("=" * 60 + "\n")
        for class_name in sorted(undefined_classes):
            f.write(f"{class_name}\n")

    # Print summary
    print("\n📋 Summary:")
    print(f"✅ Defined classes: {len(defined_classes)}")
    print(f"✅ Used classes: {len(used_classes)}")
    print(f"❌ Potentially unused: {len(unused_classes)}")
    print(f"❓ Undefined but used: {len(undefined_classes)}")

    if unused_classes:
        print(f"\n🗑️  Top 20 potentially unused classes:")
        for i, class_name in enumerate(sorted(unused_classes)[:20]):
            print(f"  {i+1:2d}. {class_name}")

    print(f"\n💾 Results saved to:")
    print(f"   - unused_css_classes.txt")
    print(f"   - undefined_css_classes.txt")

if __name__ == "__main__":
    analyze_css_usage()


