import React from "react";
import { Link } from "react-router-dom";
export function Register({ registration }) {
  const [valueEmail, setValueEmail] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");

  function handleChangePassword(evt) {
    setValuePassword(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setValueEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const email = valueEmail;
    const password = valuePassword;
    registration({ email, password });
  }

  return (
    <section className="login">
      <h1 className="login__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          value={valueEmail}
          onChange={handleChangeEmail}
          className="login__input"
          placeholder="Email"
        />
        <input
          type="password"
          value={valuePassword}
          onChange={handleChangePassword}
          className="login__input"
          placeholder="Пароль"
        />
        <button className="login__button-submit">Зарегестрироваться</button>
      </form>
      <div className="login__register-container">
        <p className="login__register-text">Уже зарегистрированы?</p>
        <Link className="login__link" to="/sign-in">
          Войти
        </Link>
      </div>
    </section>
  );
}
