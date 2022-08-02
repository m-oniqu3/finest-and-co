import React, { useEffect } from "react";
import styled from "./CompanyOptions.module.css";
import { useSelector } from "react-redux";

const CompanyOptions = (props) => {
  const { setCheckedCompany, checkedCompany } = props;
  const { products, filters } = useSelector((state) => state.products);

  //create an array of unique companies
  const productCompanies = new Set(products.map(({ company }) => company));

  //update the checkedCompany array
  const handleCompany = (e) => {
    const { value, checked } = e.target;

    if (checked) setCheckedCompany((previous) => [...previous, value]);
    else
      setCheckedCompany(checkedCompany.filter((company) => company !== value));
  };

  //when the component mounts, set the checkedCompany to the filters.company
  useEffect(() => {
    const { company } = filters;
    if (company) setCheckedCompany(filters?.company);
  }, [setCheckedCompany, filters]);

  const companyOptions = Array.from(productCompanies).map((company) => {
    return (
      <div key={company} className={styled.company__option}>
        <input
          type="checkbox"
          id={company}
          value={company}
          onChange={handleCompany}
          checked={checkedCompany.includes(company)}
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
