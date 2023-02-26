import { useReducer, useCallback } from "react";

interface FormState {
    inputs: any;
}

type FormAction = {
    [x: string]: any; type: "INPUT_CHANGE"; value: any;
};

const formReducer = (state: FormState, action: FormAction) : FormState => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value},
                },
            };
       default:
            return state;
    }
}

export const useForm = (initialInputs: any) : any[] => {
    const [formState, dispatch] = useReducer(formReducer, {
      inputs: initialInputs,
    });
  
    const inputHandler = useCallback((id: string, value: string) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        inputId: id,
      });
    }, []);
  
    return [formState, inputHandler];
  };