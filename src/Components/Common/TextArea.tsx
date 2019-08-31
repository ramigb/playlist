import React from "react";

type Props = {
  className?: string;
  readOnly?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = (props: Props) => {
  const {
    className = "form-input",
    onChange,
    placeholder,
    value,
    readOnly = false
  } = props;
  return (
    <textarea
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
    ></textarea>
  );
};

export default TextArea;
