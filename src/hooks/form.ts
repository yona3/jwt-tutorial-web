import { useState } from "react";

export const useForm = (defaultValue: { [key: string]: string }) => {
  const [values, setValues] = useState(defaultValue);

  const handleSetValues = (key: string, value: string) => {
    const newValues = { ...values };
    newValues[key] = value;
    setValues(newValues);
  };

  return { values, handleSetValues };
};
