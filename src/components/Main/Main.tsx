import { useSelector } from 'react-redux';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { AppRootStateType } from '../../store/store';
import { CardItem } from './Item/CardItem';
import { ICollection } from '../../store/collections/collectionsTypes';
import { TagsSlick } from '../Header/TagsSlick';


const useStyles = makeStyles((theme) => ({
  block: {
    width: '90%',
    height: '90vh',
    bgcolor: 'background.default',
    color: 'text.primary',
    margin: '0 auto'
  },
  rootCard: {
    paddingTop: '20px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  queryRootCard: {
    paddingTop: '20px',
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

  const collection = useSelector<AppRootStateType, ICollection[]>(state => state.collection.collection);
  console.log('coll'+collection.length);

  const [filter, setFilter] = useState<string | null>('Все');

  const filterTasks = (collection: ICollection[]) => {
    if (filter === 'Все') {
      return collection;
    } else {
      return collection.filter(book => book.section === filter);
    }
  };

  return (
      <Box className={classes.block}>
        <TagsSlick setFilter={setFilter}/>
        <div className={smallQuery ? classes.queryRootCard : classes.rootCard}>
          {filterTasks(collection).map((book) => {
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

  );
}


