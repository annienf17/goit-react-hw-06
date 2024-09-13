import { createSelector } from "reselect";

// Selector to get contacts from state
const selectContacts = (state) => state.contacts.items;

// Selector to get filter from state
const selectFilter = (state) => state.filters.status;

// Selector to filter contacts based on filter
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (filter === "all") {
      return contacts;
    }
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
