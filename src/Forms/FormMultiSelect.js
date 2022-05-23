import Multiselect from "multiselect-react-dropdown";

const FormMultiSelect = ({ options, onChange, values }) => {
  return (
    <Multiselect
      options={options} // Options to display in the dropdown
      selectedValues={values} // Preselected value to persist in dropdown
      onSelect={onChange} // Function will trigger on select event
      displayValue="name"
    />
  );
};
export default FormMultiSelect;
