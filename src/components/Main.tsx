import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

import { getStorage, ref, uploadBytes } from 'firebase/storage';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { AppRootStateType } from '../store/store';
import { CardItem } from './CardItem';
import { ICollection } from '../store/collections/collectionsTypes';

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

  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const storage = getStorage();
    const storageRef = ref(storage);
    // @ts-ignore
    const fileName = e.target.files[0].name;
    // @ts-ignore
    const file = e.target.files[0];
    const imagesRef = ref(storageRef, 'books/');
    const spaceRef = ref(imagesRef, `${fileName}`);
    uploadBytes(spaceRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  };


  return (
      <Box className={classes.block}>
        <div className={smallQuery ? classes.queryRootCard : classes.rootCard}>

          {/*<StandardImageList />*/}

          {/*<input type='file' onChange={onFileChangeHandler}/>*/}
          {collection.map((book) => {
            return (

                <CardItem image={book.imageURL}
                          id={book.id}
                          likes={book.likes}
                          hasLiked={book.hasLiked}
                          description={book.descriptions}
                />

            );
          })}
        </div>
      </Box>
  )
      ;
}


