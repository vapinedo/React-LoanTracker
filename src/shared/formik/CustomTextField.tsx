import { TextField } from "@mui/material";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    register?: any;
    label?: string;
    error?: string;
}

export default function CustomTextField(props: InputProps): any {
    const {
        name,
        error,
        label,
        register,
        ...rest
    } = props;

    return (
        <TextField
            {...rest}
            size="small"
            label={label}
            helperText={<span className="text-danger">{error}</span>}
            {...register(name)}
            sx={{ width: '100%' }}
        />
    );
}
