import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./GameCard.scss";

import star from "images/star.svg";

import { IProducts, RootState } from "../../../utils/interfaces";

import { PAGE_ACTIONS } from "../../../redux/actions/creators";

import { URLS, CONSTANTS } from "../../../constants";

import { Button } from "../../../elements";

interface Props {
  obj: IProducts;
}

const GameCard: React.FC<Props> = ({ obj }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const iseAdmin = userInfo.login === CONSTANTS.ADMIN;
  const { id, poster, name, rating, price } = obj;

  const addToCart = () => {
    dispatch(PAGE_ACTIONS.getCartProducts(`${URLS.SERVER_URL}${URLS.GET_PRODUCT_BY_ID_URL}${id}`));
  };

  const handleEditGame = () => {
    dispatch(PAGE_ACTIONS.setCardAction(CONSTANTS.EDIT_PRODUCT));
    dispatch(PAGE_ACTIONS.setEditGame(obj));
  };

  const handleDeleteGame = () => {
    dispatch(PAGE_ACTIONS.setCardAction(CONSTANTS.DELETE_PRODUCT));
    dispatch(PAGE_ACTIONS.setEditGame(obj));
  };

  return (
    <div className="GameCard" key={id}>
      <div className="GameCard__img" onClick={() => addToCart()} aria-hidden="true">
        <img src={poster} alt={name} />
      </div>
      <div className="GameCard__content">
        <h2>{name}</h2>
        <div className="GameCard__rating">
          {[...Array(rating)].map((num, index) => (
            <img key={`${num}-${index}`} alt={rating.toString()} src={star} />
          ))}
        </div>
        <span>{`${price} BYN`}</span>
        {iseAdmin && (
          <div className="GameCard__controls">
            <Button text="Edit" className="GameCard__controls GameCard__controls_edit" onClick={handleEditGame} />
            <Button text="Delete" className="GameCard__controls GameCard__controls_delete" onClick={handleDeleteGame} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
