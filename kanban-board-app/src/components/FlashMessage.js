import React from "react";
import PropTypes from "prop-types";

const FlashMessage = ({ message }) => {
  return <div className="flash-error">{message}</div>;
};

FlashMessage.defaultProps = {
  message: null,
};
FlashMessage.propTypes = {
  message: PropTypes.string,
};

export default FlashMessage;
