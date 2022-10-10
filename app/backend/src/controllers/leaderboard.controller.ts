import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderBoardService) {}

  async getAllTeams(req:Request, res: Response): Promise<Response> {
    const a = await this.leaderboardService.getLeaderboard();

    return res.status(200).json(a);
  }
}
