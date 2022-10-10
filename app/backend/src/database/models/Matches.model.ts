import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './Team.model';

class MatchesModel extends Model {
  public id!: number;
  public teamName!: string;
  public homeTeam!: number;
  public awayTeam!: number;
  public homeTeamGoals!: number;
  public awayTeamGoals!: number;
}
MatchesModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchesModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

TeamModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'home' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'away' });

export default MatchesModel;
