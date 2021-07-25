import { FieldError } from 'react-hook-form';
import { ReactNode, forwardRef } from 'react';

type InputProps = {
  type?: string;
  label?: string;
  children?: ReactNode;
  placeholder?: string;
  errorMessage?: string;
  error?: FieldError | null;
};

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { label, error, errorMessage, type, placeholder, ...other } = props;
  return (
    <div className="my-2">
      <label className="label">{label}</label>
      <div className="control">
        <input
          {...other}
          ref={ref}
          className="border p-2 rounded dark:bg-gray-700 dark:border-gray-900"
          type={type}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
});

export default Input;
