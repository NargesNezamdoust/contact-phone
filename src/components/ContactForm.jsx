import PropTypes from "prop-types";
import { useState } from "react";
import Drawer from "./Drawer";

function ContactForm({ isOpen, onClose, onAddContact }) {
  const [contactsList, setContactsList] = useState({
    name: "",
    phone: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setContactsList((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactsList.name || !contactsList.phone) {
      alert("Please fill out all fields.");
      return;
    }

    onAddContact(contactsList);
    setContactsList({ name: "", phone: "", image: "" });
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      className="absolute p-5 z-10 w-96"
    >
      <form
        className="flex flex-col justify-center gap-3"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto w-[150px] h-[150px]">
          <img
            src={
              contactsList.image
                ? contactsList.image
                : "image/DefaultAvatar.webp"
            }
            alt="UserAvatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          name="image"
          className="mx-auto w-[202px]"
        />
        <input
          type="text"
          name="name"
          minLength={3}
          maxLength={30}
          value={contactsList.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="bg-transparent border rounded-full p-3"
        />
        <input
          type="tel"
          name="phone"
          maxLength={11}
          minLength={11}
          value={contactsList.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="bg-transparent border rounded-full p-3"
        />
        <button className="bg-black text-white rounded-full p-3" type="submit">
          Submit
        </button>
      </form>
    </Drawer>
  );
}

ContactForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
