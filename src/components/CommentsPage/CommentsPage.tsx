import { Box, Button, Container, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ICollection, IComment } from '../../store/collections/collectionsTypes';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { setCommentThunk } from '../../store/collections/collectionsThunk';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { AppRootStateType } from '../../store/store';


const useStyles = makeStyles({
  textBlock: {
    width: '100%',
    height: '400px',
    border: '1px solid grey',
    overflowY: 'auto'
  },
  commentDate: {
    maxWidth: '400px',
    display: 'flex',
    justifyContent: 'space-between',
  }
});

type CommentsPageType = {
  comments: IComment[];
  id: string
}

export function CommentsPage({ comments, id }: CommentsPageType) {

  const authenticated = useSelector((state: AppRootStateType) => state.auth.authenticated);

  const classes = useStyles();

  const [commentText, setCommentText] = useState('');

  const dispatch = useDispatch();

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCommentText(e.currentTarget.value);
  };
  const navigate = useNavigate();

  const onClickButtonHandler = () => {
    if (authenticated) {
      dispatch(setCommentThunk(id, commentText));
      setCommentText('');
    }
    navigate('/signin')
  };


  return (
      <Container>
        <Grid container justifyContent={'center'} sx={{ height: '600px', marginTop: 5 }}>
          <div className={classes.textBlock}>
            {
              comments && comments.map(text => {
                  return (
                      <div key={text.bookId}>
                        <Grid container direction={'column'} sx={{ padding: '15px 20px', width:'100%' }}>
                          <Typography variant='caption' gutterBottom className={classes.commentDate}>
                            {text.author}
                            {text.date}
                          </Typography>

                          <Typography gutterBottom component="div">
                            {text.text}
                          </Typography>
                        </Grid>
                      </div>
                  );
                })
            }
          </div>
          <Grid container direction={'column'} alignItems={'flex-end'}>
            <TextField placeholder={'Напишите отзыв'} onChange={onInputChangeHandler} value={commentText} fullWidth maxRows={2} variant={'outlined'}/>
            <Button onClick={onClickButtonHandler}>Отправить</Button>
          </Grid>
        </Grid>
      </Container>
  );
}