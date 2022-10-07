import TeamModel from '../database/models/Team.model';
import { httpStatusCodes } from '../entities/entities';

export default class TeamService {
  constructor(private teamModel: typeof TeamModel) {}

  async getAllTeams() {
    const allTeams = await this.teamModel.findAll();

    return { code: httpStatusCodes.ok, data: allTeams };
  }

  async getTeamById(id: number) {
    const teamById = await this.teamModel.findByPk(id);

    return { code: httpStatusCodes.ok, data: teamById };
  }
}
