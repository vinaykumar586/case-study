import React from "react";

import Select from "react-select";

const FormSelect = ({ items, value, input, onChange, isMulti }) => {
  return (
    <Select options={items} value={value} onChange={onChange} isMulti={isMulti}></Select>
  );
};
export default FormSelect;
