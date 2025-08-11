Feature: Naviagating to Events tab


Scenario: Navigate to the Events tab successfully

  Given the user is logged in and has navigated to the Webhook destination page  
  When the user clicks on the Events tab  
  Then the page should display the text Events Delivery to confirm successful navigation