import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import './index.scss';
import MenuItem from '@mui/material/MenuItem'
import {
  convertExchangeRate,
  currenciesSelector,
  selectBaseAmount,
  selectBaseCurrencySelector,
  selectConvertedAmount,
  selectCurrencyCurrency,
  setSelectedCurrency,
  setBaseAmount,
  setConvertedAmount, selectConvertType, setConvertType
} from '../currencies/currenciesSlice'

const ExchangeCurrency = () => {
  const dispatch = useDispatch();
  const currenciesList = useSelector(currenciesSelector);
  const baseCurrency = useSelector(selectBaseCurrencySelector);
  const baseAmount = useSelector(selectBaseAmount);
  const convertedValue = useSelector(selectConvertedAmount);
  const selectedCurrency = useSelector(selectCurrencyCurrency);
  const convertType = useSelector(selectConvertType);

  const handleChange = ({target: { value }}) => {
    dispatch(setSelectedCurrency(value))
  };

  const handleBaseValueChange = (event) => {

    dispatch(setBaseAmount(event.target.value));
    dispatch(setConvertType('base'));
  }

  const handleConvertedValueChange = (event) => {
    dispatch(setConvertedAmount(event.target.value))
    dispatch(setConvertType('secondary'));
  }

  useEffect(() => {
    dispatch(convertExchangeRate({
      amount: baseAmount,
      convertedAmount: convertedValue,
      from: baseCurrency,
      to: selectedCurrency,
      convertType,
    }));
  }, [baseAmount, baseCurrency, selectedCurrency, convertedValue])

  return (
    <div className="form-container">
      <Box
        component="form"
        sx={{
          m: 1, width: 400,
        }}
        noValidatess
        autoComplete="off"
      >
        <div className="currency-form">
          <div className="currency-form-item">
            <TextField sx={{width: 200}} onChange={handleBaseValueChange} value={baseAmount} type="number" id="outlined-basic" label="Amount" variant="outlined" />
            <TextField sx={{width: 200}} value={baseCurrency} disabled={true} id="outlined-basic" label="" variant="outlined" />
          </div>
          <div className="currency-form-item">
            <TextField onChange={handleConvertedValueChange} value={convertedValue} sx={{width: 200}} id="outlined-basic" label="" variant="outlined" />
            <TextField
              sx={{width: 200}}
              id="outlined-select-currency"
              select
              label="Select"
              value={selectedCurrency}
              onChange={handleChange}
              helperText="Please select your currency"
            >
              {Object.keys(currenciesList).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default ExchangeCurrency;