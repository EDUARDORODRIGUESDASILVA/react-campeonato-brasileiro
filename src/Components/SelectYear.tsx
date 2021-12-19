// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import Card from '@mui/material/Card'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
// import { useParams, useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function range (start: number, end: number) {
  const ans = []
  for (let i = start; i <= end; i++) {
    ans.push(i)
  }
  return ans
}

export default function SelectYear () {
  const years = range(2003, 2015)
  // const { id } = useParams()
  const navigate = useNavigate()

  function go (year: number) {
    navigate(`/${year}`)
  }

  return (
    <>
      <Card variant="outlined" sx={{ mt: '6px', mb: '6px' }} >
        <CardContent sx={{ display: 'inline-block' }}>
          <Stack spacing={2} direction="row">
            {years.map(year => (
              <Button key={year} onClick={() => go(year)} variant="contained">
                {year}
              </Button>
            )
            )
            }
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
