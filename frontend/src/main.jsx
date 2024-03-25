import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './app/store.js'
import './index.css'
import {Provider} from 'react-redux'
import { getAll } from './features/bloddUnits/bloodUnitsSlice.js'
import { setAuth, fetchDonor } from './features/donor/userSlice.js'

store.dispatch(getAll())
if (localStorage.getItem('bloodBankAuth') !== null && store.getState().user.id === null) {
  store.dispatch(setAuth(localStorage.getItem('bloodBankAuth')));
  store.dispatch(fetchDonor(localStorage.getItem('bloodBankAuth')))
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
