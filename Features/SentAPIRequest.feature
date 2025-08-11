Feature: Send HTTP request to Webhook using provided data

  Background:
    Given I am on the Connections page
    And I read the Data Plane URL and Write Key

  Scenario: Send an event to the HTTP source
    When I send an event to the endpoint "/v1/track"
    Then the API should respond with a 200 status code