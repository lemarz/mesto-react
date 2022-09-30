export default function Card({card, onCardClick}) {
   const {name, link, likes} = card

   const handleClick = () => {
      onCardClick(card)
   }

   return (
      <article className="element" onClick={handleClick}>
         <button className="button element__delete-button" type="button"></button>
         <img alt={name} className="element__image" src={link}/>
         <div className="element__description">
            <h2 className="element__title">{name}</h2>
            <div className="element__like-container">
               <button className="button element__like-button " type="button"></button>
               <p className="element__like-counter">{likes.length}</p>
            </div>
         </div>
      </article>
   )
}