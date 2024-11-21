import { useState, useRef } from "react";
import ContactForm from "./components/ContactForm";
import { AddIcon, FilterIcon, SortIcon, TrashIcon } from "./components/Icons";
import Search from "./components/Search";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) || []
  );
  const [isSorted, setIsSorted] = useState(false);
  const originalContacts = useRef([...contacts]);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAddContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    originalContacts.current = updatedContacts;
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const handleSort = () => {
    if (isSorted) {
      setContacts(originalContacts.current);
    } else {
      const sortedContacts = [...contacts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setContacts(sortedContacts);
    }
    setIsSorted(prev => !prev);
  };

  const handleRemove = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    originalContacts.current = updatedContacts;
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return (
    <div className="relative flex flex-col px-4 bg-black h-full min-h-[728px] w-full text-white max-w-[768px] p-2">
      <h1 className="mb-2">DISPLAYED CONTACTS - {contacts.length}</h1>
      <div className="flex items-center justify-around">
        <Search />
        <button
          className="rounded-full p-2 border"
          onClick={handleSort}
          title={isSorted ? "Unsort" : "Sort"}
        >
          <SortIcon />
        </button>
        <button className="rounded-full p-2 border">
          <FilterIcon />
        </button>
        <button
          className="rounded-full p-2 border"
          onClick={handleIsOpen}
          title="Add Contact"
        >
          <AddIcon />
        </button>
      </div>

      <div className="w-full mx-auto mt-5">
        {contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <div
              key={index}
              className="flex justify-between gap-5 p-2 border w-full rounded-full px-2 mb-5"
            >
              <div className="flex gap-5">
                <img
                  alt="Avatar"
                  src={
                    contact.avatar ? contact.avatar : "image/DefaultAvatar.webp"
                  }
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p>{contact.name}</p>
                  <p>Phone: {contact.phone}</p>
                </div>
              </div>
              <button
                className="hover:text-red-500"
                onClick={() => handleRemove(index)}
                title="Delete"
              >
                <TrashIcon />
              </button>
            </div>
          ))
        ) : (
          <p className="w-full text-center font-bold text-2xl">
            No Contact Yet....
          </p>
        )}
      </div>

      <ContactForm
        isOpen={isOpen}
        onClose={handleIsOpen}
        onAddContact={handleAddContact}
      />
    </div>
  );
}
