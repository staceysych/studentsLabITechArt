import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import defaultPhoto from "images/photo-default.png";
import { Modal, Select, Button, Alert, Spinner } from "../../../elements";

import { IProducts, RootState } from "../../../utils/interfaces";
import { generateModalTitle, generateBtnText } from "./utils";
import { formatGameForServer } from "../../../utils";

import { CONSTANTS, URLS } from "../../../constants";
import { ACTIONS, PAGE_ACTIONS } from "../../../redux/actions/creators";

import "./AdminGameModal.scss";

const AdminGameModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [inputObj, setInput] = useState<IProducts>(CONSTANTS.EMPTY_PRODUCT);
  const [error, setError] = useState<string>("");
  const cardAction = useSelector((state: RootState) => state.page.cardAction);
  const hasError = useSelector((state: RootState) => state.auth.hasError);
  const editGameObj = useSelector((state: RootState) => state.page.editGameObj);

  useEffect(() => {
    if (editGameObj) {
      console.log("edit game", editGameObj);
      setInput(editGameObj);
    }
  }, [editGameObj]);

  useEffect(() => {
    if (hasError) {
      dispatch(ACTIONS.setError(false));
      setError("");
    }
  }, [inputObj]);

  const closeModal = () => {
    dispatch(PAGE_ACTIONS.setCardAction(""));
    dispatch(ACTIONS.setError(false));
    setError("");
    setInput(CONSTANTS.EMPTY_PRODUCT);
    dispatch(PAGE_ACTIONS.setEditGame(CONSTANTS.EMPTY_PRODUCT));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputObj, [name]: value });
  };

  const handleSubmit = () => {
    const valuesInArray = Object.values(inputObj);
    if (valuesInArray.includes("")) {
      dispatch(ACTIONS.setError(true));
      setError("All fields must be filled");
    } else {
      console.log(inputObj);
      if (cardAction === "add-game") {
        dispatch(
          PAGE_ACTIONS.addNewProduct(
            `${URLS.SERVER_URL}${URLS.CHANGE_PRODUCT_URL}`,
            formatGameForServer(inputObj),
            location.pathname
          )
        );
        dispatch(ACTIONS.setAuthInfo("A new game has been added"));
      }
      if (cardAction === "edit-game") {
        dispatch(
          PAGE_ACTIONS.editProduct(
            `${URLS.SERVER_URL}${URLS.CHANGE_PRODUCT_URL}${inputObj.id}`,
            formatGameForServer(inputObj),
            location.pathname
          )
        );
        dispatch(ACTIONS.setAuthInfo("The game has been edited"));
      }

      closeModal();
    }
  };

  return (
    cardAction && (
      <Modal handleCloseModal={closeModal} customClassName=" Modal_add">
        <form method="post" className="AdminGameModal">
          <h2 className="AdminGameModal__title">{generateModalTitle(cardAction)}</h2>
          <div className="AdminGameModal__content">
            <div className="AdminGameModal__info">
              <div className="AdminGameModal__field">
                <span>Name:</span>
                <input
                  key="name"
                  type="text"
                  placeholder="Game name"
                  name="name"
                  required
                  value={inputObj.name}
                  onChange={handleChange}
                />
              </div>
              <div className="AdminGameModal__field">
                <span>Platform:</span>
                <Select
                  optionsList={CONSTANTS.PLATFORM_OPTIONS}
                  setInput={setInput}
                  name="devise"
                  propsText={inputObj.devise}
                />
              </div>
              <div className="AdminGameModal__field">
                <span>Genre:</span>
                <Select
                  optionsList={CONSTANTS.GENRE_OPTIONS.slice(1)}
                  setInput={setInput}
                  name="genre"
                  propsText={inputObj.genre}
                />
              </div>
              <div className="AdminGameModal__field">
                <span>Age:</span>
                <Select
                  optionsList={CONSTANTS.AGE_OPTIONS.slice(1)}
                  setInput={setInput}
                  name="age"
                  propsText={inputObj.age}
                />
              </div>
              <div className="AdminGameModal__field">
                <span>Rating:</span>
                <Select
                  optionsList={CONSTANTS.RATING_OPTIONS}
                  setInput={setInput}
                  name="rating"
                  propsText={inputObj.rating.toString()}
                />
              </div>
              <div className="AdminGameModal__field">
                <span>Price:</span>
                <input
                  key="price"
                  type="text"
                  placeholder="Game price"
                  name="price"
                  value={inputObj.price}
                  onChange={handleChange}
                />
              </div>
              <div className="AdminGameModal__field">
                <span>Poster:</span>
                <input
                  key="poster"
                  type="text"
                  placeholder="Poster URL"
                  name="poster"
                  value={inputObj.poster}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="AdminGameModal__photo">
              <img src={inputObj.poster || defaultPhoto} alt="poster" />
            </div>
          </div>
          <div className="AdminGameModal__controls">
            <Button
              text={generateBtnText(cardAction)}
              className="AdminGameModal__btn AdminGameModal__btn_add"
              onClick={handleSubmit}
            />
            <Button text="Cancel" className="AdminGameModal__btn AdminGameModal__btn_cancel" onClick={closeModal} />
          </div>
        </form>
        {hasError && <Alert text={error} />}
      </Modal>
    )
  );
};

export default AdminGameModal;
