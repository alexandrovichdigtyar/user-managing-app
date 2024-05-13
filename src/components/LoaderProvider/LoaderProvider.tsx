import { loadingAtom } from "@/state/store";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAtom } from "jotai";
import React, { ReactNode } from "react";

const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, _] = useAtom(loadingAtom);

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