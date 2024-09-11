import { createSlice } from "@reduxjs/toolkit";
import contactsData from "../../contacts.json";
import { nanoid } from "nanoid";

// Load initial contacts from localStorage or use default contacts
const loadInitialContacts = () => {
  const savedContacts = localStorage.getItem("contacts");
  console.log("Saved Contacts:", savedContacts);
  if (savedContacts) {
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts.length > 0) {
      return parsedContacts;
    }
  }
  const initialContacts = contactsData.map((contact, index) => {
    const newId = nanoid();
    const newContact = { ...contact, id: newId };
    console.log(`Contact ${index + 1}:`, newContact);
    return newContact;
  });
  console.log("Initial Contacts:", initialContacts);
  saveContactsToLocalStorage(initialContacts); // Zapisz kontakty do localStorage
  return initialContacts;
};

// Save contacts to localStorage if they don't already exist, to avoid overwriting
const saveContactsToLocalStorage = (contacts) => {
  const savedContacts = localStorage.getItem("contacts");
  if (!savedContacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: loadInitialContacts(),
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("contacts", JSON.stringify(state.items)); // Zapisz do localStorage
    },
    removeContact: (state, action) => {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
      localStorage.setItem("contacts", JSON.stringify(state.items)); // Zapisz do localStorage
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;
