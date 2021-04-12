import React from "react";
import { useDispatch } from "react-redux";

import "./GameCard.scss";

import star from "images/star.svg";

import { IGameObject } from "../../../utils/interfaces";

import { PAGE_ACTIONS } from "../../../redux/actions/creators";

interface Props {
  obj: IGameObject;
}

const GameCard: React.FC<Props> = ({ obj: { id, poster, name, rating, price } }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(PAGE_ACTIONS.setCart(id));
  };

  return (
    <div className="GameCard" key={id} onClick={() => addToCart()} aria-hidden="true">
      <div className="GameCard__img">
        <img src={poster} alt={name} />
      </div>
      <div className="GameCard__content">
        <h2>{name}</h2>
        <div className="GameCard__rating">
          {[...Array(rating)].map(() => (
            <img key={Math.random()} alt={rating.toString()} src={star} />
          ))}
        </div>
        <span>{`${price} BYN`}</span>
      </div>
    </div>
  );
};

export default GameCard;
