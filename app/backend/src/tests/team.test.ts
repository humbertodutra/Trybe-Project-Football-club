import * as sinon from 'sinon';
import * as chai from 'chai';

import { teamMocks,singleTeam   } from './mocks/teamMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

describe('Test the route /teams', () => {
  let chaiHttpResponse: Response;

  beforeEach(async() => {
    sinon.stub(TeamModel, "findAll").resolves(teamMocks as TeamModel[])
    sinon.stub(TeamModel, "findByPk").resolves(singleTeam as TeamModel)
  });

  afterEach(() =>{
    (TeamModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findByPk as sinon.SinonStub).restore();
  })

  it('Test if returns all teams', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamMocks)
  })

  it('test if returns a single team, filtred by Id', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(singleTeam);
  })
})
const { expect } = chai;







