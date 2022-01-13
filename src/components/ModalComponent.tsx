import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import { SignUp } from './SignUp';
import { AppRootStateType } from '../store/store';
import { makeStyles } from '@mui/styles';
import { SignIn } from './SignIn';
import { logOut } from '../store/auth/authThunk';
import { Icon, useMediaQuery } from '@mui/material';
import { NavigateMenu } from './NavigateMenu';


const useStyles = makeStyles({
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#f8f8f8',
    borderRadius: '25px',
    padding: '20px',
    outline: ' none'
  },
  authButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  authButtonsResp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    cursor: 'pointer',
  },
  lang: {
    width: '30px',
    height: '20px',
    background: 'red',
    color: '#ffffff'
  }
});

export function ModalComponent() {

  const { t } = useTranslation();

  const smallQuery = useMediaQuery('(max-width:550px)');

  const classes = useStyles();
  const dispatch = useDispatch();

  const authenticated = useSelector((state: AppRootStateType) => state.auth.authenticated);
  const userData = useSelector((state: AppRootStateType) => state.auth.user);

  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleSignInButton = () => {
    setOpen(true);
    setSignIn(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSignIn(false);
  };

  const onLogOutButtonHandler = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    setOpen(false);
  }, [authenticated]);

  return (
      <div>
        <Box>
          {
            authenticated ?

                  <NavigateMenu/>

                :
                <Box className={smallQuery ? classes.authButtonsResp : classes.authButtons}>
                  <Typography onClick={handleOpen} variant="h6" component="div">
                    {`${t('description.part3')}`}
                  </Typography>
                  <Typography onClick={handleSignInButton} variant="h6" component="div">
                    {`${t('description.part4')}`}
                  </Typography>
                </Box>
          }
          {/*<Typography onClick={handleOpen} variant="h6" component="div">*/}
          {/*  {authenticated ? userData?.email : `${t('description.part3')}`}*/}
          {/*</Typography>*/}
          {/*<Typography onClick={authenticated ? onLogOutButtonHandler : handleSignInButton} variant="h6" component="div">*/}
          {/*  {authenticated ? `${t('description.part10')}` : `${t('description.part4')}`}*/}
          {/*</Typography>*/}
        </Box>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box className={classes.modal}>
            {signIn ? <SignIn/> : <SignUp/>}
          </Box>
        </Modal>
      </div>
  );
}