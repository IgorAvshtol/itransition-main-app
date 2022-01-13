import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../store/store';
import { ICollection } from '../store/collections/collectionsTypes';

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  active: {
    color: '#bd2020'
  },
  passive: {
    color: 'rgba(42,34,34,0.85)'
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
  }
});

export function ItemPage() {

  const classes = useStyles();

  // @ts-ignore
  const book = useSelector<AppRootStateType, ICollection>(state=> state.collection.currentBook);

  return (
      <Container sx={{display:'flex', justifyContent:'space-between'}} maxWidth={'xl'}>
        <Box sx={{height:'500px', background:'red'}}>

        </Box>
        <Box sx={{height:'500px', background:'red',display:'flex', flexDirection:'column'}}>
          <Box sx={{height:'240px'}}>
            <img src={book.imageURL} alt="book-cover"/>
          </Box>
          <Box sx={{height:'240px', marginTop:'20px'}}>
            asdsad
          </Box>
        </Box>
      </Container>


  );
}