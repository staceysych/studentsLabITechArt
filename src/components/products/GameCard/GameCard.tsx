import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import star from "images/star.svg";

import styles from "./GameCard.module.scss";

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
  const isAdmin = userInfo.login === CONSTANTS.ADMIN;
  const location = useLocation();
  const isProductsPage = location.pathname.includes("products");

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
    <div className={styles.GameCard} key={id}>
      <div className={styles.img} onClick={() => addToCart()} aria-hidden="true">
        <img src={poster} alt={name} />
      </div>
      <div className={styles.content}>
        <h2>{name}</h2>
        <div className={styles.rating}>
          {[...Array(rating)].map((num, index) => (
            <img key={`${num}-${index}`} alt={rating.toString()} src={star} />
          ))}
        </div>
        <span>{`${price} BYN`}</span>
        {isAdmin && isProductsPage && (
          <div className={styles.controls}>
            <Button text="Edit" className={`${styles.controls} ${styles.edit}`} onClick={handleEditGame} />
            <Button text="Delete" className={`${styles.controls} ${styles.delete}`} onClick={handleDeleteGame} />
          </div>
        )}
      </div>
    </div>
  );
};

const shouldReRender = (prevProps, nextProps) => {
  if (JSON.stringify(prevProps.obj) !== JSON.stringify(nextProps.obj)) {
    return false;
  }

  return true;
};

export default React.memo(GameCard, shouldReRender);
