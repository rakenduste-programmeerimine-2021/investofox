const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../src/models/User')
const controller = require('../src/routes/auth')

describe('POST api/auth/signup', () =>{
    before((done) =>{
        conn.connect()
        .then(() => done())
        .catch((err) => done(err))
    })

    after((done) =>{
        conn.close()
        .then(() => done())
        .catch((err) => done(err))
    })

    it('OK, creating a new user works', (done) =>{
        request(controller).post('/signup')
        .send({firstName: "test", lastName: "test", email: "test1@email.ee", password: "testing1"})
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property("_id")
            expect(body).to.contain.property("firstName")
            expect(body).to.contain.property("lastName")
            expect(body).to.contain.property("email")
            done()
        })
    })
})