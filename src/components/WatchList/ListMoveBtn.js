import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../../css/ListMoveBtn.scss";

function ListMoveBtn(props) {
  return (
    <button {...props} className="list-move-btn">
      <FontAwesomeIcon icon="share" />
    </button>
  );
}

export default ListMoveBtn;
