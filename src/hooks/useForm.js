// src/hooks/useForm.js
import { useState } from "react";

export const useForm = (initialValues, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate một field
  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return "";

    // Required
    if (rules.required && !value) {
      return rules.required;
    }

    // Min length
    if (rules.minLength && value.length < rules.minLength.value) {
      return rules.minLength.message;
    }

    // Pattern (email, phone, etc.)
    if (rules.pattern && !rules.pattern.value.test(value)) {
      return rules.pattern.message;
    }

    // Custom validation
    if (rules.validate && typeof rules.validate === "function") {
      const result = rules.validate(value, values);
      if (result) return result;
    }

    return "";
  };

  // Validate tất cả fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Validate nếu field đã touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate khi blur
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  // Set giá trị cho một field
  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFieldValue,
    setValues,
    setErrors,
  };
};

export default useForm;