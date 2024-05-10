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
            label={label}
            {...register(name)}
            sx={{ width: '100%' }}
            InputLabelProps={{ shrink: true }}
            helperText={<span className="text-danger">{error}</span>}
        />
    );
}