# BrightHR Tech Test - by Luke Fox

## Live Website
The live website can be accessed here: 
https://bright-hr-test.vercel.app/

## Description

Tech test to view files & folders loaded from a mock data JSON file. This mock data is loaded in via the `/api/folders` endpoint just so I can simulate data loading on the front-end. The app is built with NextJS 14, using Material UI for styling. The `swr` library is used for data fetching. The features of this app include:

- Viewing files and folders in a grid-view. Files will show their name, extension and date created. Folders will show their name and the number of files they contain.
- Fully responsive view, the page should fit mobile screens by using Material UI's grid system as well as some responsive font settings specified in MUI's `createTheme` function.
- Data fetching using `swr` in order to show loading and/or error states when the data is being fetched.
- Data can be searched, sorted and filtered as well as ordered ascending/descending. Sorting can be done on the file name, type and date created. Filtering can be done on the file type, where multiple types can be specified.

## Thoughts & Considerations

- If this page was only ever to be used for viewing data with no mutating, static site generation within NextJS would be a nice choice in order to prerender the page to avoid frequent data fetching and improve the overall speed.
- In hindsight, a table view may have been more suitable for the user experience here.
- Regarding filtering, sorting & searching - this would more ideally be performed on the backend. With this setup, the `/api/folders` endpoint could be expanded to allow for query params to perform this filtering and sorting. Of course, it would only make sense to implement this approach if the data was stored in a DB rather than a mock data file. 

## Getting Started

First, install node modules with 
```bash
npm i 
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


