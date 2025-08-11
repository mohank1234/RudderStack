# RudderStack Automation Testing

This project automates testing of RudderStack web app and API using Playwright, Cucumber, and Axios.

---

## Prerequisites

- Node.js (v16 or higher recommended)
- Git installed on your system

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo

---

## Installations

Install dependencies

npm install

Install Playwright browsers
npx playwright install

---

## Create .env 

Create a .env file in the project root:
URL=https://app.rudderstack.com/login
USERNAME_OR_MAIL=your_email@example.com
PASSWORD=your_password

---
## RUnning Tests

npm test

Directly with Cucumber:

npx cucumber-js

Run a specific feature file
npx cucumber-js features/SendEvent.feature


Run a specific scenario by name
npx cucumber-js --name "Send an event to the Webhook API and verify delivery counts"


Run tests in parallel (optional)
npx cucumber-js-parallel --features features --steps features/step_definitions

Run tests via batch script (Windows)
.\run_features.bat

npx cucumber-js features\Login_Navigation_Connections.feature features\UrlandWriteKey_Store.feature features\SentAPIRequest.feature features\Webhook.feature features\NavigatetoEventsPage.feature features\ReadData.feature --format @cucumber/html-formatter:reports/report.html

---

## Reports

Generating and Viewing Reports
Generate JSON report
npx cucumber-js --format json:reports/report.json


Generate HTML report from JSON
Install cucumber-html-reporter if not installed:

npm install cucumber-html-reporter --save-dev

Generate the HTML report:

npx cucumber-html-reporter --input reports/report.json --output reports/report.html

## Debugging

Debugging and Logs

Run tests in headed mode (non-headless) for visual debugging.

Enable Playwright API debug logs:
DEBUG=pw:api npx cucumber-js