import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

import { getStorage, ref, uploadBytes } from 'firebase/storage';

import Box from '@mui/material/Box';

import { AppRootStateType } from '../store/store';
import { makeStyles } from '@mui/styles';
import { CardItem } from './CardItem';

const useStyles = makeStyles((theme) => ({
  block: {
    width:'90%',
    height: '90vh',
    bgcolor: 'background.default',
    color: 'text.primary',
    margin: '0 auto'
  },
  rootCard: {
    width:'100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden'
  }
}));

export function Main() {

  const classes = useStyles();

  const collection = useSelector((state: AppRootStateType) => state.collection.collection);

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
        <div className={classes.rootCard}>

        {/*<StandardImageList />*/}

          {/*<input type='file' onChange={onFileChangeHandler}/>*/}
          {collection.map((book) => {
            return (

                  <CardItem image={book.imageURL} id={book.id}/>

            );
          })}
        </div>
      </Box>
  )
      ;
}


