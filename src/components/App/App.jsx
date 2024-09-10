import ContactList from "../ContactList/ContactList";
import initialContacts from "../../contacts.json";
import SearchBox from "../SearchBox/SearchBox";
import ContactForm from "../ContactForm/ContactForm";
import css from "./App.module.css";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem("contacts");
      return savedContacts ? JSON.parse(savedContacts) : initialContacts;
    } catch (error) {
      console.error("Failed to load contacts from localStorage:", error);
      return initialContacts;
    }
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem("contacts");
      const parsedContacts = savedContacts ? JSON.parse(savedContacts) : [];

      // Sprawdza, czy contacts jest puste. Jeśli tak, ustawia initialContacts.
      if (contacts.length === 0) {
        setContacts(initialContacts);
      } else if (JSON.stringify(parsedContacts) !== JSON.stringify(contacts)) {
        // Zapisuje contacts do localStorage tylko wtedy, gdy dane są różne.
        localStorage.setItem("contacts", JSON.stringify(contacts));
      }
    } catch (error) {
      console.error("Failed to save contacts to localStorage:", error);
    }
  }, [contacts]);

  const addContact = useCallback((newContact) => {
    setContacts((prevContacts) => {
      // Sprawdza, czy kontakt o takim samym imieniu już istnieje.
      const duplicateContact = prevContacts.find(
        (contact) =>
          contact.name.toLowerCase() === newContact.name.toLowerCase()
      );

      if (duplicateContact) {
        alert(`Contact with name ${newContact.name} already exists.`);
        return prevContacts;
      }

      return [...prevContacts, newContact];
    });
  }, []);

  const deleteContact = useCallback((contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  }, []);

  // Używam useMemo do optymalizacji obliczania visibleContacts.
  // visibleContacts będzie ponownie obliczane tylko wtedy, gdy zmienią się contacts lub filter.
  const visibleContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  return (
    <div className={css.container}>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onSearch={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}
