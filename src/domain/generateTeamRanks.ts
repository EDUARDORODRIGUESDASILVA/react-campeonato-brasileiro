import { InputPartidas } from './InputPartidas'
import { TeamRank } from './TeamRank'

function generateTeamsRanks (data: InputPartidas[]) {
  console.log(data)
  const ranks: TeamRank[] = []
  data.forEach(r => {
    computeMatchs(ranks, r)
  })
  rankTeams(ranks)
  return ranks
}

function computeMatchs (ranks: TeamRank[], data: InputPartidas) {
  data.partidas.forEach(p => {
    const mandante = findOrCreateTeam(ranks, p.mandante)
    const visitante = findOrCreateTeam(ranks, p.visitante)

    mandante.gp += p.placar_mandante
    mandante.gc += p.placar_visitante
    visitante.gc += p.placar_mandante
    visitante.gp += p.placar_visitante

    visitante.s += p.placar_visitante - p.placar_mandante
    mandante.s += p.placar_mandante - p.placar_visitante

    switch (p.resultado) {
      case 'vitoria_mandante':
        mandante.p += 3
        mandante.v += 1
        visitante.d += 1
        break
      case 'derrota_mandante':
        visitante.p += 3
        visitante.v += 1
        mandante.d += 1
        break

      default:
        mandante.p += 1
        visitante.p += 1
        mandante.e += 1
        visitante.e += 1
        break
    }
  })
}

function findOrCreateTeam (ranks: TeamRank[], teamName: string): TeamRank {
  let team = ranks.find(t => t.teamName === teamName)

  if (!team) {
    team = {
      teamName,
      p: 0,
      rank: 0,
      v: 0,
      e: 0,
      d: 0,
      gp: 0,
      gc: 0,
      s: 0,
      imageName: findImage(teamName)
    }
    ranks.push(team)
  }

  return team
}

function rankTeams (ranks: TeamRank[]) {
  ranks.sort((t1, t2) => {
    return t2.p - t1.p
  })
  let l = 0
  const names: string[] = []
  ranks.forEach(r => {
    r.rank = ++l
    if (r.imageName === 'noLogo') {
      names.push(r.teamName)
    }
  })
  console.log(names)
}

function findImage (teamName: string) {
  const image = images.find(i => i.name === teamName)
  if (image) {
    return image.image
  }
  return 'noLogo'
}

const images = [{ name: 'América mg', image: 'america_mg' },
  { name: 'América rn', image: 'america_rn' },
  { name: 'Atlético go', image: 'atletico_go' },
  { name: 'Atlético mg', image: 'atletico_mg' },
  { name: 'Atlético pr', image: 'atletico_pr' },
  { name: 'Avaí', image: 'avai' },
  { name: 'Bahia', image: 'bahia' },
  { name: 'Barueri', image: 'barueri' },
  { name: 'Botafogo', image: 'botafogo' },
  { name: 'Brasiliense', image: 'brasiliense' },
  { name: 'Ceará', image: 'ceara' },
  { name: 'Chapecoense', image: 'chapecoense' },
  { name: 'Corinthians', image: 'corinthians' },
  { name: 'Coritiba', image: 'coritiba' },
  { name: 'Criciúma', image: 'criciuma' },
  { name: 'Cruzeiro', image: 'cruzeiro' },
  { name: 'Figueirense', image: 'figueirense' },
  { name: 'Flamengo', image: 'flamengo' },
  { name: 'Fluminense', image: 'fluminense' },
  { name: 'Fortaleza', image: 'fortaleza' },
  { name: 'Goiás', image: 'goias' },
  { name: 'Grêmio', image: 'gremio' },
  { name: 'Grêmio prudente', image: 'gremio_prudente' },
  { name: 'Guarani', image: 'guarani' },
  { name: 'Internacional', image: 'internacional' },
  { name: 'Ipatinga', image: 'ipatinga' },
  { name: 'Joinvile', image: 'joinvile' },
  { name: 'Juventude', image: 'juventude' },
  { name: 'Náutico', image: 'nautico' },
  { name: 'Palmeiras', image: 'palmeiras' },
  { name: 'Paraná', image: 'parana' },
  { name: 'Paysandu', image: 'paysandu' },
  { name: 'Ponte preta', image: 'ponte_preta' },
  { name: 'Portuguesa', image: 'portuguesa' },
  { name: 'Santa cruz', image: 'santa_cruz' },
  { name: 'Santos', image: 'santos' },
  { name: 'Santo andré', image: 'santo_andre' },
  { name: 'São caetano', image: 'sao_caetano' },
  { name: 'São paulo', image: 'sao_paulo' },
  { name: 'Sport', image: 'sport' },
  { name: 'Vasco', image: 'vasco' },
  { name: 'Vitória', image: 'vitoria' }
]

export { generateTeamsRanks }
