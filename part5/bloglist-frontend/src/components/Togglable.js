import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const shownWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <button
        id="blogFormButton"
        onClick={toggleVisibility}
        style={hideWhenVisible}
      >
        {buttonLabel}
      </button>
      <div style={shownWhenVisible} className="togglagbleDiv">
        {children}
        <button onClick={toggleVisibility} style={shownWhenVisible}>
          Cancel
        </button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
