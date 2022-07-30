import React, { useEffect } from "react";
import styled from "./CompanyOptions.module.css";
import { useSelector } from "react-redux";

const CompanyOptions = (props) => {
  const { setCheckedCompany, checkedCompany } = props;
  const { products } = useSelector((state) => state.products);

  //get companies from the products array and create an array of unique values
  const productCompanies = new Set(products.map((product) => product.company));

  //when the component mounts, get the values from local storage and set the state, and checkboxes
  useEffect(() => {
    const storedCompany = JSON.parse(localStorage.getItem("checkedCompany"));
    if (storedCompany) {
      setCheckedCompany(storedCompany);
      //set the checkbox to checked
      storedCompany.forEach((company) => {
        document.getElementById(company).checked = true;
      });
    }
  }, [setCheckedCompany]);

  const handleCompany = (e) => {
    //destructure the value and the checked status of the checkbox from the event object
    const { value, checked } = e.target;

    //if the checkbox is checked, add the value to the checkedCompany array
    //if the checkbox is unchecked, remove the value

    if (checked) {
      setCheckedCompany((previous) => [...previous, value]);
    } else {
      setCheckedCompany(checkedCompany.filter((company) => company !== value));
    }
  };

  const companyOptions = Array.from(productCompanies).map((company) => {
    return (
      <div key={company} className={styled.company__option}>
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
    <div className={styled.company}>
      <h4>Company</h4>
      <div className={styled.companies}>{companyOptions}</div>
    </div>
  );
};

export default CompanyOptions;
