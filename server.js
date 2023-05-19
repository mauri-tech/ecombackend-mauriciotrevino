const express = require('express');
const routes = require('./routes');

// import sequelize connection

const app = express();

// it can also work with port 3002
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
async function startServer() {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (err) {
    console.error('Unable to sync database:', err);
  }
}

startServer();