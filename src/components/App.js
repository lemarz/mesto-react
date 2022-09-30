import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
   const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true)

   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
   const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true)

   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
   const handleEditProfileClick = () => setIsEditProfilePopupOpen(true)


   const closeAllPopups = () => {
      setIsAddPlacePopupOpen(false)
      setIsEditAvatarPopupOpen(false)
      setIsEditProfilePopupOpen(false)
      setSelectedCard(null)
   }


   const [selectedCard, setSelectedCard] = React.useState(null)
   const handleCardClick = (card) => {
      setSelectedCard(card)
   }

   return (
      <>

         <div className="page">
            <Header/>

            <Main onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onCardClick={handleCardClick}
            />

            <Footer/>
         </div>


         <PopupWithForm name={'edit-popup'}
                        title={'Редактировать профиль'}
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        children=
                           {<>
                              <input className="popup__input popup__input_el_name" id="name-input" maxLength="40"
                                     minLength="2"
                                     name="name"
                                     placeholder="Имя" required
                                     type="text"/>
                              <span className="popup__input-error name-input-error"></span>
                              <input className="popup__input popup__input_el_description" id="description-input"
                                     maxLength="200"
                                     minLength="2"
                                     name="description" placeholder="Описание профиля"
                                     required type="text"/>
                              <span className="popup__input-error description-input-error"></span>
                              <button className="button popup__save-button" type="submit">Сохранить</button>
                           </>}
         />


         <PopupWithForm name={'add-popup'}
                        title={'Новое место'}
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        children={
                           <>
                              <input className="popup__input popup__input_el_title" id="title-input" maxLength="30"
                                     minLength="2" name="title" placeholder="Название"
                                     required type="text"/>
                              <span className="popup__input-error title-input-error"></span>
                              <input className="popup__input
            popup__input_el_link" id="link-input" name="link" placeholder="Ссылка на картинку" required type="url"/>
                              <span className="popup__input-error link-input-error"></span>
                              <button className="button popup__save-button" type="submit">Создать</button>
                           </>
                        }
         />


         <PopupWithForm name={'avatar-popup'}
                        title={'Обновить аватар'}
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        children={
                           <>
                              <input className="popup__input popup__input_el_link"
                                     id="avatar-input" name="avatar" placeholder="Ссылка на аватар" required
                                     type="url"/>
                              <span className="popup__input-error avatar-input-error"></span>
                              <button className="button popup__save-button" type="submit">Сохранить</button>
                           </>
                        }

         />


         <ImagePopup card={selectedCard}
                     onClose={closeAllPopups}
         />

         <div className="popup" id="popup_confirm">
            <div className="popup__container popup__container_confirm">
               <h3 className="popup__title">Вы уверены?</h3>
               <form className="popup__form" name="add-popup_form" noValidate>
                  <button className="button popup__confirm-button" type="submit">Да</button>
               </form>

               <button className="button popup__close-button" type="button"></button>
            </div>
         </div>

      </>
   );
}

export default App;