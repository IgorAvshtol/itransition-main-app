import { useDispatch, useSelector } from 'react-redux';
import { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logOut } from '../store/auth/authThunk';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Box, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { AppRootStateType } from '../store/store';
import { useState } from 'react';


const useStyles = makeStyles({
      userDataResp: {
        display: 'flex',
        justifyContent: 'flex-end'
      },
      userData: {
        display: 'flex',
        alignItems: 'center'
      }
    }
);


export function NavigateMenu() {

  const classes = useStyles();

  const smallQuery = useMediaQuery('(max-width:550px)');

  const dispatch = useDispatch();

  const userData = useSelector((state: AppRootStateType) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogOutButtonHandler = () => {
    dispatch(logOut());
  };

  return (
      <div>
        {
          <Box className={smallQuery ? classes.userDataResp : classes.userData}>
            <Button sx={{ color: 'white' }} onClick={handleClick}>
              <AccountBoxIcon fontSize={'large'}/>
            </Button>
            <Box
                sx={smallQuery ? { display: 'none' } : { color: 'white' }}
            >
              {userData?.email}
            </Box>
          </Box>
        }
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
        >
          <NavLink to={`/book/${userData?.id}`}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </NavLink>
          {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
          <MenuItem onClick={onLogOutButtonHandler}>Logout</MenuItem>
        </Menu>
      </div>
  );
}