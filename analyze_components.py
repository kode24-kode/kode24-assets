#!/usr/bin/env python3
import os
import re
import glob
from collections import defaultdict

def get_component_names():
    """Get all component names from the components directory"""
    component_files = glob.glob('src/components/*.tsx')
    component_names = []

    for file_path in component_files:
        # Extract filename without extension
        filename = os.path.basename(file_path)
        name_without_ext = os.path.splitext(filename)[0]
        component_names.append(name_without_ext)

    return component_names

def find_component_usage():
    """Find where components are imported and used"""
    component_names = get_component_names()
    usage_data = defaultdict(list)
    import_data = defaultdict(list)

    # Find all relevant files
    tsx_files = glob.glob('src/**/*.tsx', recursive=True)
    ts_files = glob.glob('src/**/*.ts', recursive=True)
    js_files = glob.glob('src/**/*.js', recursive=True)
    jsx_files = glob.glob('src/**/*.jsx', recursive=True)

    all_files = tsx_files + ts_files + js_files + jsx_files

    for file_path in all_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.split('\n')

                for line_num, line in enumerate(lines, 1):
                    # Check for imports
                    for component_name in component_names:
                        # Import patterns
                        import_patterns = [
                            rf'import\s+.*\s+from\s+["\']\.\.?/components/{component_name}["\']',
                            rf'import\s+.*\s+from\s+["\']\./components/{component_name}["\']',
                            rf'import\s+.*\s+from\s+["\']components/{component_name}["\']',
                            rf'import\s+.*\s+from\s+["\']@/components/{component_name}["\']',
                            rf'import\s+.*\s+from\s+["\']~/components/{component_name}["\']',
                        ]

                        for pattern in import_patterns:
                            if re.search(pattern, line):
                                import_data[component_name].append(f"{file_path}:{line_num}")

                        # Check for JSX usage
                        jsx_patterns = [
                            rf'<{component_name}\b',
                            rf'<{component_name}[A-Z]',
                        ]

                        for pattern in jsx_patterns:
                            if re.search(pattern, line):
                                usage_data[component_name].append(f"{file_path}:{line_num}")

        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    return component_names, import_data, usage_data

def analyze_component_usage():
    """Main function to analyze component usage"""
    print("🔍 Analyzing component usage...")

    component_names, import_data, usage_data = find_component_usage()

    print(f"📊 Found {len(component_names)} components in src/components/")

    # Find unused components
    used_components = set(import_data.keys())
    unused_components = set(component_names) - used_components

    print(f"✅ Used components: {len(used_components)}")
    print(f"❌ Potentially unused components: {len(unused_components)}")

    # Save detailed results
    with open('component_usage_detailed.txt', 'w', encoding='utf-8') as f:
        f.write("Component Usage Analysis\n")
        f.write("=" * 40 + "\n\n")

        for component_name in sorted(component_names):
            f.write(f"📦 {component_name}\n")

            if component_name in import_data:
                f.write(f"   📥 Imports ({len(import_data[component_name])}):\n")
                for location in import_data[component_name]:
                    f.write(f"      📍 {location}\n")
            else:
                f.write(f"   ❌ No imports found\n")

            if component_name in usage_data:
                f.write(f"   🔧 Usage ({len(usage_data[component_name])}):\n")
                for location in usage_data[component_name]:
                    f.write(f"      📍 {location}\n")
            else:
                f.write(f"   ❌ No JSX usage found\n")

            f.write("\n")

    # Save unused components
    with open('unused_components.txt', 'w', encoding='utf-8') as f:
        f.write("Potentially unused components:\n")
        f.write("=" * 30 + "\n")
        for component_name in sorted(unused_components):
            f.write(f"{component_name}\n")

    # Categorize components by usage
    categories = {
        'frequently_used': [],
        'occasionally_used': [],
        'rarely_used': [],
        'unused': []
    }

    for component_name in component_names:
        import_count = len(import_data.get(component_name, []))
        usage_count = len(usage_data.get(component_name, []))

        if component_name in unused_components:
            categories['unused'].append(component_name)
        elif import_count > 5 or usage_count > 10:
            categories['frequently_used'].append(component_name)
        elif import_count > 1 or usage_count > 1:
            categories['occasionally_used'].append(component_name)
        else:
            categories['rarely_used'].append(component_name)

    # Save categorized results
    with open('component_usage_categorized.txt', 'w', encoding='utf-8') as f:
        f.write("Component usage by category:\n")
        f.write("=" * 30 + "\n\n")

        for category, components in categories.items():
            if components:
                f.write(f"📂 {category.upper().replace('_', ' ')} ({len(components)} components):\n")
                f.write("-" * 30 + "\n")
                for component_name in sorted(components):
                    import_count = len(import_data.get(component_name, []))
                    usage_count = len(usage_data.get(component_name, []))
                    f.write(f"  • {component_name} (imports: {import_count}, usage: {usage_count})\n")
                f.write("\n")

    # Print summary
    print("\n📋 Summary:")
    print(f"✅ Frequently used: {len(categories['frequently_used'])}")
    print(f"🟡 Occasionally used: {len(categories['occasionally_used'])}")
    print(f"🟠 Rarely used: {len(categories['rarely_used'])}")
    print(f"❌ Unused: {len(categories['unused'])}")

    if unused_components:
        print(f"\n🗑️  Potentially unused components:")
        for component_name in sorted(unused_components):
            print(f"   • {component_name}")

    print(f"\n💾 Results saved to:")
    print(f"   - component_usage_detailed.txt (with file locations)")
    print(f"   - component_usage_categorized.txt (by category)")
    print(f"   - unused_components.txt (unused components only)")

    # Suggest safe removals
    safe_to_remove = []
    for component_name in unused_components:
        # Check if component name suggests it's test/dummy content
        if any(prefix in component_name.lower() for prefix in ['test', 'dummy', 'example', 'temp']):
            safe_to_remove.append(component_name)

    if safe_to_remove:
        print(f"\n✅ Components likely safe to remove ({len(safe_to_remove)}):")
        for component_name in sorted(safe_to_remove):
            print(f"   • {component_name}")

if __name__ == "__main__":
    analyze_component_usage()


