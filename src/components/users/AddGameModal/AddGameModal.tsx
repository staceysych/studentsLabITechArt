import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import defaultPhoto from "images/photo-default.png";
import { Modal, Select, Button } from "../../../elements";

import { IProducts, RootState } from "../../../utils/interfaces";

import { CONSTANTS } from "../../../constants";
import { PAGE_ACTIONS } from "../../../redux/actions/creators";

import "./AddGameModal.scss";

const AddGameModal = () => {
  const cardAction = useSelector((state: RootState) => state.page.cardAction);
  const [inputText, setInput] = useState<IProducts>({ name: "", price: 0, poster: "" });
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(PAGE_ACTIONS.setCardAction(""));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputText, [name]: value });
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
                  value={inputText.name}
                  onChange={handleChange}
                />
              </div>
              <div className="AddGame__field">
                <span>Platform:</span>
                <Select optionsList={CONSTANTS.PLATFORM_OPTIONS} />
              </div>
              <div className="AddGame__field">
                <span>Genre:</span>
                <Select optionsList={CONSTANTS.GENRE_OPTIONS.slice(1)} />
              </div>
              <div className="AddGame__field">
                <span>Age:</span>
                <Select optionsList={CONSTANTS.AGE_OPTIONS.slice(1)} />
              </div>
              <div className="AddGame__field">
                <span>Rating:</span>
                <Select optionsList={CONSTANTS.RATING_OPTIONS} />
              </div>
              <div className="AddGame__field">
                <span>Price:</span>
                <input
                  key="price"
                  type="text"
                  placeholder="Game price"
                  name="price"
                  required
                  value={inputText.price}
                  onChange={handleChange}
                />
              </div>
              <div className="AddGame__field">
                <span>Poster:</span>
                <input
                  key="poster"
                  type="text"
                  placeholder="Game poster"
                  name="poster"
                  required
                  value={inputText.poster}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="AddGame__photo">
              <img src={defaultPhoto} alt="poster" />
            </div>
          </div>
          <div className="AddGame__controls">
            <Button text="Add game" className="AddGame__btn AddGame__btn_add" />
            <Button text="Cancel" className="AddGame__btn AddGame__btn_cancel" onClick={closeModal} />
          </div>
        </form>
      </Modal>
    )
  );
};

export default AddGameModal;
