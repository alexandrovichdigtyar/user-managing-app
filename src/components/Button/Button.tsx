import theme from '@/theme/theme';
import { ButtonProps, Button as MuiButton, Typography } from '@mui/material';
import styled from 'styled-components';

interface StyledButtonProps extends ButtonProps {
    title: string;
}
const Button = (props: StyledButtonProps) => {
    const { title, onClick } = props;

    return (
        <ButtonWrapper onClick={onClick} {...props}>
            <Typography>
                {title}
            </Typography>
        </ButtonWrapper>
    )
}

const ButtonWrapper = styled(MuiButton)`
    width: 100%;
    padding: 4px 8px;
    gap: 8px;
    border: ${`1px solid ${theme.palette.primary.main}`};
    border-radius: 40px;
    text-transform: none;
    max-width: 200px;

    p {
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: ${`${theme.palette.primary.light}`};
        text-transform: none;
    }
`

export default Button;