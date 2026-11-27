# PortfolioFred

Built with Angular 22. Install dependencies with `npm ci` using Node.js 24.15 or later in the 24.x series.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Versioning and deployment

Every build generates `assets/version.json` with the package version, commit and build date in the `America/Sao_Paulo` time zone. The running application checks this file once a minute and reloads automatically when a new version is published.

To publish a version, open **Actions → Create version → Run workflow** and choose `patch`, `minor` or `major`. The workflow updates `package.json` and `package-lock.json`, creates a Git tag and GitHub Release, and deploys the application to GitHub Pages. Pushes to `main` continue to deploy normally but do not change the semantic version.

## Running unit tests

Run `npm test -- --watch=false` to execute the unit tests with Vitest.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/cli) page.


