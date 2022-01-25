import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { makeStyles } from '@mui/styles';
import { Box, Container, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';

import { AppRootStateType } from '../../../store/store';
import { ICollection, IComment } from '../../../store/collections/collectionsTypes';
import { actions } from '../../../store/collections/collectionsActions';
import { CommentsPage } from '../../CommentsPage/CommentsPage';

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
    display: 'flex',
    justifyContent: 'center'
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

  const comm = useSelector<AppRootStateType, IComment>(state => state.collection.currentBook?.comments);

  const dispatch = useDispatch();

  useEffect(() => {
    if (bookId) {
      dispatch(actions.getCurrentBookAC(bookId));
    }
  }, []);


  return (
      <Container maxWidth={'xl'}>
        <Box className={smallQuery ? classes.containerResponse : classes.container}>
          <img src={book.imageURL} className={classes.mainImage} alt="book-cover"/>
          <Box className={classes.descriptionsBlock}>
            <Box className={classes.iconsBlock}>
            </Box>
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