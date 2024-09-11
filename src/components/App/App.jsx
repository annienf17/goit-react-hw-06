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

  return (
    <div className={css.app}>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox filter={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={contacts} onRemoveContact={handleRemoveContact} />
    </div>
  );
}
