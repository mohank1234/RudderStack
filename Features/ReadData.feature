Feature: Count the delivery and failed messages

  Background:
    Given I am on the Events tab in Webhook destination

  Scenario: Read the count of delivered and failed events successfully
    When I read delivered and failed event counts
    Then the delivered and failed counts should be stored
    And I log out of the application