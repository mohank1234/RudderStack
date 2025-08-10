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
    this.confirmWebhook = 'h3:has-text("Connections")';

    // Events Tab
    this.clickEventTab = '#Events';
    this.delivered = 'text=Delivered';
    this.failed = 'text=Failed';

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
    await this.page.locator(this.confirmWebhook).waitFor();
    console.log(2)
    await expect(this.page.locator(this.confirmWebhook)).toBeVisible();
    console.log(3)
  }
async dataFromEventsTab() {
  // Wait until the Events tab is visible and clickable
  await this.page.waitForSelector(this.clickEventTab, { timeout: 15000 });
  await this.page.click(this.clickEventTab);

  // Wait for the delivered and failed elements to appear
  await this.page.waitForSelector(this.delivered, { timeout: 15000 });
  await this.page.waitForSelector(this.failed, { timeout: 15000 });

  // Read the values
  const deliveredData = (await this.page.innerText(this.delivered)).trim();
  const failedData = (await this.page.innerText(this.failed)).trim();

  return { deliveredData, failedData };
}


  async logout() {
    await this.page.click(this.navigateToSettings);
    await this.page.locator(this.confirmSettings).waitFor();
    await this.page.click(this.confirmSettings);
  }
}
