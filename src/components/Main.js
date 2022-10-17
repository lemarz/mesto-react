import api from "../utils/Api";
import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

   const currentUser = React.useContext(CurrentUserContext)

   const [initialCards, setInitialCards] = React.useState([])


   React.useEffect(() => {
      api.getInitialCards()
         .then(initialCardsData => setInitialCards(initialCardsData))
         .catch(err => console.error(err))
   }, [])

   return (
      <main className="content">
         <section className="profile">
            <div className="profile__avatar-container">
               <img alt="Аватар" className="profile__avatar" src={currentUser.avatar}
                    onClick={onEditAvatar}/>
            </div>

            <div className="profile__info">
               <h1 className="profile__name">{currentUser.name}</h1>
               <button className="button profile__edit-button" type="button" onClick={onEditProfile}/>
               <p className="profile__description">{currentUser.about}</p>
            </div>
            <button className="button profile__add-button" type="button" onClick={onAddPlace}></button>
         </section>
         <section className="elements">

            {initialCards.map(card =>
               < Card
                  onCardClick={onCardClick}
                  key={card._id}
                  card={card}
               />
            )}

         </section>
      </main>
   )
}