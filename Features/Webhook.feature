Feature: Naviagate to Webhook page 

Scenario: Open the Webhook destination from the Connections page

  Given the user is already logged in and on the Connections page and ready to navigate weebhook
  When the user clicks on the Webhook Automation destination
  And the page should contain the text Source as a confirmation of the webhookpage
