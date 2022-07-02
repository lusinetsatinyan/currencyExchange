import React, { Suspense, useEffect, } from 'react'
import Typography from '@mui/material/Typography';
import { Routes, Route, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux'
import {
  currenciesSelector,
  getCurrencies,
  selectBaseCurrencySelector,
  setBaseCurrency
} from '../currencies/currenciesSlice'

import './index.scss';

const Rates = React.lazy(() => import(/* webpackChunkName: "rates" */ "../rates"));
const Exchange = React.lazy(() => import(/* webpackChunkName: "exchange" */ "../exchange"));
const Currencies = React.lazy(() => import(/* webpackChunkName: "exchange" */ "../currencies"));

const App = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectBaseCurrencySelector);
  const currenciesList = useSelector(currenciesSelector);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);


  if (!localStorage.getItem('baseCurrency') && !baseCurrency) {
    return <Currencies/>
  }

  const handleChange = (event) => {
    const val = event.target.value;
    dispatch(setBaseCurrency(val));
  }

  return (
    <div>
      <div className="layout">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar sx={{
            alignItems: 'center',
            flexDirection: 'row'
          }} position="static">
            <Toolbar sx={{width: '100%', justifyContent: 'space-between'}} variant="dense">
              <div>
                <Button key='exchange' sx={{ color: '#fff', flexGrow: 1 }}>
                  <Link to="/">Exchange Currency</Link>
                </Button>
                <Button>
                  <Link to="rates">Rates</Link>
                </Button>
              </div>
              <div className='currency-container'>
                <Typography>
                  Base currency:
                </Typography>
                <TextField
                  id="standard-select-currency"
                  select
                  value={baseCurrency}
                  onChange={handleChange}
                  variant="standard"
                >
                  {Object.keys(currenciesList).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option} - {currenciesList[option]}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        <div>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Exchange/>} />
              <Route path="/rates" element={<Rates/>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default App;