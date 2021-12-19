// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useParams } from 'react-router-dom'
import SelectYear from './SelectYear'
import { useState, useEffect } from 'react'
import { listResults } from '../services/campeonatoBrasileiroService'
import './RankByYear.css'
import { TeamRank } from '../domain/TeamRank'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export default function RankByYear () {
  const { id } = useParams()
  const [ranks, setRanks] = useState<TeamRank[]>([])
  useEffect(() => {
    async function fetchData () {
      try {
        const year = parseInt(id || '')
        const data = await listResults(year)
        setRanks(data)
      } catch (error) {

      }
    }
    fetchData()
  }
  , [id])
  return (
        <>
            <SelectYear></SelectYear>
            <TableContainer component={Paper}>
                <strong>Campeonato Brasileiro de {id}</strong>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                            <StyledTableCell align="right">P</StyledTableCell>
                            <StyledTableCell align="right">V</StyledTableCell>
                            <StyledTableCell align="right">E</StyledTableCell>
                            <StyledTableCell align="right">D</StyledTableCell>
                            <StyledTableCell align="right">GP</StyledTableCell>
                            <StyledTableCell align="right">GC</StyledTableCell>
                            <StyledTableCell align="right">S</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ranks.map((row) => (
                            <StyledTableRow
                                key={row.teamName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" align="center" scope="row">
                                    <strong>{row.rank}</strong>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <img src={`img/${row.imageName}.png`}
                                        className='logo' ></img>
                                </StyledTableCell>
                                <StyledTableCell >
                                    {row.teamName}</StyledTableCell>
                                <StyledTableCell align="right"><strong>{row.p}</strong></StyledTableCell>
                                <StyledTableCell align="right">{row.v}</StyledTableCell>
                                <StyledTableCell align="right">{row.e}</StyledTableCell>
                                <StyledTableCell align="right">{row.d}</StyledTableCell>
                                <StyledTableCell align="right">{row.gp}</StyledTableCell>
                                <StyledTableCell align="right">{row.gc}</StyledTableCell>
                                <StyledTableCell align="right"
                                    style={{
                                      color: row.s < 0 ? 'red' : 'green'
                                    }}
                                >{row.s}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
  )
}
