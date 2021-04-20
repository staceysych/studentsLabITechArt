import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import defaultPhoto from "images/photo-default.png";
import { Modal, Select, Button, Alert } from "../../../elements";

import { IProducts, RootState } from "../../../utils/interfaces";
import { formatGameForServer } from "../../../utils";

import { CONSTANTS, URLS } from "../../../constants";
import { ACTIONS, PAGE_ACTIONS } from "../../../redux/actions/creators";

import "./AddGameModal.scss";

const AddGameModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [inputObj, setInput] = useState<IProducts>(CONSTANTS.EMPTY_PRODUCT);
  const [error, setError] = useState<string>("");
  const cardAction = useSelector((state: RootState) => state.page.cardAction);
  const hasError = useSelector((state: RootState) => state.auth.hasError);

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
      dispatch(
        PAGE_ACTIONS.addNewProduct(
          `${URLS.SERVER_URL}${URLS.CHANGE_PRODUCT_URL}`,
          formatGameForServer(inputObj),
          location.pathname
        )
      );
      closeModal();
      dispatch(ACTIONS.setAuthInfo("A new game has been added"));
    }
  };

  return (
    cardAction && (
      <Modal handleCloseModal={closeModal} customClassName=" Modal_add">
        <form method="post" className="AddGame">
          <h2 className="AddGame__title">Add a new game</h2>
          <div className="AddGame__content">
            <div className="AddGame__info">
              <div className="AddGame__field">
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
              <div className="AddGame__field">
                <span>Platform:</span>
                <Select optionsList={CONSTANTS.PLATFORM_OPTIONS} setInput={setInput} name="devise" />
              </div>
              <div className="AddGame__field">
                <span>Genre:</span>
                <Select optionsList={CONSTANTS.GENRE_OPTIONS.slice(1)} setInput={setInput} name="genre" />
              </div>
              <div className="AddGame__field">
                <span>Age:</span>
                <Select optionsList={CONSTANTS.AGE_OPTIONS.slice(1)} setInput={setInput} name="age" />
              </div>
              <div className="AddGame__field">
                <span>Rating:</span>
                <Select optionsList={CONSTANTS.RATING_OPTIONS} setInput={setInput} name="rating" />
              </div>
              <div className="AddGame__field">
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
              <div className="AddGame__field">
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
            <div className="AddGame__photo">
              <img src={inputObj.poster || defaultPhoto} alt="poster" />
            </div>
          </div>
          <div className="AddGame__controls">
            <Button text="Add game" className="AddGame__btn AddGame__btn_add" onClick={handleSubmit} />
            <Button text="Cancel" className="AddGame__btn AddGame__btn_cancel" onClick={closeModal} />
          </div>
        </form>
        {hasError && <Alert text={error} />}
      </Modal>
    )
  );
};

export default AddGameModal;
