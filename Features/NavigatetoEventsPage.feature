Feature: Navigating to Events tab

  Background:
    Given I am on the Webhook destination page

  Scenario: Navigate to the Events tab successfully
    When I click the Events tab
    Then I should see Events Delivery on the page