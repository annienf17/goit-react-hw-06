import { createSlice } from "@reduxjs/toolkit";
import contactsData from "../../contacts.json";
import { nanoid } from "nanoid";

// Load initial contacts from localStorage or use default contacts
const loadInitialContacts = () => {
  const savedContacts = localStorage.getItem("contacts");
  if (savedContacts) {
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts.length > 0) {
      return parsedContacts;
    }
  }
  const initialContacts = contactsData.map((contact) => ({
    ...contact,
    id: nanoid(),
  }));
  return initialContacts;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: loadInitialContacts(),
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    removeContact: (state, action) => {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
      if (state.items.length === 0) {
        state.items = loadInitialContacts(); // Załaduj initialContacts, jeśli lista jest pusta
      }
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;
