Feature: Get the Data plane URL and Write key

  Background:
    Given I am on the Connections page

  Scenario: Capture and store the Data Plane URL and write key from the Connections page successfully
    When I read the Data Plane URL and Write Key
    Then the Data Plane URL and Write Key should be stored