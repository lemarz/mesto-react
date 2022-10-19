import React from "react";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";


function App() {
   const forms = [...document.forms]

   const [initialCards, setInitialCards] = React.useState([])

   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
   const [selectedCard, setSelectedCard] = React.useState(null)

   const [currentUser, setCurrentUser] = React.useState({})


   React.useEffect(() => {
      api.getInitialCards()
         .then(initialCardsData => setInitialCards(initialCardsData))
         .catch(err => console.error(err))

      api.getUserInfo()
         .then(userData => setCurrentUser(userData))
         .catch(console.error)
   }, [])


   const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true)
   const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true)
   const handleEditProfileClick = () => setIsEditProfilePopupOpen(true)
   const handleCardClick = (card) => setSelectedCard(card)

   const handleUpdateUser = (userInfo) => {
      api.setUserInfo(userInfo)
         .then(newUserInfo => {
            setCurrentUser(newUserInfo)
            closeAllPopups()
         })
         .catch(console.error)
   }

   const handleUpdateAvatar = (avatarUrl) => {
      api.setAvatar(avatarUrl)
         .then(newUserInfo => {
            setCurrentUser(newUserInfo)
            closeAllPopups()
         })
         .catch(console.error)
   }

   const handleAddPlaceSubmit = ({title, link}) => {
      api.addCard(title, link)
         .then(newCard => {
            setInitialCards([newCard, ...initialCards])
            closeAllPopups()
         })
         .catch(console.error)
   }


   const closeAllPopups = () => {
      setIsAddPlacePopupOpen(false)
      setIsEditAvatarPopupOpen(false)
      setIsEditProfilePopupOpen(false)
      setSelectedCard(null)

      forms.forEach(form => form.reset())
   }


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


   return (
      <><CurrentUserContext.Provider value={currentUser}>
         <div className="page">
            <Header/>

            <Main onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  initialCards={initialCards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
            />

            <Footer/>
         </div>


         <EditProfilePopup isOpen={isEditProfilePopupOpen}
                           onClose={closeAllPopups}
                           onUpdateUser={handleUpdateUser}

         />


         <AddPlacePopup isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
         />


         <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                          onClose={closeAllPopups}
                          onUpdateAvatar={handleUpdateAvatar}

         />


         <ImagePopup card={selectedCard}
                     onClose={closeAllPopups}
         />

         <div className="popup" id="popup_confirm">
            <div className="popup__container popup__container_confirm">
               <h3 className="popup__title">Вы уверены?</h3>
               <form className="popup__form" name="add-popup_form">
                  <button className="button popup__confirm-button" type="submit">Да</button>
               </form>

               <button className="button popup__close-button" type="button"></button>
            </div>
         </div>


      </CurrentUserContext.Provider></>
   );
}

export default App;
