import * as dotenv from 'dotenv';
import { expect } from '@playwright/test';
dotenv.config();

export class Rudderstackpage {
  constructor(page) {
    this.page = page;
    
    // Login Page Locators
    this.email = '#text-input-email';
    this.password = '#text-input-password';
    this.loginButton = 'button:has-text("Log in")';
    this.dolater = 'text=I\'ll do this later';
    this.dashboard = 'text=Go to dashboard';
    this.closepop = '//button[@role="button" and @title="Close"]';

    // Connections Page
    this.confirmLogin = 'span:has-text("HTTP Testing")';
    this.dataurl = 'span:has-text("https")';
    this.writekey = 'span:has-text("write key")';

    // Webhook Page
    this.webhook = 'span:has-text("Webhook")';

    //confirm webhook
    this.confirmwebhook = "h4:has-text('Sources')";

    // Events Tab
    this.clickEventTab = '#rc-tabs-0-tab-Events';
    // this.delivered = 'text=Delivered';
    // this.failed = 'text=Failed';
    // Delivered count
    this.deliveredCount = "div.sc-hHvloA.jFcMOz h2 span";
    // Failed count
    this.failedCount = "(//div[contains(@class,'sc-hHvloA jFcMOz')]//h2/span)[2]";

    
    //confrim Tab
    this.confirmeventtab = "span:has-text('Events Delivery')";

    // Settings / Logout
    this.navigateToSettings = 'text=Settings';
    this.confirmSettings = 'text=Log out';
  }

  async openLoginPage() {
    await this.page.goto(process.env.URL);
  }

  async login() {
    await this.page.fill(this.email, process.env.USERNAME_OR_MAIL);
    await this.page.fill(this.password, process.env.PASSWORD);
    await this.page.click(this.loginButton);
    // Wait for the page to navigate after login
    //await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
  }

  async security() {
  await this.page.waitForSelector(this.dolater);
  await this.page.click(this.dolater);
  await this.page.click(this.dashboard);
  console.log('DaShbaord viewd')
  // Wait for dashboard to load after navigating
//  await this.page.waitForNavigation({ waitUntil: 'networkidle0' });

}

  async connections() {

    const popup = this.page.locator(this.closepop);
      console.log('clicking close popup');
      try {
        await popup.waitFor({ state: 'visible', timeout: 3000 });
        await popup.click();
        console.log('done clicking close popup');
      } catch {
        console.log('popup not found, continuing...');
      }
   console.log('Waiting for Connections page confirmation...');
   await expect(this.page.locator(this.confirmLogin)).toBeVisible({ timeout: 30000 });
   console.log('Connections page confirmed.');
    }

    async getDataPlaneUrl()
    {const dataurl = await this.page.innerText(this.dataurl);
    const writekeyText = await this.page.innerText(this.writekey);
    const writekey = writekeyText.replace(/write\s*key/i, "").trim();
    return { dataurl, writekey };}

  async gotoWebhookDestination() {
    await this.page.click(this.webhook);
    console.log(1)
  } 

  async verifySourceText() {
    await this.page.waitForSelector(this.confirmwebhook, { state: 'visible' });
    await expect(this.page.locator(this.confirmwebhook)).toBeVisible();
}
 
  async NavigateToEvents() {
  console.log("Waiting for Events tab to be visible...");
  await this.page.locator(this.clickEventTab).waitFor({ state: 'visible', timeout: 25000 });

  console.log("Clicking on Events tab...");
  await this.page.locator(this.clickEventTab).click();

  console.log("Waiting for Events Delivery header to confirm navigation...");
  await this.page.locator(this.confirmeventtab).waitFor({ state: 'visible', timeout: 25000 });

  console.log("Navigation done to Events");
}


  async confirmEventTab()
  {
    await this.page.waitForSelector(this.confirmeventtab, { state: 'visible' });
    await expect(this.page.locator(this.confirmeventtab)).toBeVisible();
  }
    async dataFromEventsTab() {
      // Wait for the numeric count elements to appear
      await this.page.waitForSelector(this.deliveredCount, { timeout: 15000 });
      await this.page.waitForSelector(this.failedCount, { timeout: 15000 });

      // Read numeric counts
      const deliveredData = (await this.page.textContent(this.deliveredCount)).trim();
      const failedData = (await this.page.textContent(this.failedCount)).trim();

      // Store in eventData for later use if needed
      this.eventData = { deliveredData, failedData };

      return this.eventData;
    }
      async logout() {
        await this.page.click(this.navigateToSettings);
        await this.page.locator(this.confirmSettings).waitFor();
        await this.page.click(this.confirmSettings);
      }
    }
