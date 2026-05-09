import os

def replace_in_file(file_path, old_text, new_text):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace(old_text, new_text)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

root_dir = '/Users/williandossantos/MEDIA KIT/Premium Interactive DJ Website/src'

replacements = [
    ('William', 'Willian'),
    ('WILLIAM', 'WILLIAN'),
    ('william', 'willian')
]

for subdir, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.html', '.css', '.json')):
            file_path = os.path.join(subdir, file)
            for old, new in replacements:
                if replace_in_file(file_path, old, new):
                    print(f"Replaced {old} with {new} in {file_path}")
