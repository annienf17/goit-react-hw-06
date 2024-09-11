// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/contacts/contactsSlice";
import filtersReducer from "../features/filters/filtersSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});

export default store;
