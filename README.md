# Algorithm Lab

Interactive DSA visualizations, interview preparation, and a Google Gemini coding coach.

## Features

- Sorting and searching animations with playback, step controls, custom inputs, and highlighted Python explanations.
- Stacks, queues, linked lists, BSTs, heaps, BFS/DFS, and Fibonacci tabulation.
- **32 topics, 112 questions, and 48 worked Python solutions**, with hints, complexity analysis, common mistakes, and search/filter controls.
- Coding coach modes: hints, explanations, Python code review, worked solutions, and mock interviews.
- Responsive dark/light interface.

## Run locally

Requires **Node.js 22+**. No npm dependencies are required.

```bash
npm run dev
```

Open **http://localhost:3000**. Visualizations and interview questions work without an API key.

To enable Gemini, copy `.env.example` to `.env`, fill in `GEMINI_API_KEY`, and restart the server. `GEMINI_MODEL` defaults to `gemini-3.8-flash`. Model availability and quota depend on your Google AI Studio project. Never commit `.env` or put keys in browser code.

## Build and test

```bash
npm run build
npm test
python content/build_curriculum.py
```

Python 3 is needed only to validate or regenerate the curriculum. Rebuild after regenerating it.

## Source structure

| Path | Purpose |
| --- | --- |
| `public/` | Interface, styles, visualizations, question bank, and coach UI |
| `worker/index.js` | Server-side Gemini route and asset serving |
| `content/build_curriculum.py` | Curriculum content and 48 Python solution suites |
| `scripts/build.mjs` | Self-contained Worker build |
| `scripts/dev.mjs` | Local development server |
| `scripts/test-coach.mjs` | Server validation, error handling, and secret-isolation tests |

## Architecture and deployment

JavaScript generates deterministic algorithm traces; Python appears as explanatory code. The browser calls `/api/coach`, and the server calls Gemini with a secret environment variable. Chat stays in the current tab and resets on refresh. Submitted messages, code, and question context are sent to Google. The coach reviews Python but does not execute it.

The build produces a Cloudflare-compatible ESM Worker at `dist/server/index.js` with embedded assets. Configure secrets in your host's runtime environment. Account-specific hosting identity and credentials are excluded from this repository.

GitHub Pages can host only the interface, not the Gemini server route. Before publicly deploying the coach, add authentication and durable quota controls. Its in-memory rate limiter is best-effort, not a persistent account quota.

## Validation

Python solution checks, algorithm checks, server tests, and simulated UI flows passed. A live Gemini test identified an uninitialized variable. Full browser visual QA remains outstanding. Curriculum coverage is core interview DSA plus selected advanced topics; it does not guarantee job outcomes.

## Demo

1. Play a sorting trace and inspect its highlighted Python line.
2. Compare BFS and DFS on the same graph.
3. Search interview questions, attempt one, and reveal its explanation.
4. Use **Ask coding coach about this** or paste your Python attempt for review.
