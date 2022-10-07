import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService: TeamService) {}

  async getAll(_req: Request, res: Response): Promise<Response> {
    const { code, data } = await this.teamService.getAllTeams();
    return res.status(code).json(data);
  }
}
