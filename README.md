# Namma Bus
Welcome to Namma Bus! The perfect point to get started on your journey to any part of the world!!


## Table of Contents
1. [About the Repo](#about-the-repo)
1. [Installation](#installation)
3. [Running the application](#running-the-application)
4. [Project Structure](#project-structure)
5. [Features](#features)

## About the Repo
This repository is the backend system for the application Namma-Bus using RESTful APIs. The backend is built using (but not by) MEN (MongoDB, Express JS and Node JS). Mr. R (React) may showcase his entry in the sequel of this project to make this a MERN project. Apart from these three, for you to work on this project fully, you should also have installed MongoDB Shell/MongoDB Compass, an API testign tool - Postman or Insomnia. 

## Installation
First of all fork the project. Use the button shown above.
```bash
git init
git clone "https://github.com/niranjank2022/Namma-Bus.git"
cd Namma-Bus
```

## Running the application
Create a .env file and mention the following key-values.
```
PORT=<port no you want you application to run in your local machine>
MONGODB_URI="<The connection URI to your database cluster in MongoDB Atlas>"
JWT_SECRET_KEY="<Any string you want to use for signing your credentials and create a JWT token>"
```

Note that, **npm** and **node** must be installed in your system proper functioning of application.
```bash
npm install
npm run dev
```

## Project Structure
```
/
|--- src
|    |
|    |--- middlewares
|    |    |
|    |    |--- authorizer.ts
|    |
|    |--- models     # Contains the schema of the MongoDB collections
|    |    |
|    |    |--- buses.ts
|    |    |--- users.ts
|    |    
|    |--- routes     # Contains the route handler functions
|    |    |
|    |    |--- admin.ts
|    |    |--- auth.ts
|    |    |--- user.ts
|    |
|    |--- index.ts               # The application program
|
|--- .env
|--- .gitignore
|--- LICENSE
|--- package-lock.json
|--- package.json           # npm packages required 
|--- README.md
|--- tsconfig.json
```

## Features

- Both Admin and Users can login. Users can also register and create a new account. Only one account per email. Admin accounts are created directly in the database.
- Admin can view the buses and details of ticket price, seats and others.
- Admin can also add a new bus and its details
- Admin can reset the seats booked in a bus, which will be reflected in the user database as well.
- User can view list of buses and available seats.
- User can book an available seat and later cancel that as well.

## Conclusion

That's it for now. Check again later for more texts and formatting.