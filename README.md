# A Todo App to test mutations in Next.js 13

It uses zod for runtime type checking

To run the app, we need 2 terminals:

In the first one, run json-server.

```bash
npx json-server -w db.json -p 3500 -H 127.0.0.1
```

In the second one, run the app.

```bash
npm run dev
```

## Important note

This app is made in Next.js 13, which is still in beta.
In fact, in the beta docs, there is mention of upcoming changes for 'Mutating data' in the 'Data Fetching' section. For now, we use router.refresh() after a mutation to update the UI. This may change in the future.
