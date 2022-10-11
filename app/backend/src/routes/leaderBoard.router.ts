import { Router } from 'express';

import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderBoardService from '../services/leaderboard.service';

const router = Router();

const leaderboardService = new LeaderBoardService();
const leatherBoardController = new LeaderboardController(leaderboardService);

router.get('/home', (req, res) => leatherBoardController.getHomeStatus(req, res));
router.get('/away', (req, res) => leatherBoardController.getAwayStatus(req, res));
router.get('/', (req, res) => leatherBoardController.getGeneralStatus(req, res));

export default router;
