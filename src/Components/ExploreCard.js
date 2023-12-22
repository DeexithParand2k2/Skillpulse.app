import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ExploreCard({head,content,img}) {
  return (
    <Card sx={{ maxWidth: 345, height:470, margin:3, marginLeft:5,
                bgcolor:'silver', borderRadius:10, padding:2 }}>
        <CardMedia
          component="img"
          height="50"
          image={img}
          alt={head}
          sx={{height:250,width:250,marginLeft:4}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          <p className='text-yellow-700'>{head}</p>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
    </Card>
  );
}