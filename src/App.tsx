import { createContext, useEffect, useMemo, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Route, Routes } from 'react-router-dom';

import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';

import { Main } from './components/Main';
import { Header } from './components/Header';
import { useDispatch } from 'react-redux';
import { getUserById } from './store/auth/authThunk';
import { getUsersCollections } from './store/collections/collectionsThunk';
import { ItemPage } from './components/ItemPage';


export const ColorModeContext = createContext({
  toggleColorMode: () => {
  }
});

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(getUserById(uid))
      } else {
        console.log('bad');
      }
    });
    dispatch(getUsersCollections())
  }, []);

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
  );

  const theme = useMemo(
      () =>
          createTheme({
            palette: {
              mode,
            },
          }),
      [mode],
  );

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Header/>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/book/:bookId' element={<ItemPage/>}/>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
