const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const { dbUser, database } = require('./config');
const connectionString = `postgres://${dbUser}@localhost/${database}`;
const products_controller = require('./products_controller');



const app = express();
app.use(json());
app.use(cors());

const massiveConnection = massive(connectionString)
  .then(db => {
    app.set('db', db);
  })
  .catch(err => {
    console.log(err);
  })

  app.post( '/api/product', products_controller.create );
  app.get( '/api/products', products_controller.getAll );
  app.get( '/api/product/:id', products_controller.getOne );
  app.put( '/api/product/:id', products_controller.update );
  app.delete( '/api/product/:id', products_controller.delete );

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on da port: ${port}`);
})
