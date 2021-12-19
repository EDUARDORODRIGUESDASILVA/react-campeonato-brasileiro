/* eslint-disable camelcase */
export interface InputPartidas {
    partidas: {
        resultado: 'derrota_mandante' | 'vitoria_mandante' | 'empate'
        visitante: string
        mandante: string
        placar_mandante: number
        placar_visitante: number
    }[]
}
