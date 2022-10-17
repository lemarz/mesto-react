import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick}) {
   const {name, link, likes} = card
   const currentUser = useContext(CurrentUserContext)

   // Определяем, являемся ли мы владельцем текущей карточки
   const isOwn = card.owner._id === currentUser._id;

   // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
   const isLiked = card.likes.some(i => i._id === currentUser._id);
   // Создаём переменную, которую после зададим в `className` для кнопки лайка
   const cardLikeButtonClassName =
      isLiked
         ? 'button element__like-button element__like-button_active'
         : 'button element__like-button '

   const handleClick = () => {
      onCardClick(card)
   }

   return (
      <article className="element">
         {isOwn && <button className="button element__delete-button" type="button"></button>}
         <img alt={name} className="element__image" src={link} onClick={handleClick}/>
         <div className="element__description">
            <h2 className="element__title">{name}</h2>
            <div className="element__like-container">
               <button className={cardLikeButtonClassName} type="button"></button>
               <p className="element__like-counter">{likes.length}</p>
            </div>
         </div>
      </article>
   )
}