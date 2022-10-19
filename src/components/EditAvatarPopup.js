import PopupWithForm from "./PopupWithForm";
import React from "react"

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

   const pop = React.useRef()


   function handleSubmit(e) {
      e.preventDefault()
      onUpdateAvatar(pop.current["value"])
   }

   return (
      <PopupWithForm name={'avatar-popup'}
                     title={'Обновить аватар'}
                     isOpen={isOpen}
                     onClose={onClose}
                     children={
                        <>
                           <input className="popup__input popup__input_el_link"
                                  id="avatar-input"
                                  name="avatar"
                                  placeholder="Ссылка на аватар"
                                  required
                                  type="url"
                                  ref={pop}
                           />
                           <span className="popup__input-error avatar-input-error"></span>
                           <button className="button popup__save-button" type="submit"
                                   onClick={handleSubmit}>Сохранить
                           </button>
                        </>
                     }

      />
   )
}