import * as sinon from 'sinon';
import * as chai from 'chai';

import { matches, singleMatch, getMatchesInProgressFalse } from './mocks/matchMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/Matches.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the method post four "/matches" router', async () => {

   let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(
        matches as unknown as MatchesModel[]);
  });

  afterEach(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })

it('its possible to get all matches data', async () => {
  chaiHttpResponse = await chai
  .request(app)
  .get('/matches')
  
  expect(chaiHttpResponse.body).to.deep.equal(matches)
  expect(chaiHttpResponse.status).to.equal(200);
})

it('its possible to get finished matches', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=false')

    expect(chaiHttpResponse.body[0]).to.deep.equal(getMatchesInProgressFalse[0])
    expect(chaiHttpResponse.status).to.equal(200)
})

});