import { Router } from 'express';

import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderBoardService from '../services/leaderboard.service';

const router = Router();

const leaderboardService = new LeaderBoardService();
const leatherBoardController = new LeaderboardController(leaderboardService);

router.get('/home', (req, res) => leatherBoardController.getAllTeams(req, res));

export default router;
