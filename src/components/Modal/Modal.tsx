"use client"

import { IconButton, Modal as MuiModal, Typography, } from "@mui/material";
import styled from "styled-components";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}

const Modal = ({ children, onClose, title }: ModalProps) => {
    return (
        <StyledModal open={true}>
            <ModalWrapper>
                <HeaderModal>
                    <TitleWrapper>
                        <Typography>{title}</Typography>
                    </TitleWrapper>
                    <StyledIconButton onClick={onClose}>
                        <Typography>
                            X
                        </Typography>
                    </StyledIconButton>
                </HeaderModal>
                <Content>
                    {children}
                </Content>
            </ModalWrapper>
        </StyledModal>
    )
}

const StyledIconButton = styled(IconButton)`
    border-radius: 4px;    
`;

const HeaderModal = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 24px;
    padding: 24px 24px 0 24px;
    
    button {
        height: max-content;
    }
`;

const TitleWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: black;
ç
    p {
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
    }
`;

const ModalWrapper = styled('div')`
    background: white;
    max-width: 620px;
    max-height: 700px;
    overflow: auto;
    position: relative;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    width: 100%;
    padding-bottom: 40px;
`;

const StyledModal = styled(MuiModal)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;

`;

const Content = styled('div')`
    width: 100%;
`;

export default Modal;