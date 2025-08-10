Feature:Count the delevery and failed messages count

Scenario: Read the count of delivered and failed events successfully

  Given the user is already logged in and has navigated to the Events tab in the Webhook destination  
  When the user reads the count of delivered and failed events, along with their respective percentages  
  Then the delivered and failed event counts and percentages should be captured and stored  
  And the user should navigate to the "Settings" section from the left menu bar  
  And the user should log out from the application