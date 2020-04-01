This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation SQL

Install [Docker](https://store.docker.com/editions/community/docker-ce-desktop-mac)

install the sql server within Docker by running in terminal:

### `sudo docker pull microsoft/mssql-server-linux:2017-latest`

Create the sql server instance with password Password31!

### `sudo docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=YourStrong!Password31!' -p 1401:1433 --name sqlserver1 -d microsoft/mssql-server-linux:2017-latest`

if you want to change the password, edit the above command and change the port or password. The config needs to also be edited within:

sql-server > src > Utils > constants.js

this contains some of the config.

Verify correct installation via

### `docker ps -a`

Next, run

### `node createDatabase.js`

from within the Utils directory. This will create and populate the database with the timestamp information.

## Available Scripts & Installation for API

run

### `yarn install`

within the the sql server directory. Next, run

### `node src/index.js`

To start up the API. You can adjust the ports within the constants file.

## Available Scripts & Installation for webapp

To run the webapp, in the project directory, you can run:

### `yarn install`

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

You can adjust the config from within

### `Utils/Constants.ts`

To change ports etc.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
