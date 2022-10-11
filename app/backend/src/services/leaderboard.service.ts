import MatchesModel from '../database/models/Matches.model';
import MatchesService from './matches.service';
import TeamModel from '../database/models/Team.model';
import { TeamScoreI } from '../entities/entities';

const sortResults = (prev: TeamScoreI, curr: TeamScoreI) => {
  let comparison = curr.totalPoints - prev.totalPoints;
  if (!comparison) comparison = curr.totalVictories - prev.totalVictories;
  if (!comparison) comparison = curr.goalsBalance - prev.goalsBalance;
  if (!comparison) comparison = curr.goalsFavor - prev.goalsFavor;
  if (!comparison) comparison = curr.goalsOwn - prev.goalsOwn;
  return comparison;
};

export default class LeaderBoardService {
  constructor(
    private _TeamModel = TeamModel,
    private _MatchesService = MatchesService,
    private _MatchesModel = MatchesModel,
  ) {}

  public async getLeaderboard(filter: 'home' | 'away' | 'general') {
    const teams = await this._TeamModel.findAll();
    const teamScores: Promise<TeamScoreI>[] = [];
    for (let i = 0; i < teams.length; i += 1) {
      if (filter === 'home') {
        const teamScore = this.generateTeamHome(teams[i].id, teams[i].teamName);
        teamScores.push(teamScore);
      }
      if (filter === 'away') {
        const teamScore = this.generateTeamAway(teams[i].id, teams[i].teamName);
        teamScores.push(teamScore);
      }
    }

    const board = await Promise.all(teamScores);
    return board.sort(sortResults);
  }

  private async generateTeamHome(id: number, name: string) {
    const [totalDraws, totalLosses, totalVictories,
      totalGames] = await this.getTeamMatchesHome(id);
    const totalPoints = totalVictories * 3 + totalDraws * 1;

    const [goalsFavor, goalsOwn] = await this.getTeamHomeGoals(id);
    const teamScore: TeamScoreI = {
      name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };

    return teamScore;
  }

  private async getTeamMatchesHome(teamId: number): Promise<number[]> {
    const matches = await new this._MatchesService(MatchesModel).getMatchesInProgress(false);
    const teamMatches = matches.data.filter(({ homeTeam }) => homeTeam === teamId);
    const totalDraws = [...teamMatches.filter((d) => d.homeTeamGoals === d.awayTeamGoals)].length;
    const totalLosses = [...teamMatches.filter((l) => l.homeTeamGoals < l.awayTeamGoals)].length;
    const totalVictories = [...teamMatches.filter((w) => w.homeTeamGoals > w.awayTeamGoals)].length;

    return [totalDraws, totalLosses, totalVictories, teamMatches.length];
  }

  private async getTeamHomeGoals(id: number) {
    const matches = await new this._MatchesService(MatchesModel).getMatchesInProgress(false);
    const teamMatches = matches.data.filter(({ homeTeam }) => homeTeam === id);

    const goalsFavor = teamMatches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    const goalsOwn = teamMatches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

    return [goalsFavor, goalsOwn];
  }

  private async generateTeamAway(id: number, name: string) {
    const [totalDraws, totalLosses, totalVictories,
      totalGames] = await this.getTeamMatchesAway(id);
    const totalPoints = totalVictories * 3 + totalDraws * 1;

    const [goalsFavor, goalsOwn] = await this.getTeamAwayGoals(id);
    const teamScore: TeamScoreI = {
      name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };

    return teamScore;
  }

  private async getTeamMatchesAway(teamId: number): Promise<number[]> {
    const matches = await new this._MatchesService(MatchesModel).getMatchesInProgress(false);
    const teamMatches = matches.data.filter(({ awayTeam }) => awayTeam === teamId);
    const totalDraws = [...teamMatches.filter((d) => d.awayTeamGoals === d.homeTeamGoals)].length;
    const totalLosses = [...teamMatches.filter((l) => l.awayTeamGoals < l.homeTeamGoals)].length;
    const totalVictories = [...teamMatches.filter((w) => w.awayTeamGoals > w.homeTeamGoals)].length;

    return [totalDraws, totalLosses, totalVictories, teamMatches.length];
  }

  private async getTeamAwayGoals(id: number) {
    const matches = await new this._MatchesService(MatchesModel).getMatchesInProgress(false);
    const teamMatches = matches.data.filter(({ awayTeam }) => awayTeam === id);

    const goalsFavor = teamMatches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    const goalsOwn = teamMatches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

    return [goalsFavor, goalsOwn];
  }
}
