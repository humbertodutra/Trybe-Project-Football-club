import * as sinon from 'sinon';
import * as chai from 'chai';

import { userInfo, userToken } from './mocks/userLoginMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User.model'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the method post four "/login" router', () => {

   let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(
        userInfo as unknown as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

it('its possible to login with correct data', async () => {
  chaiHttpResponse = await chai
  .request(app)
  .post('/login')
  .send({ email: 'admin@admin.com', password: 'secret_admin' })

  
  expect(chaiHttpResponse.status).to.equal(401);
})

it('its impossible to login without a password', async () => {
  chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({email: userInfo.email})

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
});

it('its impossible to login without a email', async () => {
  chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({password: userInfo.password})

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
});

it('its impossible to login with a wrong password', async () => {
  chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({email: userInfo.email, password: 'wrong'})

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
});

it('its impossible to login with a wrong email', async () => {
  chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({email: 'aaa@gmail.com', password: userInfo.password})

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
});
});

describe('Test the route /loginValidate', () => {
  let httpResp: Response;

  beforeEach(async () => {
    sinon.stub(UserModel, 'findOne').resolves(userInfo as unknown as UserModel)
  })

  afterEach(() => {
    (UserModel.findOne as sinon.SinonStub).restore()
  })

  it('if returns the correct data after pass a correct token', async () => {
    httpResp = await chai.request(app).get('/login/validate').set('authorization', userToken);

    expect(httpResp.status).to.equal(200);
    expect(httpResp.body).to.deep.equal({role: userInfo.role});
  })

  it('if returns a error in case of a invalid token', async () => {
    httpResp = await chai.request(app).get('/login/validate').set('authorization', '');
    expect(httpResp.status).to.equal(401);
    expect(httpResp.body).to.deep.equal({ message: 'Token must be a valid token' });
  })
})


