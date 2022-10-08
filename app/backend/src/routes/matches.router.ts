import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesModel from '../database/models/Matches.model';
import MatchesService from '../services/matches.service';

const router = Router();

const matchService = new MatchesService(MatchesModel);
const matchController = new MatchesController(matchService);

router.get('/', (req, res) => matchController.getAllMatches(req, res));

export default router;
