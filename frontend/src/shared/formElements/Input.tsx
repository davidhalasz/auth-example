import React, { useEffect, useReducer } from "react";

interface InputState {
  value: string;
  isTouched: boolean;
}

type InputAction = { type: "CHANGE"; value: string } | { type: "BLUR" };

const initialInputState: InputState = {
  value: "",
  isTouched: false,
};

const inputReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.value, isTouched: true };
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
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value } = inputState;

  useEffect(() => {
    onInput(id, value);
  }, [id, onInput, value]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "CHANGE",
        value: event.target.value,
      });
  };

  const touchHandler = () => {
    dispatch({
        type: "BLUR",
      });
  }

  const input = (
    <input
      className={`bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500
        ${inputState.isTouched && "border-red-500"}`}
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
        className="block mb-2 text-sm font-medium text-slate-900"
        htmlFor={props.id}
      >
        {props.label}
      </label>
      {input}
      {inputState.isTouched && (
        <p className="text-red-500">{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
