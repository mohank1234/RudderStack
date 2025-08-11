Feature: Get the Data plan url and Write key

Scenario: Capture and store the Data Plane URL and write key from the Connections page successfully
  Given the user is already logged in and on the Connections page
  When the user reads the Data Plane URL displayed at the top right corner of the page and write key
  Then the Data Plane URL and write key should be captured and stored