import { Router } from 'express';
import TeamController from '../controllers/team.controller';
import TeamModel from '../database/models/Team.model';
import TeamService from '../services/team.service';

const router = Router();

const teamService = new TeamService(TeamModel);
const teamController = new TeamController(teamService);

router.get('/', (req, res) => teamController.getAll(req, res));
router.get('/:id', (req, res) => teamController.getById(req, res));

export default router;
