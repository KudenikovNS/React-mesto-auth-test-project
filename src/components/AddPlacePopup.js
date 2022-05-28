import React from "react";
import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  buttonText = "Создать",
}) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleChangeName = (evt) => setName(evt.target.value);
  const handleChangeLink = (evt) => setLink(evt.target.value);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="cardpopup"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input
        type="text"
        id="form-place-input"
        name="placeName"
        placeholder="Название"
        onChange={handleChangeName}
        value={name}
        minLength="2"
        maxLength="30"
        required
        className="popup__field popup__field_type_place"
      />
      <span className="form-place-input-error"></span>
      <input
        type="url"
        id="form-link-input"
        name="form-link-input"
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        value={link}
        required
        minLength="2"
        className="popup__field popup__field_type_imageUrl"
      />
      <span className="form-link-input-error"></span>
    </PopupWithForm>
  );
}
