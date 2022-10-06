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

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(
        userInfo as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

it('its possible to login with correct data', async () => {
  chaiHttpResponse = await chai
  .request(app)
  .post('/login')
  .send({ email: 'user@admin.com', password: '12345678910'})

  expect(chaiHttpResponse.body).to.have.property('token')
  expect(chaiHttpResponse.status).to.equal(200);
})

it('its impossible to login without a password', async () => {
  chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({email: userInfo.email})

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
});




});
