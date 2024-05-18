import { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends Omit<TextFieldProps, 'error' | 'name'> {
    name: string;
    register?: UseFormRegisterReturn;
    error?: string;
}

const CustomTextField: FC<InputProps> = ({ name, error, register, ...rest }) => {
    return (
        <TextField
            {...rest}
            label={rest.label}
            {...(register ? register : {})}
            name={name}
            sx={{ width: '100%' }}
            helperText={error && <span className="text-danger">{error}</span>}
            error={!!error}
        />
    );
}

export default CustomTextField;