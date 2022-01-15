import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { makeStyles } from '@mui/styles';
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';

import { AppRootStateType } from '../../../store/store';
import { ICollection } from '../../../store/collections/collectionsTypes';
import { IconContent } from './IconContent';
import { actions } from '../../../store/collections/collectionsActions';

const useStyles = makeStyles({
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
    height: '240px',
    marginTop: '20px'
  }
});

export function ItemPage() {

  const classes = useStyles();

  const { bookId } = useParams();

  // @ts-ignore
  const book = useSelector<AppRootStateType, ICollection>(state => state.collection.currentBook);

  const dispatch = useDispatch();

  useEffect(() => {
    if (bookId) {
      dispatch(actions.getCurrentBookAC(bookId));
      console.log(bookId);
    }
  }, []);


  return (
      <Container sx={{ paddingTop: '60px', display: 'flex', justifyContent: 'space-between' }} maxWidth={'xl'}>
        <Box>
          <img src={book.imageURL} width={400} alt="book-cover"/>
        </Box>
        <Box className={classes.descriptionsBlock}>
          <Box className={classes.iconsBlock}>
            <IconContent book={book}/>
          </Box>
          <Box className={classes.description}>
            <Typography gutterBottom component="div">
              {book.description}
            </Typography>
          </Box>
        </Box>
      </Container>


  );
}