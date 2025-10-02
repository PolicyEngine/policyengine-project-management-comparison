# PolicyEngine Project Management Tool Comparison

Interactive comparison website for evaluating project management tools for PolicyEngine.

## Overview

This site helps PolicyEngine choose between different project management tools (Plane, Jira, Linear, GitHub Projects) combined with CiviCRM for non-technical work (grants, papers, fundraising).

## Key Findings

- **CiviCRM** handles non-technical work (grants, papers) → Focus on engineering tools  
- **Recommended:** Plane + CiviCRM (fully open source, $840-1,800/year)
- **Alternative:** Jira + CiviCRM (if OSS license approved, $600-1,200/year)
- **Premium:** Linear + CiviCRM (best UX, $2,000-3,000/year)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Tech Stack

- React 19
- Vite
- Mantine UI (PolicyEngine design system)
- Vitest + React Testing Library

## Deployment

Automatically deploys to GitHub Pages on push to `main` branch.

## License

MIT
