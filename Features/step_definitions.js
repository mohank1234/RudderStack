import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(20 * 1000); // 20 seconds
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';      // Import playwright here
import { expect } from '@playwright/test';
import { Rudderstackpage } from '../Pages/Rudderstackpage.js';
import axios from 'axios';


let browser;
let context;
let rudderstack;

Before(async function () {
  browser = await chromium.launch({ headless: false });  // Launch browser
  context = await browser.newContext();
  this.page = await context.newPage();  // Assign page to this.page
  rudderstack = new Rudderstackpage(this.page);
});

After(async function () {
  await this.page.close();
  await context.close();
  await browser.close();
});

//login 
Given('I am on the Rudderstack login page', async function () {
 
  await rudderstack.openLoginPage();
});

When('I enter valid credentials and click the login button', async function () {
  await rudderstack.login();
});

When('I see a security page asking to enable E2F and I choose "I\'ll do this later" and I click "Go to Dashboard"', 
  async function () {
    await rudderstack.security();
  });

Then('I should be redirected to the Connections page', async function () {
  // Optionally log the URL to debug
  console.log('Redirected to:', await this.page.url());

  // Wait up to 15 seconds for "Connections" text anywhere on the page
  await expect(this.page.getByText('Connections')).toBeVisible({ timeout: 15000 });
});

// Read DataPlan url and Write key
Given ('the user is already logged in and on the Connections page',async function()
{
  console.log('waited for login page')
  await rudderstack.openLoginPage();
  console.log('started login')
  await rudderstack.login();
  console.log('finished login')
  console.log('Started secuity clicks')
  await rudderstack.security();
  console.log('finished secuity clicks')
  console.log('Started gatheringshed data')
  await rudderstack.connections();
  console.log(' finished gatheringshed  data')
});

When ('the user reads the Data Plane URL displayed at the top right corner of the page', async function () {
  this.dataPlaneUrl = await rudderstack.getDataPlaneUrl();  // Ensure the method `getDataPlaneUrl` is defined in `Rudderstackpage`
  console.log("Data Plane URL:", this.dataPlaneUrl);  // Optionally log for debugging
});

// Store values in world context so each step can access them
Given('user has already valid write and data plan URL', function () {
  // Normally you'd retrieve from your Rudderstack class or environment
  this.dataPlaneUrl = process.env.DATAPLANE_URL //|| 'https://ahvinfetokvzds.dataplane.rudderstack.com';
  this.writeKey = process.env.WRITE_KEY //|| 'your_write_key_here';

  expect(this.dataPlaneUrl).toBeTruthy();
  expect(this.writeKey).toBeTruthy();
  console.log('sucessfully  get the data and write key')
});


// Given('a Webhook destination named {string} has already been created', async function (destinationName) {
//   await rudderstack.login();
//   await rudderstack.security();
//   await rudderstack.connections();
  
//   await expect(rudderstack.page.locator(`text=${destinationName}`)).toBeVisible({ timeout: 5000 });
//   console.log('got the desintaion')
//   await this.page.waitForTimeout(10000); // pause for 1 sec

// });


// When('the user clicks on the {string} tab', async function (tabName) {
//   if (tabName === 'Events') {
//     await this.page.click(rudderstack.clickEventTab);
//   } else {
//     throw new Error(`Tab "${tabName}" not handled in steps`);
//   }
// });

// Then('the user should be navigated to the Events page', async function () {
//   await expect(this.page.locator(rudderstack.delivered))
//     .toBeVisible({ timeout: 5000 });
// });

// Then('the page should display the text {string} to confirm successful navigation', async function (text) {
//   await expect(this.page.locator(`text=${text}`)).toBeVisible({ timeout: 5000 });
// });

Given('the user is logged in and has navigated to the Webhook destination page', async function () {
  rudderstack = new Rudderstackpage(this.page);
  await rudderstack.openLoginPage();
  await rudderstack.login();
  await rudderstack.security();
  await rudderstack.connections();
  await rudderstack.gotoWebhookDestination();

  // Wait until we know the destination page is loaded
  await this.page.waitForSelector(rudderstack.clickEventTab, { timeout: 15000 });
});

When('the user clicks on the {string} tab', async function (tabName) {
  if (tabName === 'Events') {
    await this.page.click(rudderstack.clickEventTab);
  } else {
    throw new Error(`Tab "${tabName}" not supported`);
  }
});

Then('the user should be navigated to the Events page', async function () {
  await this.page.waitForSelector(rudderstack.delivered, { timeout: 15000 });
});

Then('the page should display the text {string} to confirm successful navigation', async function (text) {
  await expect(this.page.getByText(text)).toBeVisible({ timeout: 15000 });
});


// ----------------- Second Feature -----------------

Given('the user is already logged in and has navigated to the Events tab in the Webhook destination', async function () {
  rudderstack = new Rudderstackpage(this.page);
  await rudderstack.openLoginPage();
  await rudderstack.login();
  await rudderstack.security();
  await rudderstack.connections();
  await rudderstack.gotoWebhookDestination();
});

When('the user reads the count of delivered and failed events, along with their respective percentages', async function () {
 // await this.page.click(rudderstack.dataFromEventsTab);
  const { deliveredData, failedData } = await rudderstack.dataFromEventsTab();
  this.deliveredData = deliveredData;
  this.failedData = failedData;
  console.log(`Delivered: ${deliveredData}`);
  console.log(`Failed: ${failedData}`);
});

Then('the delivered and failed event counts and percentages should be captured and stored', function () {
  expect(this.deliveredData).toBeTruthy();
  expect(this.failedData).toBeTruthy();
});

Then('the user should navigate to the {string} section from the left menu bar', async function (sectionName) {
  if (sectionName === 'Settings') {
    await rudderstack.logout();
  } else {
    throw new Error(`Section "${sectionName}" not handled in steps`);
  }
});

Then('the user should log out from the application', async function () {
  console.log('User logged out successfully');
});
