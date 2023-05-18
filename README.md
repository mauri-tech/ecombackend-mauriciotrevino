# E-Commerce Back End

## Description
This project is a back-end solution for an e-commerce site. It uses Express.js API and configures it to use Sequelize to interact with a MySQL database. This project also includes API routes to perform CRUD operations for categories, products, and tags.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Installation
To install necessary dependencies, run the following command:

```bash
npm install
```

## Usage
Create a .env file at the root of the project and add your MySQL credentials and database info to it:

- DB_NAME=ecommerce_db
- DB_USER=root
- DB_PW=your_mysql_password

Then, run the schema.sql file in the MySQL shell to create the database. Use the following command to seed some test data to your database:

```bash
npm run seed
```

Start the server using the following command:

```bash
npm start
```

## License
This project is licensed under the MIT license.


## Tests
This application can be tested using Insomnia Core or any other API testing tool.

## Questions
If you have any questions about the repo, open an issue or contact me directly at Mauricio.trevinon91@gmail.com. You can find more of my work at Mauri-tech.

## Author

- Name: Mauricio Trevino
- Github: [mauri-tech/ecombackend-mauriciotrevino](https://github.com/mauri-tech/ecombackend-mauriciotrevino)
- Email: mauricio.trevinon91@gmail.com