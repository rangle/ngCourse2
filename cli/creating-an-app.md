# Creating a New App

## Creating a New App

Use the `ng new [app-name]` command to create a new app. This will generate a basic app in the folder of the app name provided. The app has all of the features available to work with the CLI commands. Creating an app may take a few minutes to complete since npm will need to install all of the dependencies. The directory is automatically set up as a new **git** repository as well. If git is not your version control of choice, simply remove the _.git_ folder and _.gitignore_ file.

## File and Folder Setup

The generated app folder will look like this:

![App folder](../.gitbook/assets/cli-folder-setup.png)

Application configuration is stored in different places, some located in the _config_ folder, such as test configuration, and some being stored in the project root such as linting information and build information. The CLI stores application-specific files in the _src_ folder and Angular-specific code in the _src/app_ folder. Files and folders generated by the CLI will follow the [official style guide.](https://angular.io/styleguide)

> Warning: The CLI relies on some of the settings defined in the configuration files to be able to execute the commands. Take care when modifying them, particularly the package.json file.

The CLI has installed everything a basic Angular application needs to run properly. To make sure everything has run and installed correctly we can run the server.

