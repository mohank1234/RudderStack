import { setDefaultTimeout, BeforeAll, AfterAll, Given, When, Then } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import { Rudderstackpage } from '../Pages/Rudderstackpage.js';
import { ApiClient } from '../Utils/ApiClient.js';

setDefaultTimeout(30 * 1000);

let browser;
let context;
let page;
let rudderstack;

BeforeAll(async function () {
  // Launch browser once
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  rudderstack = new Rudderstackpage(page);

  // Login only once at the start
  console.log("=== Logging in once before all scenarios ===");
  await rudderstack.openLoginPage();
  await rudderstack.login();
  await rudderstack.security();
  console.log("=== Login completed ===");
});

AfterAll(async function () {
  console.log("Closing browser...");
  await context.close();
  await browser.close();
});

// =================== Navigation Steps ===================

Given('I am on the Connections page', async function () {
  await rudderstack.connections();
});

Given('I am on the Webhook destination page', async function () {
  await rudderstack.connections();
  await rudderstack.gotoWebhookDestination();
});

Given('I am on the Events tab in Webhook destination', async function () {
  await rudderstack.NavigateToEvents();
});

// =================== Actions ===================

Then('I should see the Connections page', async function () {
    await rudderstack.connections()
});

When('I read the Data Plane URL and Write Key', async function () {
  this.dataPlaneUrl = await rudderstack.getDataPlaneUrl();
  console.log("Data Plane URL:", this.dataPlaneUrl);
});

When('I send an event to the endpoint {string}', async function (endpoint) {
  const { dataurl, writekey } = this.dataPlaneUrl || {};
  if (!dataurl || !writekey) throw new Error('Missing Data Plane URL or Write Key');

  const client = new ApiClient(dataurl, writekey);
  const payload = {
    userId: "test-user-123",
    event: "Test Event from Automation",
    properties: { category: "Automation Test", label: "Webhook API Call" }
  };
  this.apiResponse = await client.post(endpoint, payload);
  console.log("API Response:", this.apiResponse.data);
});

When('I click the Events tab', async function () {
  await rudderstack.NavigateToEvents();
});

When('I read delivered and failed event counts', async function () {
  this.eventData = await rudderstack.dataFromEventsTab();
  console.log('Delivered:', this.eventData.deliveredData);
  console.log('Failed:', this.eventData.failedData);
});

// When('I click on the Webhook Automation destination', async function () {
//   // Implement the action to click on the Webhook Automation destination
//   await rudderstack.gotoWebhookDestination();
// });

// =================== Verifications ===================

Then('the Data Plane URL and Write Key should be stored', async function () {
  const { dataurl, writekey } = this.dataPlaneUrl || {};
  expect(dataurl).toBeTruthy();
  expect(writekey).toBeTruthy();
});

Then('the API should respond with a {int} status code', function (statusCode) {
  expect(this.apiResponse.status).toBe(statusCode);
});

Then('I should see the Webhook Source page', async function () {
  await rudderstack.verifySourceText();
});

Then('I should see Events Delivery on the page', async function () {
  await rudderstack.confirmEventTab();
});

Then('the delivered and failed counts should be stored', async function () {
  expect(this.eventData.deliveredData).toMatch(/\d+/);
  expect(this.eventData.failedData).toMatch(/\d+/);
});

Then('I navigate to {string} from the menu', async function (section) {
  if (section === 'Settings') await rudderstack.navigateToSettingsSection();
});

Then('I log out of the application', async function () {
  await rudderstack.logout();
});