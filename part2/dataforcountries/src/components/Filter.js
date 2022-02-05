const Filter = ({ value, handleOnChange }) => {
  return (
    <>
      find countries <input value={value} onChange={handleOnChange} />
    </>
  );
};

export default Filter;
