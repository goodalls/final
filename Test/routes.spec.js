const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(() => {
          done();
        });
      });
    });
  });

  it('should return 404 message if url does not exist', () => {
    return chai
      .request(server)
      .get('/sadPath')
      .then(response => {
        response.should.have.status(404);
      })
      .catch(error => {
        throw error;
      });
  });
});

describe('API Routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(() => {
          done();
        });
      });
    });
  });
  describe('GET  /api/v1/items/', () => {
    it('GET should return all items on the mars packing list', () => {
      return chai
        .request(server)
        .get('/api/v1/items/')
        .then(response => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a('array');
          expect(response.body[0]).to.have.property('id');
          expect(response.body[0]).to.have.property('name');
          expect(response.body[0]).to.have.property('packed');
        })
        .catch(error => {
          throw error;
        });
    });

    it('GET should return item by ID on the mars packing list', () => {
      return chai
        .request(server)
        .get('/api/v1/items/1')
        .then(response => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a('array');
          expect(response.body[0]).to.have.property('id');
          expect(response.body[0]).to.have.property('name');
          expect(response.body[0]).to.have.property('packed');
        })
        .catch(error => {
          throw error;
        });
    });

    it('GET should return 404 if that item does not exist', () => {
      return chai
        .request(server)
        .get('/api/v1/items/5000')
        .then(response => {
          expect(response).to.have.status(404);
        })
        .catch(error => {
          throw error;
        });
    });
  });
  describe('POST api/v1/items', () => {
    it('should create a new item', () => {
      return chai
        .request(server)
        .post('/api/v1/items/')
        .send({
          name: 'beacon of truth',
          packed: 'false'
        })
        .then(response => {
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('id');
          expect(response.body.id).to.equal(4);
        })
        .catch(err => {
          throw err;
        });
    });
    it('should return 422 if missing an required property', () => {
      return chai
        .request(server)
        .post('/api/v1/items')
        .send({
          // name: "beacon of truth",
          packed: 'false'
        })
        .then(response => {
          expect(response).to.have.status(422);
          expect(response).to.be.json;
          expect(response.body).to.be.a('object');
          expect(response.body.error).to.equal(
            `Expected format: { name: <string>, packed: <boolean> } You're missing the "name" property`
          );
        })
        .catch(err => {
          throw err;
        });
    });
  });

  describe('DELETE /api/v1/items/:id', () => {
    it('should delete a item', () => {
      return chai
        .request(server)
        .delete('/api/v1/items/1')
        .then(response => {
          expect(response).to.have.status(200);
          expect(response.body).to.equal(1);
        });
    });
    it('should have a sad path', () => {
      return chai
        .request(server)
        .delete('/api/v1/items/2000')
        .then(response => {
          expect(response).to.have.status(404);
        });
    });
  });
  describe('PATCH    /api/v1/items/', () => {
    it('should update the expected group', () => {
      return chai
        .request(server)
        .patch('/api/v1/items/1')
        .send({ packed: true })
        .then(response => {
          response.should.have.status(200);
          expect(response.body).to.equal('Record successfully updated');
        });
    });

    it('should return 422 if no record was updated', () => {
      return chai
        .request(server)
        .patch('/api/v1/items/2500')
        .send({ packed: true})
        .then(response => {
          response.should.have.status(422);
          expect(response.body.error).to.equal('unable to update item');
        });
    });
  })
  
});
