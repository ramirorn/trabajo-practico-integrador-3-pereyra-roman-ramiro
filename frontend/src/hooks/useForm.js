import { useState } from "react";

export const useForm = (initialValue) => {
    const [values, setValues] = useState(initialValue)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleReset = () => {
        setValues(initialValue);
    };

    return {
        values,
        handleChange,
        handleReset
    }
};