# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Environment variables

The following environment variables are used in this project
`REACT_APP_INNHOLDSTJENESTE_API_URL=https://api.sandbox.bibs.aws.unit.no/contents

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm run start:development`

### `npm run start:production`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Install Cypress

npm 12 blocks dependency install scripts by default, so the Cypress binary
is not downloaded during `npm ci` / `npm install`. Download it explicitly:

```bash
npm ci
npm run cypress:install
```

Run `npm run cypress:install` again after Cypress is updated (e.g. after
merging a Dependabot PR). If the binary is already present, the command
does nothing.
