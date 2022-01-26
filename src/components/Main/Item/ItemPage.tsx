import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { makeStyles } from '@mui/styles';
import { Box, Container, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';

import { AppRootStateType } from '../../../store/store';
import { ICollection } from '../../../store/collections/collectionsTypes';
import { actions } from '../../../store/collections/collectionsActions';
import { CommentsPage } from '../../CommentsPage/CommentsPage';
import { IconContentForm } from './IconContentForm';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const useStyles = makeStyles({
  container: {
    paddingTop: '60px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  containerResponse: {
    paddingTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  mainImage: {
   width: '300px',
  },
  descriptionsBlock: {
    height: '300px',
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  iconsBlock: {
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-around'
  },
  iconBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  description: {
    width:'100%',
    // height: '240px',
    marginTop: '20px',
    textAlign: 'center'
  }
});

export function ItemPage() {

  const smallQuery = useMediaQuery('(max-width:777px)');

  const classes = useStyles();

  const { bookId } = useParams();

  const book = useSelector<AppRootStateType, ICollection>(state => state.collection.currentBook);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (bookId) {
  //     dispatch(actions.setCurrentBookAC(bookId));
  //   }
  // }, [book.comments]);


  return (
      <Container maxWidth={'xl'}>
        <Box className={smallQuery ? classes.containerResponse : classes.container}>
          <img src={book.imageURL} className={classes.mainImage} alt="book-cover"/>
          <Box className={classes.descriptionsBlock}>
            <Box className={classes.iconsBlock}>
              <div className={classes.iconBlock}>
                <CoPresentIcon fontSize={'large'}/>
                <Typography gutterBottom component="div">
                  {book.authors}
                </Typography>
              </div>
              <div className={classes.iconBlock}>
                <AutoStoriesIcon fontSize={'large'}/>
                <Typography gutterBottom component="div">
                  {book.pages}
                </Typography>
              </div>
              <div className={classes.iconBlock}>
                <ContentPasteSearchIcon fontSize={'large'}/>
                <Typography gutterBottom component="div">
                  {book.section}
                </Typography>
              </div>
            </Box>
            <Typography sx={{paddingTop: '20px', textAlign: 'center'}} variant={'h6'} gutterBottom component="div">
              {book.title}
            </Typography>
            <Box className={classes.description}>
              <Typography gutterBottom component="div">
                {book.description}
              </Typography>
            </Box>
            <CommentsPage comments={book.comments} id={book.id}/>
          </Box>
        </Box>
      </Container>


  );
}