'use client'

import LoaderProvider from "@/components/LoaderProvider/LoaderProvider";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";

const Providers = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <ThemeProvider theme={theme}>
            <Provider>
                <QueryClientProvider client={queryClient}>
                    <LoaderProvider >
                        {children}
                    </LoaderProvider>
                </QueryClientProvider>
            </Provider>
            <StyledToast
                containerId="toast-message"
                position="bottom-center" />
        </ThemeProvider>
    )
}

const StyledToast = styled(ToastContainer)`
    z-index: 999999;
`;


export default Providers;