# JavaScript Task List

Vanilla JavaScript task-list practice with add, edit, delete, completion toggles and browser-local persistence.

Part of my JavaScript practice work. Explore my complete projects on [GitHub](https://github.com/awaljanhematyar) or my [developer portfolio](https://hematyar-professional-portfolio.vercel.app/).

## Features

- Add tasks with the button or Enter key.
- Mark completion with immediate visual feedback.
- Double-click task text to edit it without accepting blank edits.
- Delete tasks and preserve records between visits.
- Recover from malformed or unavailable browser storage.

## Run locally

```sh
git clone https://github.com/awaljanhematyar/todo.git
cd todo
```

Serve the folder using VS Code Live Server and open `index.html`. There is no npm installation or build step. Use a modern browser.

## Source map

| File | Purpose |
| --- | --- |
| `index.html` | Interface structure |
| `style.css` | Layout and visual styles |
| `script.js` | Interaction logic |

## Verification and scope

Targeted local DOM-stub checks cover malformed storage, blocked storage, task creation, completion feedback and blank edits.

This is a learning exercise. Documentation and targeted checks do not establish production readiness or a full accessibility audit.

## Author

[Awal Jan Hematyar](https://github.com/awaljanhematyar), Front-End Developer | React Developer.
