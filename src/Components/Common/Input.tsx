import React from "react";

type Props = {
  className?: string;
  type?: string;
  placeholder?: string;
  myRef?: React.Ref<HTMLInputElement>;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: Props) => {
  const {
    type = "text",
    className = "form-input",
    onChange,
    onKeyPress,
    placeholder,
    myRef = null
  } = props;
  return (
    <input
      className={className}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      {...(myRef && { ref: myRef })}
    />
  );
};

export default Input;
