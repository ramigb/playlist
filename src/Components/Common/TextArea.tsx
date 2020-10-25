import React from "react";

type Props = {
  className?: string;
  readOnly?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
};

const TextArea = (props: Props) => {
  const {
    className = "form-input",
    onChange,
    placeholder,
    value,
    readOnly = false,
    maxLength = 255
  } = props;

  const _onChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.currentTarget
    console.log(value.length)
    if(value.length >= maxLength){
      e.currentTarget.value = value.substring(0,maxLength);
      return null;
    }    
    onChange && onChange(e);
  }

  return (
    <textarea
      className={className}
      onChange={_onChange}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
    ></textarea>
  );
};

export default TextArea;
