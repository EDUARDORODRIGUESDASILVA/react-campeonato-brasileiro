import axios from 'axios'
import { generateTeamsRanks } from '../domain/generateTeamRanks'
import { TeamRank } from '../domain/TeamRank'
const axiosInstance = axios.create({
  baseURL: 'https://campeonato-brasileiro--api.herokuapp.com',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'vaicurinthia' }
})

export async function listResults (year: number): Promise<TeamRank[]> {
  const url = `${year}`
  const res = await axiosInstance.get(url)
  if (res.status !== 200) {
    throw new Error(res.statusText)
  }
  return generateTeamsRanks(res.data)
}
