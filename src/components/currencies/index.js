import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { currenciesSelector, setBaseCurrency } from './currenciesSlice'

const Currencies = () => {
  const dispatch = useDispatch()
  const currenciesList = useSelector(currenciesSelector)
  const [baseCurrency, setUserBaseCurrency] = useState('');

  const handleChange = (event) => {
    setUserBaseCurrency(event.target.value);
  };

  const handleConfirm = () => {
    localStorage.setItem('baseCurrency', baseCurrency);
    dispatch(setBaseCurrency(baseCurrency))
  }

  return (
    <div>
      <h1>Please select exchange rate </h1>
      <Box sx={{ alignItems: 'center' }}>
        <FormControl sx={{ display: 'flex', justifyContent: 'center', width: 200 }}>
          <InputLabel id="demo-simple-select-label">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={baseCurrency}
            label="Currency"
            onChange={handleChange}
          >
            {currenciesList && Object.keys(currenciesList).map((item) => {
              return <MenuItem key={item} value={item}>
                {item} - {currenciesList[item]}
              </MenuItem>
            })}
          </Select>
          <Button onClick={handleConfirm} disabled={!baseCurrency} variant="contained">Confirm</Button>
        </FormControl>
      </Box>
    </div>
  );
}

export default Currencies;