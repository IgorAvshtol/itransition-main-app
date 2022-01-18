import { Button, Container, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

export function CommentsPage() {
  return (
      <Container>
        <Grid container justifyContent={'center'} sx={{ height: '600px', marginTop: 5 }}>
          <div style={{width:'100%', height: '40vh', border: '1px solid grey', overflowY: 'auto' }}>
            <Typography sx={{padding:'15px 20px'}} gutterBottom component="div">
             asdadada
            </Typography>
          </div>
          <Grid container direction={'column'} alignItems={'flex-end'} >
            <TextField fullWidth maxRows={2} variant={'outlined'}/>
            <Button>Отправить</Button>
          </Grid>
        </Grid>
      </Container>
  );
}