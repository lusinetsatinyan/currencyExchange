import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrenciesByBaseCurrency,
  selectBaseCurrencySelector,
  selectCurrenciesByBaseCurrency
} from '../currencies/currenciesSlice'

import './index.scss';


const CurrencyRates = () => {
  const baseCurrency = useSelector(selectBaseCurrencySelector);
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrenciesByBaseCurrency);
  const [rows, setRows] = useState([]);

  const createData = (currency, amount) =>  {
    return { currency, amount};
  }

  useEffect(() => {
    dispatch(getCurrenciesByBaseCurrency(baseCurrency));
  }, [baseCurrency])


  useEffect(() => {
    if (currencies && Object.keys(currencies).length) {
      let rowsArr = []
      Object.keys(currencies).forEach((item) => {
        rowsArr.push(createData(item, currencies[item]))
      })

      setRows(rowsArr);
    }
  }, [currencies, setRows])

  return (
    <div className="table-container">
      <div className="base-currency">
        <h1>1 {baseCurrency}</h1>
      </div>
      <TableContainer sx={{mt: 5, width: 500, maxHeight: 500}} component={Paper}>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Currency</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!rows && rows.map((row) => (
              <TableRow key={row.currency}>
                <TableCell component="th" scope="row">
                  {row.currency}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CurrencyRates;