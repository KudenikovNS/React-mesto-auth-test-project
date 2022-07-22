import React from "react";

export function InfoTooltip({ isOpen, onClose, message }) {
  return (
    <section
      className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <img
          src={message.imgPath}
          alt="Подтверждение"
          className="popup__tooltip-img"
        />
        <p className="popup__tooltip-description">{message.text}</p>
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        />
      </div>
    </section>
  );
}
