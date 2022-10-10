import { httpStatusCodes, MatchesI } from '../entities/entities';
import MatchesModel from '../database/models/Matches.model';
import TeamModel from '../database/models/Team.model';

export default class MatchesService {
  constructor(private matchesModel: typeof MatchesModel) {}

  async getAllMatches() {
    const matches = await this.matchesModel.findAll({
      include: [{
        model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] },
      },
      {
        model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] },
      },
      ],
    });

    return { code: httpStatusCodes.ok, data: matches };
  }

  async getMatchesInProgress(progress: boolean) {
    const matches = await this.matchesModel.findAll(
      { where: { inProgress: progress },
        include: [{
          model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] },
        }, {
          model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] },
        }],
      },
    );
    return { code: httpStatusCodes.ok, data: matches };
  }

  async saveMatch(match: MatchesI) {
    const saveMatch = await this.matchesModel.create(match);
    if (match.homeTeam === match.awayTeam) {
      return { code: httpStatusCodes.tokenNot,
        message: 'It is not possible to create a match with two equal teams' };
    }

    return { code: httpStatusCodes.created, data: saveMatch };
  }

  async changeMatchStatus(id: number){
    await this.matchesModel.update({ inProgress: false}, {where: { id }})
    return { code: httpStatusCodes.ok, data: { message: 'Finished' } };
  }
}
