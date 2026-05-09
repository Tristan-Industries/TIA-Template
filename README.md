# TIA-Template
Template to create TIAs for tiPRO

## You will be required to enable Developer Mode on tiPRO.
### In order to do so, you must disable cloud sync via the calendar fly-in and select real pc and not virtual folder. 

Run ```npm install```
Create the TIA according to the documentations with the APIs to access the OS and its services.

Run ```npm run package``` to package into a .tia file to load into the App Installer app to install the .tia file.

# WARNING!!!

## Do not touch the tia-sdk.ts file or the api folder in src/
## This means do not touch anything in src/api/* and src/tia-sdk.ts file for those of you who only speak programmer.
