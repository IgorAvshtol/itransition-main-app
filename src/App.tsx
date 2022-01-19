import { createContext, useEffect, useMemo, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Route, Routes } from 'react-router-dom';

import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';

import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { useDispatch } from 'react-redux';
import { getUserById } from './store/auth/authThunk';
import { getUsersCollections } from './store/collections/collectionsThunk';
import { ItemPage } from './components/Main/Item/ItemPage';
import { NoAccessPage } from './components/Routers/NoAccessPage';
import { PrivateRoute } from './components/Routers/PrivateRoute';
import { ItemForm } from './components/Form/ItemForm';
import { SignIn } from './components/Login/SignIn';



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
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/book/:bookId' element={<ItemPage/>}/>
            {/*<Route path='/addBookForm' element={<ItemForm/>}/>*/}
            <Route path='/addBookForm' element={<PrivateRoute children={ItemForm}/>}/>
            {/*<Route path='/redirect' element={NoAccessPage}/>*/}
            <Route path='/redirect' element={<PrivateRoute children={NoAccessPage}/>}/>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
