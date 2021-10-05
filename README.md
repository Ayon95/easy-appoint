# EasyAppoint

An appointment-management app that allows users to add, edit, or delete their appointments. Doctors, in particular, may find this app useful. Patient information such as their name, age, phone number, and appointment date can be stored and managed.

Link to the application: https://easy-appoint.netlify.app

### Try it out with these fake credentials

- Username: testUser
- Password: pass123

## Lessons learned

- How to use Material UI (v5) to create user interfaces in React
- How to use React Query to manage data coming from the server in the client-facing app
- How to define and use HOCs (higher-order components) in React
- How to implement server-side pagination, searching, and sorting
- How to set up a SQL database (MySQL) and connect it to an Express app
- How to write SQL queries and send them from the backend to the MySQL database
- How to deploy a MySQL database on Heroku through ClearDB

## Features

- CRUD functionalities
- User authentication and authorization (JWT authentication)
- Pagination
- Sorting by various fields (full name, age, and date)
- Searching
- Appointments with today's date are highlighted

## Tools and technologies used

- Material UI
- create-react-app
- React + Hooks + Context
- React Router
- React Query
- Formik + Yup
- Nodejs + Express
- MySQL
- jsonwebtoken
- bcrypt

## Get started

Open a terminal and clone this repo:

```bash
# Clone this repository
$ git clone https://github.com/Ayon95/easy-appoint.git

# Go into the repository
$ cd fullstack-memories-app

# Remove current origin repository
$ git remote remove origin

# If you want, you can add a new remote repository
$ git remote add origin https://github.com/<your-github-username>/<your-repo-name>.git
```

Go to the `server` folder, and create a `.env` file. Add the following environment variables with your own values:

```dosini
PORT=5000

MYSQL_USER='root'
MYSQL_HOST='localhost'
MYSQL_PASSWORD='your-mysql-password'
MYSQL_DATABASE='your-database-name'

JWT_SECRET='your-jwt-secret-string'
```

You can set up a local MySQL database connection using softwares like [MySQL Workbench](https://www.mysql.com/products/workbench/) and [HeidiSQL](https://www.heidisql.com/)<br />

Once you have created a local database, open up two terminals - one for the server, and one for the client:

```bash
# Terminal for the server
# cd into the server folder
$ cd server

# Install dependencies
$ npm install

# Install nodemon if you don't have it
# You can either install it globally, or locally only for this project (remove the -g flag)
npm install nodemon -g

# run the server
$ npm run dev
```

```bash
# Terminal for the client
# cd into the client folder
$ cd client

# Install dependencies
$ npm install

# run the client app
$ npm start
```

At this point, you will have the server running locally at http://localhost:5000, and the client app running in the browser at http://localhost:3000<br />.

Note that the client app is configured to send all requests to the deployed server. If you want it to send requests to the local server, then you just have to change the base url in `AuthContext.js` and `appointmentService.js`:

```js
// In client/src/contexts/AuthContext.js
const baseUrl = 'http://localhost:5000/user';
```

```js
// In client/src/services/appointmentService.js
const baseUrl = 'http://localhost:5000/posts';
```

## Deployment

- Client-side application is deployed to [Netlify](https://netlify.com/)<br />
- Server-side app is deployed to [Heroku](https://www.heroku.com/home)

### Deploying the server to Heroku

#### Heroku account

If you don't have a [Heroku account](https://signup.heroku.com/), you will need to create one first. Then, you have to install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) on your machine. After that, open a terminal and log in to your Heroku account:

```bash
$ heroku login
```

#### Procfile

Then, go to the `server` folder, and create a file named `Procfile`. The `Procfile` tells Heroku which command to run at startup. Inside that file, include the following command:

```
web: npm start
```

#### ClearDB database

ClearDB is an add-on that you can use to create and deploy a MySQL database. To add this add-on, go to your Heroku project dashboard, and select the `Resources` tab. Then search for ClearDB MySQL.<br />

Once you have successfully created a ClearDB database, go to the `Settings` tab and click on `Reveal Config Vars`. There will be a config variable called `CLEARDB_DATABASE_URL`. This URL contains information required for your server-side application to connect to this database. The format of the URL is shown below along with what different parts mean:

```dosini
CLEARDB_DATABASE_URL=mysql://<MYSQL_USER>:<MYSQL_PASSWORD>@<MYSQL_HOST>/<MYSQL_DATABASE>?reconnect=true
```

Make sure to add these config variables with the values from the ClearDB database URL.

#### Create a Heroku app

Then, go to your Heroku dashboard on the Heroku website, and create a Heroku app for this project. Initialize a git repository if your project does not have one, and add a heroku remote branch:

```bash
# Make sure you are in the project root directory, i.e. the folder that contains client and server sub-folders
# Initialize an empty git repository
$ git init

# Add a heroku remote for your project
$ heroku git:remote -a your-project-name

# Push the server folder (which is a subdirectory) from the master branch to the remote heroku branch
git subtree push --prefix server heroku master
```

After that, Heroku will generate a build of the server-side app and deploy it if the build is successful.<br />

#### Final steps

- Make sure to add config variables to your heroku app, for example, your database config variables and jwt secret
  - you can add config variables by going to the `Settings` tab in your Heroku project dashboard
  - the config variables need to be named exactly the same as your environment variables
- Make sure to configure your client app to send all requests to your deployed heroku app

### Deploying the client app to Netlify

First, create a Netlify account if you do not have one already. Log in to your account. If your project is already on GitHub, then you can opt for Netlify's continuous deployment:

- Click `New site from git`, then select `GitHub`
- Select the project repo that you want to link to your Netlify site for continuous deployment
- Apply these settings -> Base Directory: client, Build Command: npm run build, Publish directory: client/build
- Click `Deploy Site`

If you do not have a git repo for your project on GitHub, then you have to manually generate a production build of the client app:

```bash
$ cd client

# create a production build
$ npm run build
```

You can use this `build` folder to deploy the client app to Netlify.
