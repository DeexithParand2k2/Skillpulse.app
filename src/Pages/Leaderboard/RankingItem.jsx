import {
  Card,
  Box,
  CardContent,
  Typography,
  CardMedia,
  CardHeader,
  Divider,
  Button,
  CardActions,
  Avatar
} from "@mui/material";

import '../../Styles/App.css'

const RankingItem = ({
  ranking,
  name,
  eis_score,
  email,
  Modalopener,
  isUser,
}) => {
  const studentRank = ranking;
  const studentName = name;
  const studentScore = eis_score;
  // console.log(ranking, name, eis_score);

  const avatarSrc = `https://avatars.dicebear.com/api/identicon/${email}.svg`;

  const clickHandler = () => {
    Modalopener(email);
  };

  return (
    <Card sx={{ 
      display: "flex",
      justifyContent:'space-between',
      backgroundColor: isUser ? "#86f791" : "",
      marginTop:'10px',
      marginBottom:'10px',
      padding:'10px'
    }}>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'50px'}}>
        <Typography sx={{fontFamily : 'Montserrat, sans-serif'}} variant="p" component="div" >
          {studentRank}
        </Typography>
      </div>
      

      <div style={{width:'100px', display:'flex', alignItems:'center' , justifyContent:'center'}}>
        <Avatar  style={{ height:'fit-content' }} alt="X" src={avatarSrc} />
      </div>

      <CardContent sx={{width:'200px'}}>
        <Typography sx={{fontFamily : 'Montserrat, sans-serif'}} variant="h6" component="div">
          {studentName}
        </Typography>
        <Typography sx={{ mb: 1.5, fontFamily : 'Montserrat, sans-serif' }} color="text.secondary">
          EIS SCORE - {studentScore.toPrecision(4)}
        </Typography>
      </CardContent>
      
      <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={clickHandler}
            sx={{ border: "2px solid", width:'125px'}}
            disabled = {isUser ? true : false}  
          >
            Compare
          </Button>
      </CardActions>
    </Card>
  );
};

export default RankingItem;
