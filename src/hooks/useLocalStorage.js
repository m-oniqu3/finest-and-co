import { useEffect, useState } from "react";

const useLocalStorage = () => {
  const [storedValues, setStoredValues] = useState({});

  //retrieve values from localStorage
  useEffect(() => {
    const values = JSON.parse(localStorage.getItem("values"));
    if (values) {
      setStoredValues(values);
    }
  }, []);

  return storedValues;
};

export default useLocalStorage;
