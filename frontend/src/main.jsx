import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./app/store.js";
import "./index.css";
import { Provider } from "react-redux";
import { getAll } from "./features/bloddUnits/bloodUnitsSlice.js";
import { fetchRole } from "./features/user/userSlice.js";

store.dispatch(getAll());

if (
  localStorage.getItem("bloodBankAuth") !== null &&
  localStorage.getItem("role") === null
) {
  store
    .dispatch(fetchRole(localStorage.getItem("bloodBankAuth")))
    .unwrap()    
    .catch((rejectedValue) => {
      if (rejectedValue.status === 401) {
        console.log('expired auth', rejectedValue);
        localStorage.removeItem('bloodBankAuth');
        alert("Expired Token!!! Please Login Again");
        window.location.reload();
      }
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
