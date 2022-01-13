import { useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { AppBar, Box, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';

import { Switcher } from './Switcher';
import { ModalComponent } from './ModalComponent';


const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerLinks: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  lang: {
    width: '30px',
    height: '20px',
  },
  authButtons: {
    width: '250px',
  }
});

export function Header() {

  const { t } = useTranslation();

  const classes = useStyles();

  const [lang, setLang] = useState('ru');

  const handleChange = (e: SelectChangeEvent) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#52a952' }}>
          <Toolbar className={classes.toolbar}>
            <Box className={classes.headerLinks}>
              <Select value={lang} onChange={handleChange} sx={{ width: '150px' }}>
                <MenuItem value={'ru'}>Русский</MenuItem>
                <MenuItem value={'eng'}>English</MenuItem>
              </Select>
              <Switcher/>
              <NavLink to="/">
                <HomeIcon sx={{ color: 'white' }} fontSize={'large'}/>
              </NavLink>
              {/*<Typography variant="h6" component="div">*/}
              {/*  {t('description.part1')}*/}
              {/*</Typography>*/}
              {/*<Typography variant="h6" component="div">*/}
              {/*  {t('description.part2')}*/}
              {/*</Typography>*/}
            </Box>

            <Box className={classes.authButtons}>
              <ModalComponent/>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
  );
}