import { httpStatusCodes } from '../entities/entities';
import MatchesModel from '../database/models/Matches.model';

export default class MatchesService {
  constructor(private matchesModel: typeof MatchesModel) {}

  async getAllMatches() {
    const matches = await this.matchesModel.findAll();

    return { code: httpStatusCodes.ok, data: matches };
  }
}
