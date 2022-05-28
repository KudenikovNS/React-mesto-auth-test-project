import React from "react";

export function Login({ authorization }) {
  const [valueEmail, setValueEmail] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");

  function handleChangeEmail(evt) {
    setValueEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setValuePassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const email = valueEmail;
    const password = valuePassword;
    authorization({ password, email });
  }

  return (
    <section className="login">
      <h1 className="login__title">Вход</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          type="email"
          value={valueEmail}
          onChange={handleChangeEmail}
          placeholder="Email"
        />
        <input
          className="login__input"
          type="password"
          value={valuePassword}
          onChange={handleChangePassword}
          placeholder="Пароль"
          autoComplete="off"
        />
        <button className="login__button-submit">Войти</button>
      </form>
    </section>
  );
}
