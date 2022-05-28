import "../index.css";

import React from "react";

import { Login } from "./Login";
import { Register } from "./Register";

import { InfoTooltip } from "./InfoTooltip";

import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";

import registrationAccept from "../vendor/image/AcceptRegistration.svg";
import registrationReject from "../vendor/image/RejectRegistration.svg";

import { ProtectedRoute } from "./ProtectedRoute";
import { Switch, Redirect, Route, useHistory } from "react-router-dom";

import { api } from "../utils/api";
import * as auth from "../utils/auth";

export function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCards] = React.useState({ isOpen: false });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [editProfileButtonText, setEditProfileButtonText] =
    React.useState("Сохранить");
  const [addCardButtonText, setAddCardButtonText] = React.useState("Создать");
  const [editAvatarButtonText, setEditAvatarButtonText] =
    React.useState("Сохранить");

  const history = useHistory();
  const [isToooltipOpen, setTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState({ imgPath: "", text: "" });
  const [email, setEmail] = React.useState("");

  const handleCardClick = ({ name, link, isOpen }) =>
    setSelectedCards({ name, link, isOpen: !isOpen });
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleDeleteClick(card) {
    if (card.owner._id !== currentUser._id) return;
    api
      .deleteConfirmCard(card._id)
      .then((res) => setCards(cards.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .addLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCards({ isOpen: false });
    setTooltipOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    setEditProfileButtonText("Сохраняю...");
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setEditProfileButtonText("Сохранить");
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    setEditAvatarButtonText("Сохраняю...");
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setEditAvatarButtonText("Сохранить");
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setAddCardButtonText("Создаю...");
    api
      .addCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        setAddCardButtonText("Создать");
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setEmail("");
    history.push("/sign-in");
  }

  function handleToolltipInfoOpen() {
    setTooltipOpen(true);
  }

  function registration({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        handleTooltipInfo({
          imgPath: registrationAccept,
          text: "Вы успешно зарегистрировались!",
        });
        handleToolltipInfoOpen();
        history.push("/sign-in");
      })
      .catch((err) => {
        handleTooltipInfo({
          imgPath: registrationReject,
          text: "Что-то пошло не так! Попробуйте еще раз",
        });
        handleToolltipInfoOpen();
        console.log(err);
      });
  }

  function authorization({ email, password }) {
    auth
      .authorize({ email, password })
      .then((data) => {
        if (!data) {
          return;
        }
        setLoggedIn(true);
        setEmail(email);
        handleTooltipInfo({
          imgPath: registrationAccept,
          text: "Вы успешно зарегистрировались!",
        });
        history.push("/");
        handleToolltipInfoOpen();
      })
      .catch((err) => {
        handleTooltipInfo({
          imgPath: registrationReject,
          text: "Что-то пошло не так! Попробуйте еще раз",
        });
        handleToolltipInfoOpen();
        console.log(err);
      });
  }

  function handleTooltipInfo({ imgPath, text }) {
    setMessage({ imgPath, text });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__root">
          <Header
            handleSignOut={handleSignOut}
            loggedIn={loggedIn}
            email={email}
          />
          <Switch>
            <Route path="/sign-in">
              <Login authorization={authorization} />
            </Route>
            <Route path="/sign-up">
              <Register registration={registration} />
            </Route>
            <ProtectedRoute
              exact
              path="/main"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              cards={cards}
              loggedIn={loggedIn}
            ></ProtectedRoute>
            <Route path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={editProfileButtonText}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={editAvatarButtonText}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonText={addCardButtonText}
          />
          <PopupWithForm
            title="Вы уверены?"
            name="remove-card"
            buttonText="Да"
            onClose={closeAllPopups}
          ></PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isToooltipOpen}
            message={message}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
