import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService) {}

  async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const { code, data } = await this.matchesService.getMatchesInProgress(inProgress === 'true');

      return res.status(code).json(data);
    }

    const { code, data } = await this.matchesService.getAllMatches();

    return res.status(code).json(data);
  }
}
