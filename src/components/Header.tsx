import { useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import { AppBar, Box, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Switcher } from './Switcher';


const useStyles = makeStyles({
  headerLinks: {
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lang: {
    width: '30px',
    height: '20px',
    background: 'red'
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
          <Toolbar>
            <Box className={classes.headerLinks}>
              <Select value={lang} onChange={handleChange} sx={{width:'150px'}}>
                <MenuItem value={'ru'}>Русский</MenuItem>
                <MenuItem value={'eng'}>English</MenuItem>
              </Select>
              <Switcher/>
              <Typography variant="h6" component="div">
                {t('description.part1')}
              </Typography>
              <Typography variant="h6" component="div">
                Избранное
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
  );
}