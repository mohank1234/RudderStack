import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(30 * 1000); // 20 seconds
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
//********************************************************1st Login******************************************************************************************** */
//login 
Given('I am on the Rudderstack login page', async function () {
  console.log("login started")
  await rudderstack.openLoginPage();
});

When('I enter valid credentials and click the login button', async function () {
  await rudderstack.login();
  console.log('login done')
});

When('I see a security page asking to enable E2F and I choose "I\'ll do this later" and I click "Go to Dashboard"', 
  async function () {
    console.log('secuirty started')
    await rudderstack.security();
    console.log('secuirty done')

  });

Then('I should be redirected to the Connections page', async function () {
  console.log('COnnections started')
  // Optionally log the URL to debug
  console.log('Redirected to:', await this.page.url());

  // Wait up to 15 seconds for "Connections" text anywhere on the page
  await expect(this.page.getByText('Connections')).toBeVisible({ timeout: 15000 });
});
///************************************************************2nd Data Key and Write Key ********************************************************************************/
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

When ('the user reads the Data Plane URL displayed at the top right corner of the page and write key', async function () {
  this.dataPlaneUrl = await rudderstack.getDataPlaneUrl();  // Ensure the method `getDataPlaneUrl` is defined in `Rudderstackpage`
  console.log("Data Plane URL:", this.dataPlaneUrl);  // Optionally log for debugging
  console.log('got the keys')
});

Then('the Data Plane URL and write key should be captured and stored', async function()
  {if (!this.dataPlaneUrl || !this.dataPlaneUrl.dataurl || !this.dataPlaneUrl.writekey) {
    throw new Error('Data Plane URL or Write Key is missing');
  }

  console.log(' Verified the keys:');
  console.log('Data URL:', this.dataPlaneUrl.dataurl);
  console.log('Write Key:', this.dataPlaneUrl.writekey);
  console.log(' Verification done for the keys:');

});
//********************************************************************3rd Webhook *********************************************************/
Given('the user is already logged in and on the Connections page and ready to navigate weebhook', async function ()
 {
  console.log('waited for login page')
  await rudderstack.openLoginPage();
  console.log('Webhook started login')
  await rudderstack.login();
  console.log('Webhook finished login')
  console.log('Webhook Started secuity clicks')
  await rudderstack.security();
  console.log('Webhook finished secuity clicks')
  console.log('Webhook Started gatheringshed data')
  await rudderstack.connections();
  console.log('Webhook finished gatheringshed  data')
});
When ('the user clicks on the Webhook Automation destination', async function()
{
  await rudderstack.gotoWebhookDestination();
});

Then('the page should contain the text Source as a confirmation of the webhookpage', async function () {
  await rudderstack.verifySourceText();
});

//************************************************************************ click the tab******************************************************/
Given('the user is logged in and has navigated to the Webhook destination page',async function()
{
  console.log('waited for login page')
  await rudderstack.openLoginPage();
  console.log('Tab started login')
  await rudderstack.login();
  console.log('Tab finished login')
  console.log('Tab Started secuity clicks')
  await rudderstack.security();
  console.log('Tab finished secuity clicks')
  console.log('Tab Started gatheringshed data')
  await rudderstack.connections();
  console.log('Tab finished gatheringshed  data')
  await rudderstack.gotoWebhookDestination();
  console.log("Nvaigation done to webhook page for tab")
  console.log("Now navoagteing to event tab")
})

When('the user clicks on the Events tab',async function()
{
  await rudderstack.NavigateToEvents();
})

Then('the page should display the text Events Delivery to confirm successful navigation',async function()
{
  await rudderstack.confirmEventTab();
});

// *************************************************Collection of events***********************************
Given('the user is already logged in and has navigated to the Events tab in the Webhook destination', async function () {
console.log('waited for login page')
  await rudderstack.openLoginPage();
  console.log('Tab for data started login')
  await rudderstack.login();
  console.log('Tab for datab finished login')
  console.log('Tab for data Started secuity clicks')
  await rudderstack.security();
  console.log('Tab for data finished secuity clicks')
  console.log('Tab for data Started gatheringshed data')
  await rudderstack.connections();
  console.log('Tab for data finished gatheringshed  data')
  await rudderstack.gotoWebhookDestination();
  console.log("Navigation done to webhook page for Tab for data")
  await rudderstack.NavigateToEvents();
  console.log('in the final  page');

});

When('the user reads the count of delivered and failed events, along with their respective percentages', async function () {
  this.eventData = await rudderstack.dataFromEventsTab(); // stores the result
  console.log('Delivered:', this.eventData.deliveredData);
  console.log('Failed:', this.eventData.failedData);
});

Then('the delivered and failed event counts and percentages should be captured and stored', async function () {
  // Optionally add assertions if needed
  expect(this.eventData.deliveredData).toMatch(/\d+/);
  expect(this.eventData.failedData).toMatch(/\d+/);

});

Then('the user should navigate to the {string} section from the left menu bar', async function (section) {
  if (section === 'Settings') {
    await rudderstack.navigateToSettingsSection(); // method to click menu and go to Settings
  }
});

Then('the user should log out from the application', async function () {
  await rudderstack.logout();
});
