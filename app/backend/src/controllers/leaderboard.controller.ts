import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderBoardService) {}

  async getHomeStatus(req:Request, res: Response): Promise<Response> {
    const a = await this.leaderboardService.getLeaderboard('home');

    return res.status(200).json(a);
  }

  async getAwayStatus(req:Request, res: Response): Promise<Response> {
    const b = await this.leaderboardService.getLeaderboard('away');

    return res.status(200).json(b);
  }
}
