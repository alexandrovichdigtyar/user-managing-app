import {
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Control, Controller } from "react-hook-form";

interface InputProps {
    type?: 'number' | 'text';
    disabled?: boolean;
    name: string;
    label: string;
    error: any;
    control: Control<any, any>;
}

const Input = (props: InputProps) => {
    const { control, name, label, disabled, error, type = "text" } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControl
                    fullWidth
                    variant="outlined"
                    error={Boolean(error)}
                >
                    <StyledInputLabel htmlFor={name}>
                        {label}
                    </StyledInputLabel>
                    <StyledOutlinedInput
                        {...field}
                        label={label}
                        id={name}
                        type={type}
                        disabled={disabled}
                    />
                    {error && (
                        <FormHelperText id={name}>
                            {error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

const StyledInputLabel = styled(InputLabel)`
    font-weight: 400;
    font-size: 15px;
    color: ${({ theme }) => theme.palette.text.secondary};
    line-height: 20px;
`;

const StyledOutlinedInput = styled(OutlinedInput)`
    padding: 16px 10px 16px 16px;

    &.Mui-focused {
        .MuiOutlinedInput-notchedOutline {
            border-width: 1px;
        }
    }
    
    :hover {
        .MuiOutlinedInput-notchedOutline {
            border-color: ${({ theme }) => theme.palette.primary.main};
        }
    }
    
    input {
        padding: 0 !important;
    }
`;

export default Input;
