import { useSelector, useDispatch } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { removeContact } from "../../features/contacts/contactsSlice";

export default function ContactList() {
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.status);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeContact(id));
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
    <ul className={css.contactList}>
      {getFilteredContacts().map((contact) => (
        <li key={contact.id}>
          <Contact data={contact} onDelete={handleDelete} />
        </li>
      ))}
    </ul>
  );
}
