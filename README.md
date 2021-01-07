# LoginNgRx

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.
For Login use default email "test@domain.com" & password : "Test@123".

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## What to improve

This is just a basic login application using NgRx. So there are number of improvements are required.
1.) Password encryption needed using hash keys to save the application from multiple attacks.
2.) Code optimization is still required.
3.) Didn't implemented Lazy Load module yet to show home page for a user. Lazy Load approach should create good impact into application performance.
4.) Now I have created the application for email login. as an improvement user should login using username/email/mobile number.
5.) Login with third party platforms are also a good option to have. Example login with gmail, facebook or linkedin.
6.) Captcha verification can create an secure impact for the same.
7.) Authentication should be completed using jwt token or auth token.
8.) There are still test cases needed to cover multiple scenarios.