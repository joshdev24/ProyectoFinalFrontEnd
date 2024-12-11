import { useState } from "react"

const useForm = (form_fields) => {
    const [form_values_state, setFormValuesState] = useState(form_fields);

    const handleChangeInputValue = (event) => {
        const input_name = event.target.name;
        const input_value = event.target.value;
<<<<<<< HEAD
        console.log("Input Name:", input_name, "Input Value:", input_value);
=======
>>>>>>> 1b0091d92a0239d4a8bf97a875bbe4f3ddc90e67
        setFormValuesState(
            (prev_form_values_state) => {
                //Lo que retorne sta callback se guarda como  nuevo valor del estado
                return {
                    ...prev_form_values_state,
                    [input_name]: input_value
                }
            }
        ) 
    }

    return {
        form_values_state,
        handleChangeInputValue
    }
};

export default useForm;