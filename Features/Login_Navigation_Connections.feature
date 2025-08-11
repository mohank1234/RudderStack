Feature: Login and navigate to Connections page

  As a Rudderstack user,
  I want to log into the application
  So that I can directly access the Connections page

  Scenario: Successfully log in and land on the Connections page
    Given I am on the Rudderstack login page
    When I enter valid credentials and click the login button
    When I see a security page asking to enable E2F and I choose "I'll do this later" and I click "Go to Dashboard" 
    Then I should be redirected to the Connections page
