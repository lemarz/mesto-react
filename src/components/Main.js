import api from "../utils/Api";
import React from "react";
import Card from "./Card";

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

   const [userName, setUserName] = React.useState('')
   const [userDescription, setUserDescription] = React.useState('')
   const [userAvatar, setUserAvatar] = React.useState('')

   const [initialCards, setInitialCards] = React.useState([])


   React.useEffect(() => {

      api.getUserInfo().then(profileData => {

         Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([profileData, initialCardsData]) => {

               setUserName(profileData.name)
               setUserDescription(profileData.about)
               setUserAvatar(profileData.avatar)

               setInitialCards(initialCardsData)
            })
      })
         .catch(err => console.error(err))

   }, [])

   return (
      <main className="content">
         <section className="profile">
            <div className="profile__avatar-container">
               <img alt="Аватар" className="profile__avatar" src={userAvatar}
                    onClick={onEditAvatar}/>
            </div>

            <div className="profile__info">
               <h1 className="profile__name">{userName}</h1>
               <button className="button profile__edit-button" type="button" onClick={onEditProfile}/>
               <p className="profile__description">{userDescription}</p>
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