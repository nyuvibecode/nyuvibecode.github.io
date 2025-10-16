# HTML to Markdown Converter

A Python script to convert HTML files to clean Markdown format.

## Features

- Converts common HTML elements to Markdown syntax
- Removes unwanted HTML elements (scripts, styles, feedback buttons, etc.)
- Handles headers, bold/italic text, links, images, lists, and more
- Cleans up whitespace and formatting with minimal indentation
- Supports both single files and directories
- Left-aligns content for maximum readability

## Usage

### Convert a single HTML file:
```bash
python3 html_to_md_converter.py input.html
```

### Convert with custom output file:
```bash
python3 html_to_md_converter.py input.html -o output.md
```

### Convert all HTML files in a directory:
```bash
python3 html_to_md_converter.py /path/to/html/files/
```

### Convert with custom output directory:
```bash
python3 html_to_md_converter.py /path/to/html/files/ -o /path/to/markdown/files/
```

## Examples

Convert the chat.html file:
```bash
python3 html_to_md_converter.py milestone-1/berserk/chat.html
```

This will create `milestone-1/berserk/chat.md` with the converted content.

## What gets converted:

- `<h1>` to `<h6>` → `#` to `######`
- `<strong>`, `<b>` → `**bold**`
- `<em>`, `<i>` → `*italic*`
- `<code>` → `` `code` ``
- `<pre><code>` → ``` code blocks ```
- `<a href="...">` → `[text](url)`
- `<img>` → `![alt](src)`
- `<ul>` → `- unordered list items`
- `<ol>` → `1. 2. 3. ordered list items`
- `<li>` → properly formatted list items
- `<p>` → paragraphs with proper spacing
- `<br>` → line breaks
- `<hr>` → `---`

## What gets removed:

- `<script>` tags
- `<style>` tags
- Navigation, header, footer elements
- Feedback buttons and UI elements
- `<template>` and `<slot>` elements
- `<vscode-button>` elements

## Requirements

- Python 3.6+
- No external dependencies (uses only standard library)

## Installation

No installation required. Just run the script directly:

```bash
python3 html_to_md_converter.py --help
```
