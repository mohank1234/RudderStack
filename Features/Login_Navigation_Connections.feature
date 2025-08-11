Feature: Login and navigate to Connections page

  As a Rudderstack user
  I want to log into the application once
  So that I can directly access the Connections page

  Background:
    Given I am on the Connections page

  Scenario: Successfully land on the Connections page
    Then I should see the Connections page
