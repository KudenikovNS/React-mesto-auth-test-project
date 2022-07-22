import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  buttonText,
}) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleNameChange = (evt) => setName(evt.target.value);
  const handleDescriptionChange = (evt) => setDescription(evt.target.value);

  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_type_name"
        id="form-name-input"
        type="text"
        name="name"
        placeholder="ФИО"
        value={name}
        onChange={handleNameChange}
        required
        minLength="2"
        maxLength="40"
      />
      <span className="form-name-input-error"></span>
      <input
        className="popup__field popup__field_type_description"
        id="form-description-input"
        type="text"
        name="description"
        placeholder="Описание"
        value={description}
        onChange={handleDescriptionChange}
        required
        minLength="2"
        maxLength="200"
      />
      <span className="form-description-input-error"></span>
    </PopupWithForm>
  );
}
