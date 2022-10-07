import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService: TeamService) {}

  async getAll(_req: Request, res: Response): Promise<Response> {
    const { code, data } = await this.teamService.getAllTeams();
    return res.status(code).json(data);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const toNumber = Number(id);
    const teamById = await this.teamService.getTeamById(toNumber);
    const { code, data } = teamById;
    return res.status(code).json(data);
  }
}
