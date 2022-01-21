import { makeStyles } from '@mui/styles';
import { Box, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';

import { ICollection } from '../../store/collections/collectionsTypes';
import { IconContent } from './Item/IconContent';


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
    maxWidth: '300px',
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
    width: '100%',
    // height: '240px',
    marginTop: '20px',
    textAlign: 'center'
  }
});

type PublicationType = {
  publication: ICollection;
}

export function Publication({ publication }: PublicationType) {

  const smallQuery = useMediaQuery('(max-width:777px)');

  const classes = useStyles();

  return (
      <Box className={smallQuery ? classes.containerResponse : classes.container}>
        <img src={publication.imageURL} className={classes.mainImage} alt="book-cover"/>
        <Box className={classes.descriptionsBlock}>
          <Box className={classes.iconsBlock}>
            <IconContent book={publication}/>
          </Box>
          <Box className={classes.description}>
            <Typography gutterBottom component="div">
              {publication.description}
            </Typography>
          </Box>
        </Box>
      </Box>
  );
}