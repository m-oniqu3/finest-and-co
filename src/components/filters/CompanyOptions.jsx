import React, { useEffect } from "react";
import styled from "./CompanyOptions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../store/features/products/productsSlice";

const CompanyOptions = (props) => {
  const { setCheckedCompany, checkedCompany } = props;
  const { products, filters } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  //get companies from the products array and create an array of unique values
  const productCompanies = new Set(products.map((product) => product.company));

  const handleCompany = (e) => {
    const { value, checked } = e.target;

    if (checked) setCheckedCompany((previous) => [...previous, value]);
    else
      setCheckedCompany(checkedCompany.filter((company) => company !== value));
  };

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
