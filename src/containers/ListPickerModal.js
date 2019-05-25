import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { watchStates } from "../Firebase/lists";
import Modal from "../components/Modal";
import PrimaryButton from "../components/PrimaryButton";
import ListPickerRadio from "../components/ListPickerRadio";
import "../css/ListPickerModal.scss";

/**
 * Component for the popup modal that appears when clicking the
 * Add to button on the movie details page..
 */
class ListPickerModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    /* function to hide this modal */
    hideFunc: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    statusOfCurrent: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    statusOfCurrent: "",
  };

  /**
   * We read the value of statusOfCurrent so that if the currentMovie
   * already is in one of the user's lists, the correct radio button will
   * be checked by default
   */
  static getDerivedStateFromProps(props) {
    return {
      current: props.statusOfCurrent,
    };
  }

  state = { current: "" };
  formRef = React.createRef();

  onRadioChange = event => {
    this.setState({ current: event.target.value });
  };

  /**
   * What happens when the cancel button is pressed or if the user clicks outside
   */
  cancelModal = () => {
    this.formRef.current.reset();
    this.props.hideFunc();
  };

  /**
   * When the user clicks on save, call the onSubmit prop function
   */
  onSaveClick = () => {
    const { current } = this.state;
    const { onSubmit, hideFunc, statusOfCurrent } = this.props;

    // only call onSubmit if the user has actually selected one of the lists,
    // skip if no list is selected or if the user doesn't change selected list
    // so we don't have to write the same data to the database
    if (current && current !== statusOfCurrent) {
      onSubmit(current);
    }
    hideFunc();
  };

  onRemoveClick = () => {
    const { onRemove, hideFunc, statusOfCurrent } = this.props;
    onRemove(statusOfCurrent);
    hideFunc();
  };

  render() {
    const { isOpen, hideFunc, statusOfCurrent } = this.props;
    const { current } = this.state;
    const { cancelModal, onRadioChange, onSaveClick } = this;
    return (
      <Modal
        className="listpicker-modal"
        isOpen={isOpen}
        hideFunc={hideFunc}
        onEnter={onSaveClick}
      >
        {statusOfCurrent && (
          <div className="trash-icon-button">
            <button onClick={this.onRemoveClick}>
              <FontAwesomeIcon className="trash-icon" icon="trash-alt" />
            </button>
          </div>
        )}
        <h1 className="addTo">Add to:</h1>
        <form ref={this.formRef}>
          {// dynamically add a radio button for each watch state
          // instead of hard coding them
          Object.values(watchStates).map(state => (
            <ListPickerRadio
              key={state}
              value={state}
              current={current}
              onChange={onRadioChange}
            />
          ))}
        </form>
        <div className="buttons">
          <button className="cancel-btn" onClick={cancelModal}>
            Cancel
          </button>
          <PrimaryButton onClick={onSaveClick}>Save</PrimaryButton>
        </div>
      </Modal>
    );
  }
}

export default ListPickerModal;
