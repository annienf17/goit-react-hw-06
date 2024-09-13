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

// Helper function to check for duplicates
const isDuplicate = (contacts, newContact) => {
  return contacts.some(
    (contact) =>
      contact.name.toLowerCase() === newContact.name.toLowerCase() ||
      contact.number === newContact.number
  );
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: loadInitialContacts(),
  },
  reducers: {
    addContact: (state, action) => {
      if (!isDuplicate(state.items, action.payload)) {
        state.items.push(action.payload);
      } else {
        console.warn("Contact with the same name or number already exists.");
      }
    },
    removeContact: (state, action) => {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
      if (state.items.length === 0) {
        state.items = loadInitialContacts(); // Load initialContacts if the list is empty
      }
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;
