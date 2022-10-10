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

  async saveMatch(req: Request, res: Response): Promise<Response> {
    const matchToSave = req.body;

    const saveMatch = await this.matchesService.saveMatch(matchToSave);
    
    if (!saveMatch.data) {
      return res.status(saveMatch.code).json({ "message": saveMatch.message });
    }

    return res.status(saveMatch.code).json(saveMatch.data);
  }

  async changeMatchStatus(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const changeMatchStatus = await this.matchesService.changeMatchStatus(Number(id))
    return res.status(changeMatchStatus.code).json(changeMatchStatus.data);

  }

  async updateMatchInProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const infoToChange = req.body;

    const update = await this.matchesService.updateMatchInProgress(Number(id), infoToChange)

    return res.status(update.code).json(update.data);

  }
}
