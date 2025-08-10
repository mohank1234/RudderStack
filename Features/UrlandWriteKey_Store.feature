Feature: Get the Data plan url and Write key

Scenario: Capture and store the Data Plane URL from the Connections page successfully
  Given the user is already logged in and on the Connections page
  When the user reads the Data Plane URL displayed at the top right corner of the page
  Then the Data Plane URL should be captured and stored


Scenario: Copy and store the Write Key of the HTTP source
  Given the user is already logged in and on the Connections page
  And an HTTP source has been created
  When the user copies the Write Key from the HTTP source under the Source category
  Then the Write Key should be captured and stored
  And the Write Key should not be empty
  And the Write Key should match the expected pattern