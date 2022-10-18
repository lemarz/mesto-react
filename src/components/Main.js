import api from "../utils/Api";
import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

   const currentUser = React.useContext(CurrentUserContext)

   const [initialCards, setInitialCards] = React.useState([])

   const handleCardLike = card => {
      const isLiked = card.likes.some(i => i._id === currentUser._id);

      isLiked
         ? api.dislikeCard(card._id)
            .then(newCard =>
               setInitialCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
            .catch(console.error)

         : api.likeCard(card._id)
            .then(newCard =>
               setInitialCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
            .catch(console.error)
   }

   const handleCardDelete = card => {
      api.deleteCard(card)
         .then(() => setInitialCards(state => state.filter(c => c._id !== card._id)))
         .catch(console.error)
   }

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
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  key={card._id}
                  card={card}
               />
            )}

         </section>
      </main>
   )
}