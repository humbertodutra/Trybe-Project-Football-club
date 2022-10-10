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
    if (match.homeTeam === match.awayTeam) {
      return { code: httpStatusCodes.tokenNot,
        message: 'It is not possible to create a match with two equal teams' };
    }
    try {
      const saveMatch = await this.matchesModel.create(match);
      return { code: httpStatusCodes.created, data: saveMatch };
    } catch (error) {
      return { code: httpStatusCodes.notExist, message: 'There is no team with such id!' };
    }
  }

  async changeMatchStatus(id: number) {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });
    return { code: httpStatusCodes.ok, data: { message: 'Finished' } };
  }

  async updateMatchInProgress(id: number, homeGoals: number, awayGoals: number) {
    await this.matchesModel.update({
      homeTeamGoals: homeGoals,
      awayTeamGoals: awayGoals,
    }, { where: { id } });
    return { code: httpStatusCodes.ok, data: { message: 'ok' } };
  }
}
