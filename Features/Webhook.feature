Feature: Navigate to Webhook page

  Background:
    Given I am on the Connections page

  Scenario: Open the Webhook destination from the Connections page
    When I click on the Webhook Automation destination
    Then I should see the Webhook Source page