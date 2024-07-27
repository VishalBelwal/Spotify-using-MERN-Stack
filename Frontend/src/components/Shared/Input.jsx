const Input = ({
  label,
  placeholder,
  className,
  value,
  setValue,
  labelClassName,
}) => {
  return (
      <div
          className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}
      >
          <label htmlFor={label} className={`font-semibold ${labelClassName}`}>
              {label}
          </label>
          <input
              type="text"
              placeholder={placeholder}
              className="p-2 text-base border border-solid rounded-lg border-gray-500 placeholder-gray-500 bg-app-black text-white"
              id={label}
              value={value}
              onChange={(e) => {
                  setValue(e.target.value);
              }}
          />
      </div>
  );
};

export default Input;