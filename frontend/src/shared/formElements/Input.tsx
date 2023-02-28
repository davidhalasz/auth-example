import React, { useEffect, useReducer } from "react";
import { validate, ValidatorsInterface } from "../utils/validators";

interface InputState {
  value: string;
  isTouched: boolean;
  isValid: boolean;
}

type InputAction =
  | {
      validators: ValidatorsInterface[];
      type: "CHANGE";
      value: string;
    }
  | { type: "BLUR" };

const inputReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isTouched: false,
        isValid: validate(action.value, action.validators),
      };
    case "BLUR":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const Input = (props: {
  value?: string;
  id: string;
  type?: string;
  placeholder?: string;
  label?: string;
  errorText?: string;
  onInput?: any;
  validators: ValidatorsInterface[];
  valid?: boolean;
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "BLUR",
    });
  };

  const input = (
    <input
      className={`bg-gray-50 border text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500
        ${(!inputState.isValid && inputState.isTouched) ? "border-red-300" : "border-gray-300" }`}
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      onBlur={() => touchHandler()}
      value={inputState.value}
    />
  );

  return (
    <div className="form-control">
      <label
        className={`block mb-2 text-sm font-medium ${
          (!inputState.isValid && inputState.isTouched) ? "text-red-600" : "text-slate-900"
        }`}
        htmlFor={props.id}
      >
        {(!inputState.isValid && inputState.isTouched)
          ? props.errorText
          : props.label}
      </label>
      {input}
    </div>
  );
};

export default Input;
