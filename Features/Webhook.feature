Feature: Naviagate to Webhook page 

Scenario: Open the Webhook destination from the Connections page

  Given the user is already logged in and on the Connections page  to navigate weebhook
  When the user clicks on the "Webhook Automation" destination  
  Then the user should be navigated to the "Webhook Automation" destination details page  
  And the page should display the "Sources" section  
  And the page should contain the text "Source" as a confirmation