import React from 'react'
import {
  Card,
  CardContent,
  Typography
} from '@mui/material'

function EmptyModuleAnalysis() {
  return (
    // IN CASE NO TEST ATTENDED
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Card sx={{ height: 300, width: 300, textAlign:'center', margin:'30px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div className='Score-Text-Representation'>
            <Typography variant="h6">TAKE AT LEAST ONE TEST TO VIEW ANALYTICS</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmptyModuleAnalysis