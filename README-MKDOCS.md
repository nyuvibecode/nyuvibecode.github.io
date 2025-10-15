# MkDocs for Vibe Coding Hackathon

This repository contains a minimal MkDocs configuration to build a docs site alongside the static website. The `mkdocs.yml` and `docs/` folder are included.

## Quick start (local)

1. Install MkDocs and the Material theme (recommended):

```bash
python -m pip install mkdocs mkdocs-material
```

2. Serve locally:

```bash
mkdocs serve
```

3. Build static site:

```bash
mkdocs build -d site-docs
```

## Publishing to GitHub Pages

You can publish the docs with `mkdocs gh-deploy` or publish the `site-docs` directory to GitHub Pages. Alternatively, copy the Markdown files into the repository Wiki if you prefer a GitHub Wiki.

## Convert to GitHub Wiki

To push docs to the GitHub Wiki (separate repo), you can run:

```bash
git clone https://github.com/<owner>/<repo>.wiki.git wiki-repo
cp -r docs/* wiki-repo/
cd wiki-repo
git add .
git commit -m "Update wiki docs"
git push
```
