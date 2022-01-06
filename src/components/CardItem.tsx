import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { setLikeBook } from '../store/collections/collectionsThunk';


type CardItemType = {
  image: any;
  id: string;
}

export function CardItem({ image, id }: CardItemType) {

  const dispatch = useDispatch();

  const onLikeClickHandler = (id: string) => {
    dispatch(setLikeBook(id));
  };

  return (
      <Card sx={{
        maxWidth: 350,
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon/>
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
        />
        <CardMedia
            component="img"
            // height="600"
            image={image}
            alt="Paella dish"
            sx={{ width: '350px' }}/>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon onClick={() => onLikeClickHandler(id)}/>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon/>
          </IconButton>
        </CardActions>
      </Card>
  );
}
