@echo off
echo Running feature files in custom order...

npx cucumber-js features\Login_Navigation_Connections.feature
npx cucumber-js features\UrlandWriteKey_Store.feature
npx cucumber-js features\Webhook.feature
npx cucumber-js features\NavigatetoEventsPage.feature
npx cucumber-js features\ReadData.feature

echo Test execution completed.
pause
