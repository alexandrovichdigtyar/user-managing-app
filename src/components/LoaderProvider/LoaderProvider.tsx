import { loadingAtom } from "@/state/store";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAtom } from "jotai";
import { Router } from "next/router";
import { ReactNode, useEffect } from "react";

const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useAtom(loadingAtom);

    useEffect(() => {
        const startLoading = () => setIsLoading(true);
        const endLoading = () => setIsLoading(false);

        Router.events.on('routeChangeStart', startLoading);
        Router.events.on('routeChangeComplete', endLoading);
        Router.events.on('routeChangeError', endLoading);

        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', endLoading);
            Router.events.off('routeChangeError', endLoading);
        };
    }, []);

    return (
        <>
            {isLoading && (
                <Backdrop
                    sx={{ color: (theme) => theme.palette.primary.light, zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    <CircularProgress size={100} />
                </Backdrop>
            )}
            {children}
        </>
    )
}

export default LoaderProvider;