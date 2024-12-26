
## Project Description 
* Developed a robust automation framework from scratch for a demo e-commerce website (https://magento.softwaretestingboard.com/).
* Utilized TypeScript and Playwright to implement end-to-end UI testing.
* Incorporated the Page Object Model (POM) design pattern to enhance test maintainability and reusability.
* Integrated CI/CD pipeline with GitHub Actions for automated testing and deployment.
* Focused on creating a scalable and efficient framework capable of handling diverse test cases with minimal friction.
## Pre requisites
* Nodejs installed version 18 and above (you can use NVM)
* IDE (VScode, Webstorm)
## Getting started
* to get started with the project - first clone the repo by opening the terminal in your IDE and run:
    * `git clone https://github.com/Romarionijim/Playwright-TypeScript-Mini-Project.git`
## Installing dependencies and Playwright
* after cloning the repo - navigate to the root directory:
    * `cd Playwright-TypeScript-Mini-Project`
* install dependencies by running the following commands in this order:
    * `npm ci`
    * `npx playwright install`
## Running tests
* To run all of the tests you can run the following command in the terminal:
    * `npm run test`
    * this will run all of the tests that exists in chromium browser
* To run a specific test you can do it in two ways:
    * run a specific test file e.g `npm run test tests/loginTests/LoginTests.spec.ts`
    * navigate to a specific test file and type `.only` on a specific `test` block example:
        `test.only('test goes here') => {`
* To run a test with a different browser other than chromium you can override the browser project:
    * `npx playwright test --project='firefox' --workers 1`
* if you wanna run more than one browser you can add arguments to the current script:
    * run `npm run test -- --project='firefox'` this will run chromium and firefox
* to run multiple browsers with multiple workers:
    * run `npm run test -- --project='firefox' --workers=4`
## Running tests in headless mode
* if you with to run the tests in headless mode, you can run:
    * `npm run test:headless`
## Running tests in parallel
* To run a tests in parallel with multiple workers you can specify the number of workers:
    * `npx playwright test --project='chromium --workers=4'` 
    * or override the current sciprt 1 worker: `npm run test -- --workers 4`
## Running only modified tests
* if you wanna only run tests that you have currently modified and changes are still uncommitted without having the need to specify a test file in the terminal or by passing `.only` to a specific test, you can run the following command - this will only run test files with uncommitted changes:
    * `npm run test:changed`
    * This will run when you have uncomitted changes on specific test files or pages related to specific test files so if you modify a page that is used by a test and the change is uncommited it will only run the test related to the page - depends on what you have modified since the last git commit as long as it in the uncommited staging area.
## Reports
* The reports that are used in this project are playwright html reports.
* To generate a report after a test, run the following:
    * `npx playwright show-report`
* the report is deployed to github pages after running the CI pipeline so you can view it directly in the repo under `deployments` section and navigate the report link.
* The reports are also saved as artifact and saved for a limited time on github - which you can download as a zip file and extract them to view.

## CI/CD
* In this project I'm using GitHub Actions CI/CD - any code changes you'll push will trigger the github actions pipeline where tests will checkout the current branch, install dependencies and runs all of the tests, deploy and upload the playwright html, the report will get automatically generated and deployed to github pages so you can view the test results directly on github under a domain and you can send the report to anyone without the need to downlaod the report and run `npx playwright show-report`.
* Test results html report will be uploaded as an artifact as well after each run so you can download it if you prefer that way (the report is retained up to 30 days after test run)