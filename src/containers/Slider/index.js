import { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null); // Ref pour stocker le timeout ID

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  // du plus ancien au plus récent

  const nextCard = () => {
    timeoutRef.current = setTimeout(
      () => setIndex(index < byDateDesc?.length - 1 ? index + 1 : 0),
      5000
    );
    // add -1 to "byDateDesc.length" to go from 0 to 2 in setIndex() (index 3 n'existe pas d'où le slide blanc)
    // byDateDesc? : accède à la propriété 'length' si 'byDateDesc' existe sinon renvoi 'undefined'
  };

  useEffect(() => {
    nextCard();
  });

  function setRadioBtn(idx) {
    // Stoppe le timeout lorsqu'un bouton radio est cliqué
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIndex(idx); // Met à jour l'index selon le bouton radio cliqué
  }
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={idx}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`${radioIdx}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              // le bouton devrait être coché si notre state INDEX est égal à l'index du bouton radio
              onChange={() => setRadioBtn(radioIdx)}
              // add onChange to be able to click and change radio buttons
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
