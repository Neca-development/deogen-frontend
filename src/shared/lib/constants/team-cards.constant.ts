import { TEAM_MEMBERS } from './team-members.constant'

interface Card {
  title: string
  buttonText: string
  role: keyof typeof TEAM_MEMBERS
}

export const TEAM_CARDS: Record<string, Card> = {
  manager: {
    title: 'Ooops, you do not have a manager',
    buttonText: 'Hire manager',
    role: 'MANAGER',
  },
  blockchainAnalytic: {
    title: 'Ooops, you do not have a blockchain analytic',
    buttonText: 'Hire analytic',
    role: 'BLOCKCHAIN_ANALYTIC',
  },
  programmer: {
    title: 'Ooops, you do not have a programmer',
    buttonText: 'Hire programmer',
    role: 'PROGRAMMER',
  },
  designer: {
    title: 'Ooops, you do not have a designer',
    buttonText: 'Hire designer',
    role: 'DESIGNER',
  },
  smmManager: {
    title: 'Ooops, you do not have a SMM manager',
    buttonText: 'Hire SMM manager',
    role: 'SMM',
  },
}
