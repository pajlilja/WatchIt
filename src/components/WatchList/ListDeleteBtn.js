import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../../css/ListDeleteBtn.scss";

function ListDeleteBtn(props) {
  return (
    <button {...props} className="list-delete-btn">
      <FontAwesomeIcon icon="minus-circle" />
    </button>
  );
}

export default ListDeleteBtn;
