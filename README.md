# Node Backend Training

A hands-on repository documenting my progress in JavaScript,
TypeScript, and Node.js backend development.

This is a learning repository, not a production-ready application.

## Learning Areas

- JavaScript fundamentals, arrays, objects, and asynchronous programming.
- TypeScript types, interfaces, and classes.
- Node.js environment variables, files, paths, events, and streams.
- HTTP server development.
- Organizing code into models, DTOs, repositories, and services.

## Repository Structure

```text
01-javascript/     JavaScript exercises
02-typescript/     TypeScript exercises
03-node-core/      Node.js core examples
dto/               Data transfer objects
models/            Data models
repositories/      Data access examples
services/          Business logic examples
index.ts           Main example entry point
```

## Getting Started

Install Node.js and npm, then clone the repository:

```bash
git clone https://github.com/jamilhelal37/node-backend-training.git
cd node-backend-training
npm ci
```

Run the main example:

```bash
npm start
```

The start command runs `index.ts`; it does not run every exercise.

## Run Individual Exercises

JavaScript example:

```bash
node 01-javascript/01-basics.js
```

TypeScript example:

```bash
npx tsx 02-typescript/01-typescript-basics.ts
```

## Testing

The npm test script is not configured with automated tests yet.

## Next Steps

- Add automated tests.
- Improve input validation and error handling.
- Document individual examples.
- Practice database-backed API development.

## Author

Jamil Helal