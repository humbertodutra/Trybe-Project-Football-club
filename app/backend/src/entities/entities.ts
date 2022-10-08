export interface LoginI {
  email: string,
  password: string,
}

export enum httpStatusCodes {
  ok = 200,
  created = 201,
  tokenNot = 401,
  emptyFields = 400,
  notExist = 404,
}

export interface TeamI {
  id: number,
  teamName: string,
}

export interface MatchesI {
  id: number,
  homeTeam: number,
  awayTeam: number,
  inProgress: boolean,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  },
}
