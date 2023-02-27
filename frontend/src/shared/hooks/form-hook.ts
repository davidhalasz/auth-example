import { useReducer, useCallback } from "react";

interface FormState {
    inputs: any;
    isValid: boolean;
}

type FormAction = {
    [x: string]: any; type: "INPUT_CHANGE"; value: any; inputId: string; isValid: boolean;
};

const formReducer = (state: FormState, action: FormAction) : FormState => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs) {
              if(inputId === action.inputId) {
                formIsValid = formIsValid && action.isValid;
              } else {
                formIsValid = formIsValid && state.inputs[inputId].isValid;
              }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid},
                },
                isValid: formIsValid,
            };
       default:
            return state;
    }
}

export const useForm = (initialInputs: any, initialFormValidity: boolean) : any[] => {
    const [formState, dispatch] = useReducer(formReducer, {
      inputs: initialInputs,
      isValid: initialFormValidity,
    });
  
    const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        inputId: id,
        isValid: isValid,
      });
    }, []);
  
    return [formState, inputHandler];
  };