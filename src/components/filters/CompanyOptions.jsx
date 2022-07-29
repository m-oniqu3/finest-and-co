import React from "react";
import styled from "./CompanyOptions.module.css";
import { useSelector } from "react-redux";

const CompanyOptions = (props) => {
  const { products } = useSelector((state) => state.products);

  const productCompanies = new Set(products.map((product) => product.company));

  const handleCompany = (e) => {
    //destructure the value and the checked status of the checkbox from the event object
    const { value, checked } = e.target;

    //if the checkbox is checked, add the value to the checkedCompany array
    //if the checkbox is unchecked, remove the value

    if (checked) {
      props.setCheckedCompany((previous) => [...previous, value]);
    } else {
      props.setCheckedCompany(
        props.checkedCompany.filter((company) => company !== value)
      );
    }
  };

  const companyOptions = Array.from(productCompanies).map((company) => {
    return (
      <div key={company} className={styled.filter__option}>
        <input
          type="checkbox"
          id={company}
          value={company}
          onChange={handleCompany}
        />
        <label htmlFor={company}>{company}</label>
      </div>
    );
  });
  return (
    <div>
      <h4>Company</h4>
      {companyOptions}
    </div>
  );
};

export default CompanyOptions;
