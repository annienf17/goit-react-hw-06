import { useSelector, useDispatch } from "react-redux";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import ContactForm from "../ContactForm/ContactForm";
import css from "./App.module.css";
import {
  addContact,
  removeContact,
} from "../../features/contacts/contactsSlice";
import { setFilter } from "../../features/filters/filtersSlice";

export default function App() {
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.status);
  const dispatch = useDispatch();

  const handleAddContact = (contact) => {
    dispatch(addContact(contact));
  };

  const handleRemoveContact = (id) => {
    dispatch(removeContact(id));
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const getFilteredContacts = () => {
    if (filter === "all") {
      return contacts;
    }
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={css.app}>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox value={filter} onSearch={handleFilterChange} />
      <ContactList
        contacts={getFilteredContacts()}
        onDelete={handleRemoveContact}
      />
    </div>
  );
}
