export default function PopupWithForm({ buttonText = "Сохранить", ...props }) {
  return (
    <section
      className={`popup popup_type_${props.name} && ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_${props.name}`}
          action="#"
          name={`${props.name}`}
          onSubmit={props.handleSubmit}
        >
          {props.children}
          <button className="popup__button-save" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
