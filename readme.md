# User Management API
>
> RESTful api

This repository contains the code for a User Management API that allows for the creation, retrieval, and modification of users. The API is built using Node.js, Express, and Sequelize with a MySQL database.

**Prerequisites**

1. Node.js (version 12 or above)
2. NPM (version 6 or above)
3. TypeScript (version 4.9.5 or above)
4. MySQL (version 2.1.0 or above)
5. Sequelize (version 6.28.0 or above)

**Installation**

1. Clone the repository

```sh
git clone https://github.com/VictorAlwyn/user-management-api.git
```

2. Navigate to the project directory

```sh
 cd user-management-api
```

3. Install the dependencies

```sh
npm install
```

**Configuration**

Create a .env file in the project directory and set the following environment variables:

```sh
APP_PORT=3000
APP_HOST=localhost
APP_BASE_URL=http://${APP_HOST}:${APP_PORT}/
JWT_SECRET=secret
DB_HOST=localhost
DB_NAME=user-management-db
DB_USERNAME=root
DB_PASSWORD=root
```

**Running the Application**

To start the application, run the following command in the terminal:

```sh
npm run start
```

**Debug**

To start the application in debug mode, run the following command in the terminal:

```sh
npm run debug
```

**Testing**

To run the test cases, execute the following command:

```sh
npm run test
```

**Testing Debug**

To run Mocha tests with the DEBUG environment variable set to *., execute the following command:

```sh
npm run test-debug
```

**Database Migration**

The database schema can be updated using the following command:

```sh
npm run migrate
```

**Undo Migration**

To undoes all database migrations using the following command:

```sh
npm run migrate:undo
```

**Create Migration**

To creates a new database migration using the following command:

```sh
npm run migration:create --name user --attributes "text:text, url:string"
```

**Create Model**

To creates a new database model using the following command:

```sh
npm run model:create --name user --attributes "text:text, url:string"
```

**Seed Database**

To  seeds the database. using the following command:

```sh
npm run seed"
```

**Undo Seed**

To undoes all database seeds. using the following command:

```sh
npm run seed:undo"
```

**Create Seed**

To creates a new database seed. using the following command:

```sh
npm run seed:create"
```

Access `http://localhost:<PORT>/>` and you're ready to go!
> <http://localhost:3000/>

## Overview

- uses Node.js > v14
- written using ES6
- uses Yarn for package dependency management
- uses [JavaScript Standard Style](http://standardjs.com/)
- uses `sequelize` and `sequelize-cli` as ORM and data migration tool
  > can change easily to diffrent ORM and migration tool.
- Filename convention - `camelCase` should never be used. This leaves `snake_case` and `kebab-case`, I prefer `snake_case` for file.

## Using Sequelize

Sequelize is used to define mappings between models and database tables. It will automatically add the attributes `created_at` and `updated_at` to the tables created. However for consistency for our naming we change this to `createdAt` and `updatedAt`. This will cause issue when using model so we have to add this on config:

```js
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    ...
  }, {
    timestamps: false, // Add this
  })
}
```

Basic commands

```sh
sequelize  db:migrate             Run pending migrations.
sequelize  db:migrate:old_schema  Update legacy migration table
sequelize  db:migrate:undo        Revert the last migration run.
sequelize  db:migrate:undo:all    Revert all migrations ran.
sequelize  db:seed                Run seeders.
sequelize  db:seed:undo           Deletes data from the database.
sequelize  db:seed:undo:all       Deletes data from the database.
sequelize model:create --name modelname --attributes "text:text, url:string"  # create model
sequelize seed:create     # create seeder
```

> If you did not install your sequelize-cli globally you can run this commands by `npx`

#### Setting up associations — migration and model files

**IMPORTANT**: as of `6/23/17` the model file created with the `sequelize db:model` command still initializes a model with an empty `classMethods` object with an `associate` property in the options passed to `sequelize.define` method. **You cannot define associations this way anymore as of Sequelize v4.0.0-1.** This tripped me up for a hot second because the generated model file did not reflect this change, and the fact that support for the old way had been removed is seemingly buried in the changelogs. Don’t make the same mistake I did and be super confused for too long about why associations aren’t working.

```js
//old way that will be included in your generated model file
module.exports = function(sequelize, DataTypes) {
  var nameofmodel = sequelize.define('nameofmodel', {
    ...model attributes
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  })
  return nameofmodel
};
//The right way to set associations in model files
module.exports = function(sequelize, DataTypes) {
  var nameofmodel = sequelize.define('nameofmodel', {
    ...model attributes
  });

  nameofmodel.associate = function (models) {
    // associations can be defined here
  };
  return nameofmodel
}
```

### Sequelize CLI Documentation

For reference, see: [https://github.com/sequelize/cli](https://github.com/sequelize/cli)

## Dependencies

The following dependencies are required for the application:

- Argon2: Used for password hashing.
- CORS: Used for enabling cross-origin resource sharing.
- Debug: Used for debugging information.
- Dotenv: Used for loading environment variables from a .env file.
- Express: Used for building the API.
- Express Validator: Used for validating user input.
- Express Winston: Used for logging information.
- Helmet: Used for setting security-related HTTP headers.
- JSON Web Token: Used for generating and verifying JWT tokens.
- Lodash: Used for utility functions.
- MySQL2: Used for connecting to the MySQL database.
- Sequelize: Used for modeling and querying the database.
- Shortid: Used for generating short, unique identifiers.
- Winston: Used for logging information.

## Development Dependencies

The following dev dependencies are required for development and testing:

- @faker-js/faker: Used for generating fake data for testing.
- @types/argon2: TypeScript definitions for Argon2.
- @types/chai: TypeScript definitions for Chai.
- @types/cors: TypeScript definitions for CORS.
- @types/debug: TypeScript definitions for Debug.
- @types/express: TypeScript definitions for Express.
- @types/jsonwebtoken: TypeScript definitions for JSON Web Token.
- @types/lodash: TypeScript definitions for Lodash.
- @types/mocha: TypeScript definitions for Mocha.
- @types/shortid: TypeScript definitions for Shortid.
- @types/supertest: TypeScript definitions for Supertest.
- Chai: Used for testing the application.
- Mocha: Used for testing the application.
- Sequelize CLI: Used for running Sequelize commands from the command line.
- Source Map Support: Used for generating source maps for TypeScript code.
- Supertest: Used for testing the API.
- Ts-node: Used for running TypeScript code with Node.js.
- Tslint: Used for linting the TypeScript code.
- TypeScript: Used for writing the application code.

## JavaScript Standard Style

### The Rules

- **2 spaces** – for indentation
- **Single quotes for strings** – except to avoid escaping
- **No unused variables** – this one catches *tons* of bugs!
- **No semicolons** – [It's][1] [fine.][2] [Really!][3]
- **Never start a line with `(`, `[`, or `` ` ``**
  - This is the **only** gotcha with omitting semicolons – *automatically checked for you!*
  - [More details][4]
- **Space after keywords** `if (condition) { ... }`
- **Space after function name** `function name (arg) { ... }`
- Always use `===` instead of `==` – but `obj == null` is allowed to check `null || undefined`.
- Always handle the node.js `err` function parameter
- Always prefix browser globals with `window` – except `document` and `navigator` are okay
  - Prevents accidental use of poorly-named browser globals like `open`, `length`,
    `event`, and `name`.
- **And [more goodness](https://standardjs.com/)**

## Contributing

Contributions are welcome. Please open an issue or submit a pull request with your changes.
