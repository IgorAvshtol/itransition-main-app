import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import { ICollection } from '../../../store/collections/collectionsTypes';


const useStyles = makeStyles({
  iconsBlock: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  iconBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

type IconContentType = {
  book: ICollection
}

export function IconContent({ book }: IconContentType) {

  const classes = useStyles();

  return (
      <Box className={classes.iconsBlock}>
        <Box className={classes.iconBlock}>
          <CoPresentIcon fontSize={'large'}/>
          <Typography gutterBottom component="div">
            {book.authors}
          </Typography>
        </Box>
        <Box className={classes.iconBlock}>
          <AutoStoriesIcon fontSize={'large'}/>
          <Typography gutterBottom component="div">
            {book.pages}
          </Typography>
        </Box>
        <Box className={classes.iconBlock}>
          <ContentPasteSearchIcon fontSize={'large'}/>
          <Typography gutterBottom component="div">
            {book.section}
          </Typography>
        </Box>
      </Box>
  );
}