import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesModel from '../database/models/Matches.model';
import MatchesService from '../services/matches.service';
import tokenValidate from '../middlewares/authorization';

const router = Router();

const matchService = new MatchesService(MatchesModel);
const matchController = new MatchesController(matchService);

router.get('/', (req, res) => matchController.getAllMatches(req, res));
router.post('/', tokenValidate, (req, res) => matchController.saveMatch(req, res));
router.patch('/:id/finish', (req, res) => matchController.changeMatchStatus(req, res));
router.patch('/:id', (req, res) => matchController.updateMatchInProgress(req, res));

export default router;
