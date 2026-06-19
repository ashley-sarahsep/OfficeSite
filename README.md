# Ashley's Office

An interactive, retro OS-themed portfolio. Step into a pixel-art office, explore the
desktop, open files, play a few games, and get a feel for the work behind it — operations,
enablement, and AI adoption.

**Live site:** [stepinto-ashleysoffice.com](https://stepinto-ashleysoffice.com)

## About

This is a single-page, static site built as a playful alternative to a traditional resume.
Visitors land in a hand-illustrated room, click into a desktop environment, and browse
role-specific resumes, work samples, and a few easter eggs.

## Built with

- Plain HTML, CSS, and vanilla JavaScript — no framework, no build step
- Hosted on GitHub Pages with a custom domain
- PostHog for lightweight, privacy-respecting visit analytics

## Running locally

It's a static site, so any local web server works:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Structure

| Path             | What it is                                  |
| ---------------- | ------------------------------------------- |
| `index.html`     | Entry point and page markup                 |
| `scripts.js`     | Interactive desktop, windows, and games     |
| `data.js`        | Content: dialogue, resumes, and site copy   |
| `styles.css`     | Retro UI styling                            |
| `calculator.html`| Standalone "value calculator" mini-app      |
| `examples/`      | Standalone work-sample pages                |
| `assets/`        | Images and illustrations                    |
