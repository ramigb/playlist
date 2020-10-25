import React from "react";

type Props = {
  className?: string;
  type?: string;
  placeholder?: string;
  myRef?: React.Ref<HTMLInputElement>;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
};

const Input = (props: Props) => {
  const {
    type = "text",
    className = "form-input",
    onChange,
    onKeyPress,
    placeholder,
    myRef = null,
    maxLength = 255
  } = props;

  const _onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget
    console.log(value.length)
    if(value.length >= maxLength){
      e.currentTarget.value = value.substring(0,maxLength);
      return null;
    }    
    onChange && onChange(e);
  }

  return (
    <input
      className={className}
      type={type}
      onChange={_onChange}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      {...(myRef && { ref: myRef })}
      maxLength={maxLength}
    />
  );
};

export default Input;
