#!/usr/bin/env python3
"""
HTML to Markdown Converter

A Python script to convert HTML files to clean Markdown format.
Handles common HTML elements and converts them to appropriate Markdown syntax.
"""

import re
import argparse
import sys
from pathlib import Path
from html import unescape
from typing import List, Tuple


class HTMLToMarkdownConverter:
    def __init__(self):
        # Define HTML to Markdown conversion patterns
        self.conversion_patterns = [
            # Headers
            (r'<h1[^>]*>(.*?)</h1>', r'# \1'),
            (r'<h2[^>]*>(.*?)</h2>', r'## \1'),
            (r'<h3[^>]*>(.*?)</h3>', r'### \1'),
            (r'<h4[^>]*>(.*?)</h4>', r'#### \1'),
            (r'<h5[^>]*>(.*?)</h5>', r'##### \1'),
            (r'<h6[^>]*>(.*?)</h6>', r'###### \1'),
            
            # Bold and italic
            (r'<strong[^>]*>(.*?)</strong>', r'**\1**'),
            (r'<b[^>]*>(.*?)</b>', r'**\1**'),
            (r'<em[^>]*>(.*?)</em>', r'*\1*'),
            (r'<i[^>]*>(.*?)</i>', r'*\1*'),
            
            # Code
            (r'<code[^>]*>(.*?)</code>', r'`\1`'),
            (r'<pre[^>]*><code[^>]*>(.*?)</code></pre>', r'```\n\1\n```'),
            (r'<pre[^>]*>(.*?)</pre>', r'```\n\1\n```'),
            
            # Links
            (r'<a[^>]*href=["\']([^"\']*)["\'][^>]*>(.*?)</a>', r'[\2](\1)'),
            
            # Images
            (r'<img[^>]*src=["\']([^"\']*)["\'][^>]*alt=["\']([^"\']*)["\'][^>]*>', r'![\2](\1)'),
            (r'<img[^>]*alt=["\']([^"\']*)["\'][^>]*src=["\']([^"\']*)["\'][^>]*>', r'![\1](\2)'),
            (r'<img[^>]*src=["\']([^"\']*)["\'][^>]*>', r'![](\1)'),
            
            # Lists are handled separately in convert_lists method
            
            # Paragraphs
            (r'<p[^>]*>(.*?)</p>', r'\1\n\n'),
            
            # Line breaks
            (r'<br[^>]*>', r'\n'),
            (r'<hr[^>]*>', r'---\n'),
            
            # Blockquotes
            (r'<blockquote[^>]*>(.*?)</blockquote>', r'> \1'),
            
            # Tables (basic conversion)
            (r'<table[^>]*>', r''),
            (r'</table>', r''),
            (r'<thead[^>]*>', r''),
            (r'</thead>', r''),
            (r'<tbody[^>]*>', r''),
            (r'</tbody>', r''),
            (r'<tr[^>]*>', r''),
            (r'</tr>', r'|'),
            (r'<th[^>]*>(.*?)</th>', r' \1 |'),
            (r'<td[^>]*>(.*?)</td>', r' \1 |'),
        ]
        
        # Elements to completely remove
        self.remove_elements = [
            r'<script[^>]*>.*?</script>',
            r'<style[^>]*>.*?</style>',
            r'<nav[^>]*>.*?</nav>',
            r'<header[^>]*>.*?</header>',
            r'<footer[^>]*>.*?</footer>',
            r'<aside[^>]*>.*?</aside>',
            r'<div[^>]*class="[^"]*feedback[^"]*"[^>]*>.*?</div>',
            r'<div[^>]*class="[^"]*button[^"]*"[^>]*>.*?</div>',
            r'<button[^>]*>.*?</button>',
            r'<template[^>]*>.*?</template>',
            r'<slot[^>]*>.*?</slot>',
            r'<vscode-button[^>]*>.*?</vscode-button>',
        ]
    
    def convert_lists(self, content: str) -> str:
        """Convert HTML lists to proper Markdown lists."""
        # Handle ordered lists (ol)
        def convert_ol(match):
            ol_content = match.group(1)
            # Find all li elements in this ol
            li_matches = re.findall(r'<li[^>]*>(.*?)</li>', ol_content, re.DOTALL)
            markdown_list = []
            for i, li_content in enumerate(li_matches, 1):
                # Clean the li content
                clean_li = re.sub(r'<[^>]+>', '', li_content).strip()
                markdown_list.append(f"{i}. {clean_li}")
            return '\n'.join(markdown_list) + '\n'
        
        # Handle unordered lists (ul)
        def convert_ul(match):
            ul_content = match.group(1)
            # Find all li elements in this ul
            li_matches = re.findall(r'<li[^>]*>(.*?)</li>', ul_content, re.DOTALL)
            markdown_list = []
            for li_content in li_matches:
                # Clean the li content
                clean_li = re.sub(r'<[^>]+>', '', li_content).strip()
                markdown_list.append(f"- {clean_li}")
            return '\n'.join(markdown_list) + '\n'
        
        # Convert ordered lists
        content = re.sub(r'<ol[^>]*>(.*?)</ol>', convert_ol, content, flags=re.DOTALL)
        
        # Convert unordered lists
        content = re.sub(r'<ul[^>]*>(.*?)</ul>', convert_ul, content, flags=re.DOTALL)
        
        return content

    def clean_html(self, html_content: str) -> str:
        """Clean HTML content by removing unwanted elements and converting to markdown."""
        content = html_content
        
        # Remove unwanted elements first
        for pattern in self.remove_elements:
            content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
        
        # Convert lists first (before other patterns that might interfere)
        content = self.convert_lists(content)
        
        # Apply conversion patterns
        for html_pattern, md_pattern in self.conversion_patterns:
            content = re.sub(html_pattern, md_pattern, content, flags=re.DOTALL | re.IGNORECASE)
        
        # Remove any remaining HTML tags
        content = re.sub(r'<[^>]+>', '', content)
        
        # Decode HTML entities
        content = unescape(content)
        
        # Clean up whitespace
        content = self.clean_whitespace(content)
        
        return content
    
    def clean_whitespace(self, content: str) -> str:
        """Clean up excessive whitespace and formatting."""
        # Remove excessive newlines
        content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
        
        # Remove leading/trailing whitespace from lines and minimize indentation
        lines = content.split('\n')
        cleaned_lines = []
        
        for line in lines:
            # Strip trailing whitespace
            line = line.rstrip()
            
            # Remove excessive leading whitespace (keep only minimal indentation for lists)
            if line.strip():
                # If it's a list item, keep minimal indentation
                if re.match(r'^\s*[-*+]\s', line) or re.match(r'^\s*\d+\.\s', line):
                    # Keep only 2 spaces max for list items
                    line = re.sub(r'^\s+', '  ', line)
                else:
                    # Remove all leading whitespace for other content
                    line = line.strip()
            
            cleaned_lines.append(line)
        
        # Remove empty lines at start and end
        while cleaned_lines and not cleaned_lines[0].strip():
            cleaned_lines.pop(0)
        while cleaned_lines and not cleaned_lines[-1].strip():
            cleaned_lines.pop()
        
        return '\n'.join(cleaned_lines)
    
    def convert_file(self, input_file: Path, output_file: Path = None) -> None:
        """Convert an HTML file to Markdown."""
        if not input_file.exists():
            print(f"Error: Input file '{input_file}' does not exist.")
            return
        
        # Read HTML content
        try:
            with open(input_file, 'r', encoding='utf-8') as f:
                html_content = f.read()
        except Exception as e:
            print(f"Error reading file '{input_file}': {e}")
            return
        
        # Convert to markdown
        markdown_content = self.clean_html(html_content)
        
        # Determine output file
        if output_file is None:
            output_file = input_file.with_suffix('.md')
        
        # Write markdown content
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(markdown_content)
            print(f"Successfully converted '{input_file}' to '{output_file}'")
        except Exception as e:
            print(f"Error writing file '{output_file}': {e}")
    
    def convert_directory(self, input_dir: Path, output_dir: Path = None) -> None:
        """Convert all HTML files in a directory."""
        if not input_dir.exists() or not input_dir.is_dir():
            print(f"Error: Input directory '{input_dir}' does not exist or is not a directory.")
            return
        
        if output_dir is None:
            output_dir = input_dir
        
        html_files = list(input_dir.glob('*.html'))
        if not html_files:
            print(f"No HTML files found in '{input_dir}'")
            return
        
        for html_file in html_files:
            output_file = output_dir / html_file.with_suffix('.md').name
            self.convert_file(html_file, output_file)


def main():
    parser = argparse.ArgumentParser(description='Convert HTML files to Markdown')
    parser.add_argument('input', help='Input HTML file or directory')
    parser.add_argument('-o', '--output', help='Output file or directory (optional)')
    parser.add_argument('-r', '--recursive', action='store_true', 
                       help='Process directories recursively')
    
    args = parser.parse_args()
    
    converter = HTMLToMarkdownConverter()
    input_path = Path(args.input)
    
    if input_path.is_file():
        if input_path.suffix.lower() != '.html':
            print("Warning: Input file doesn't have .html extension")
        output_path = Path(args.output) if args.output else None
        converter.convert_file(input_path, output_path)
    
    elif input_path.is_dir():
        output_path = Path(args.output) if args.output else None
        converter.convert_directory(input_path, output_path)
    
    else:
        print(f"Error: '{input_path}' is not a valid file or directory")
        sys.exit(1)


if __name__ == '__main__':
    main()
