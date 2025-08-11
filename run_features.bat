@echo off
echo Running feature files in custom order...

npx cucumber-js features\Login_Navigation_Connections.feature ^
features\UrlandWriteKey_Store.feature ^
features\SentAPIRequest.feature^
features\Webhook.feature ^
features\NavigatetoEventsPage.feature ^
features\ReadData.feature

echo Test execution completed.
pause
