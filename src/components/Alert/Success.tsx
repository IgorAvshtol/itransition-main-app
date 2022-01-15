import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { AppRootStateType } from '../../store/store';
import { actions } from '../../store/alert/alertActions';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Success() {

  const dispatch = useDispatch();
  const success = useSelector<AppRootStateType, boolean>(state => state.alert.success);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    success && setOpen(true)
    setTimeout(() => {
      dispatch(actions.setSuccess(false));
      setOpen(false)
    }, 5000);
  }, [success]);


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            This is a success message!
          </Alert>
        </Snackbar>
      </Stack>
  );
}