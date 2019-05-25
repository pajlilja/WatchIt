import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import { successToast, errorToast, infoToast } from "../utils/toast";
import parseName from "../utils/parseName";
import {
  addToList,
  getUserID,
  fetchOneFromList,
  updateWatchStatus,
} from "../Firebase/lists";

/**
 * This component is a drop zone for PosterCards
 */
class PosterCardDropTarget extends Component {
  static propTypes = {
    /** enables react-dnd */
    connectDropTarget: PropTypes.func.isRequired,
    /** is true if a PosterCard is hovering over */
    isOver: PropTypes.bool.isRequired,
    /** name of the drop target, used for the notification text */
    targetName: PropTypes.string.isRequired, // eslint-disable-line
    children: PropTypes.node.isRequired,
  };

  render() {
    const { connectDropTarget, isOver, children } = this.props;
    return connectDropTarget(
      <div className={isOver ? "droptarget-is-over" : ""}>{children}</div>,
    );
  }
}

const listTarget = {
  // is called when a PosterCard is dropped on this component
  drop(props, monitor) {
    const item = monitor.getItem();
    const user = getUserID();
    fetchOneFromList(user, item.id).then(movie => {
      if (!movie) {
        try {
          addToList(item, props.targetName);
          successToast(`Added ${item.title} to ${parseName(props.targetName)}`);
        } catch (e) {
          errorToast(
            `Failed to add ${item.title} to ${parseName(props.targetName)}`,
          );
        }
      } else if (props.targetName === movie.watch_status) {
        errorToast(`${item.title} exists in ${parseName(props.targetName)}`);
      } else {
        infoToast(`${item.title} moved to ${parseName(props.targetName)}`);
        updateWatchStatus(movie, props.targetName);
      }
    });
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

// react to drop sources of type "PosterCard"
export default DropTarget("PosterCard", listTarget, collect)(
  PosterCardDropTarget,
);
