import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { classNames } from '../../../../utils/utils';

interface FormInputProps {
  name: string;
  type: 'text' | 'number';
  placeholder: string;
  className?: string;
  register: UseFormRegister<FieldValues>;
  registerValue: string;
}

export function FormInput(props: FormInputProps) {
  const { name, type, placeholder, className, register, registerValue } = props;

  return (
    <div className="relative z-0 w-full my-4 group">
      <input
        {...register(`${registerValue}`)}
        type={type}
        name={`floating_${name}`}
        id={`floating_${name}`}
        className={classNames(
          'block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer',
          className
        )}
        placeholder=" "
      />
      <label
        htmlFor={`floating_${name}`}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {placeholder}
      </label>
    </div>
  );
}
