# PortfolioFred

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Versioning and deployment

Every build generates `assets/version.json` with the package version, commit and build date in the `America/Sao_Paulo` time zone. The running application checks this file once a minute and reloads automatically when a new version is published.

To publish a version, open **Actions → Create version → Run workflow** and choose `patch`, `minor` or `major`. The workflow updates `package.json` and `package-lock.json`, creates a Git tag and GitHub Release, and deploys the application to GitHub Pages. Pushes to `main` continue to deploy normally but do not change the semantic version.

Before deploying, a repository administrator must enable GitHub Pages in **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**, not **Deploy from a branch**. If the `github-pages` environment restricts deployment branches, allow `main`.

The deployment workflow uploads `dist/portfolio-fred` (including the SPA `404.html` fallback) and deploys it directly to Pages; it no longer publishes a `gh-pages` branch. A deployment error reporting HTTP 404 and “Ensure GitHub Pages has been enabled” requires checking the Pages settings above. The workflow's default `GITHUB_TOKEN` cannot enable a disabled Pages site. After saving the settings, run **Actions → Deploy Angular to GitHub Pages → Run workflow** on `main`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
