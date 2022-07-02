import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiKey = 'dd74bc576b-cf9e84c9fc-recaoj';

export const getCurrencies = createAsyncThunk(
  'currency/fetchCurrencies',
  async () => {
    const response = await fetch(`https://api.fastforex.io/currencies?api_key=${apiKey}`)
    return response.json();
  }
)

export const convertExchangeRate = createAsyncThunk(
  'currency/convertCurrency',
  async ({ amount, convertedAmount, from, to, convertType }) => {
    if (!amount || amount === '0') return null;
    let query;
    if (convertType ===  'base') {
      query = `from=${from}&to=${to}&amount=${amount}`;
    } else {
      query = `from=${to}&to=${from}&amount=${convertedAmount}`
    }

    const response = await fetch(`https://api.fastforex.io/convert?${query}&api_key=${apiKey}`)
    return response.json();
  }
)

export const getCurrenciesByBaseCurrency = createAsyncThunk(
  'currency/getCurrenciesByBase',
  async (baseCurrency) => {
    const response = await fetch(`https://api.fastforex.io/fetch-all?from=${baseCurrency}&api_key=${apiKey}`)
    return response.json();
  }
)

export const currenciesSlice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: localStorage.getItem('baseCurrency') || '',
    currenciesList: {},
    selectedCurrency: 'USD',
    loading: false,
    baseAmount: 1,
    convertedAmount: '',
    convertType: 'base',
    currenciesByBase: {},
  },
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    setBaseAmount: (state, action) => {
      state.baseAmount = action.payload;
    },
    setConvertedAmount: (state, action) => {
      state.convertedAmount = action.payload;
    },
    setConvertType: (state, action) => {
      state.convertType = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.currenciesList = action.payload.currencies;
        state.loading = false;
      })
      .addCase(convertExchangeRate.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const currency = state.selectedCurrency;
        state.convertedAmount = action.payload.result[currency] || state.convertedAmount;
        if (state.convertType !== 'base') {
          state.baseAmount = action.payload.result[state.baseCurrency]
        }
      })
      .addCase(getCurrenciesByBaseCurrency.fulfilled, (state, action) => {
        state.currenciesByBase = action.payload;
      })
  },
});

export const { setBaseCurrency, setSelectedCurrency, setBaseAmount, setConvertedAmount, setConvertType } = currenciesSlice.actions;

export const currenciesSelector = (state) => state.currency.currenciesList;
export const selectBaseCurrencySelector = (state) => state.currency.baseCurrency;
export const selectBaseAmount = state => state.currency.baseAmount;
export const selectConvertedAmount = state => state.currency.convertedAmount;
export const selectCurrencyCurrency = state => state.currency.selectedCurrency;
export const selectConvertType = state => state.currency.convertType;
export const selectCurrenciesByBaseCurrency = state => state.currency.currenciesByBase?.results;

export default currenciesSlice.reducer;
