import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { actions } from '../../../store/collections/collectionsActions';
import { setDislikeBook, setLikeBook } from '../../../store/collections/collectionsThunk';


type CardItemType = {
  image: any;
  id: string;
  likes: string[];
  description: string;
  senderEmail?: string;
  departureDate: any;
}

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    minWidth: 320,
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  description: {
    // background: '#f5f2f1',
    padding: '1rem',
    height: '200px',
    overflow: 'hidden',
    position: 'relative',
    '&::after': {
      content: '\'\'',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '60px',
      background: 'linear-gradient(180deg, transparent, #f5f2f1 90%)'
    }
  },
  mistakesBlock: {
    width: '80px',
    display: 'flex',
    justifyContent: 'space-between'
  }
});

export function CardItem({ image, id, likes, description, senderEmail, departureDate }: CardItemType) {

  const classes = useStyles();

  const dispatch = useDispatch();

  const countOfLikes = likes?.length;

  const onLikeClickHandler = (id: string) => {
    dispatch(setLikeBook(id));
  };

  const onDislikeClickHandler = (id: string) => {
    dispatch(setDislikeBook(id));
  };

  const onBookCardClickHandler = (id: string) => {
    dispatch(actions.getCurrentBookAC(id));
  };

  const avatarLetter = senderEmail?.toUpperCase().split('').splice(0,1).join();

  return (
      <Card className={classes.card}>
        <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {avatarLetter}
              </Avatar>
            }
            title={senderEmail}
            subheader={departureDate}
        />
        <NavLink to={`/book/${id}`} onClick={() => onBookCardClickHandler(id)}>
          <CardMedia
              component="img"
              image={image}
              alt="Book photo"
          />
        </NavLink>
        <CardContent>
          <Typography className={classes.description} gutterBottom component="div">
            {description}
          </Typography>
          <CardActions disableSpacing className={classes.mistakesBlock}>
            <ThumbUpIcon onClick={() => onLikeClickHandler(id)}/>
            <Typography variant="body2" color="text.secondary">
              {countOfLikes}
            </Typography>
            <ThumbDownIcon onClick={() => onDislikeClickHandler(id)}/>
          </CardActions>
        </CardContent>

      </Card>

  );
}
