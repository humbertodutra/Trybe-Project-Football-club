import * as sinon from 'sinon';
import * as chai from 'chai';

import { userInfo, userToken } from './mocks/userLoginMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LeaderBoardService from '../services/leaderboard.service';
import MatchesModel from '../database/models/Matches.model';
import TeamModel from '../database/models/Team.model';
import { total } from './mocks/leaderboardMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the method get for "/leaderboard" router', () => {

   let chaiHttpResponse: Response;
   const sandbox = sinon.createSandbox()

  beforeEach(async () => {
    sandbox
      
  });

  afterEach(()=>{
    sandbox.restore()
  })

it('its possible to find the router leaderboard', async () => {
  chaiHttpResponse = await chai
  .request(app)
  .get('/leaderboard')
  
  expect(chaiHttpResponse.status).to.equal(200);
});

it('its possible to find the route leaderboard/home', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.equal(200);
})

it('its possible to find the route leaderboard/away', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.equal(200);
})

})
