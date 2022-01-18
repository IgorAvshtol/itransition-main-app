import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { AppRootStateType } from '../../store/store';
import { CardItem } from './Item/CardItem';
import { ICollection } from '../../store/collections/collectionsTypes';


const useStyles = makeStyles((theme) => ({
  block: {
    width: '90%',
    height: '90vh',
    bgcolor: 'background.default',
    color: 'text.primary',
    margin: '0 auto'
  },
  rootCard: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  queryRootCard: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden'
  }
}));

export function Main() {

  const smallQuery = useMediaQuery('(max-width:777px)');

  const classes = useStyles();

  // @ts-ignore
  const collection = useSelector<AppRootStateType, ICollection[]>(state => state.collection.collection);

  return (
      <Box className={classes.block}>
        <div className={smallQuery ? classes.queryRootCard : classes.rootCard}>
          {collection.map((book) => {
            return (

                <CardItem image={book.imageURL}
                          id={book.id}
                          likes={book.likes}
                          senderEmail={book.senderEmail}
                          departureDate={book.departureDate}
                          description={book.description}
                />

            );
          })}
        </div>
      </Box>
  )
}


