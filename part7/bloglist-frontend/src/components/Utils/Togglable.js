import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '', margin: '1.5em' };
  const shownWhenVisible = { display: visible ? '' : 'none', margin: '1.5em' };

  const toggleVisibility = () => {
    setVisible((visible) => !visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <Button
        id="blogFormButton"
        onClick={toggleVisibility}
        style={hideWhenVisible}
      >
        {buttonLabel}
      </Button>
      <div style={shownWhenVisible} className="togglagbleDiv">
        {children}
        <Button onClick={toggleVisibility} style={shownWhenVisible}>
          Cancel
        </Button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
