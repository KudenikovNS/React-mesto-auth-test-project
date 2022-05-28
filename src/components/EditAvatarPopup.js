import React from "react";
import PopupWithForm from "./PopupWithForm";

export function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
}) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить Аватар"
      name="avatarpopup"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_avatar_imageUrl"
        name="avatar"
        type="url"
        id="form-avatar"
        placeholder="Ссылка на аватарку"
        ref={avatarRef}
      />
      <span className="form-avatar-error" id="form-avatar-error"></span>
    </PopupWithForm>
  );
}
