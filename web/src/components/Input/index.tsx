import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
interface Props {
  name: string;
  label?: string;
};

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  
  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    })
  }, [fieldName, registerField]);

  return (
    <>
      <input
        name={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span style={{color: 'red'}}>{error}</span>}
    </>
  );
}

export default Input;