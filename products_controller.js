module.exports = {
  create: ( req, res, next ) => {
    const db = req.app.get('db');
    const { name, description, price, imageurl } = req.body;

    db.create_product([ name, description, price, imageurl ])
      .then( () => res.status(200).send() )
      .catch( (err) => res.status(500).send() );
  },

  getOne: ( req, res, next ) => {
    const db = req.app.get('db');
    const { params } = req;

    db.read_product([ params.id ])
      .then( product => res.status(200).send( product ) )
      .catch( (err) => {console.log(err);} );
  },

  getAll: ( req, res, next ) => {
    const db = req.app.get('db');

    db.read_products()
      .then( products => res.status(200).send( products ) )
      .catch( () => res.status(500).send() );
  },

  update: ( req, res, next ) => {
    const db = req.app.get('db');
    const { params, query } = req;

    db.update_product([ params.id, query.desc ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  delete: ( req, res, next ) => {
    const db = req.app.get('db');
    const { params } = req;

    db.delete_product([ params.id ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  }
};
