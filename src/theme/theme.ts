import { createTheme } from "@mui/material/styles";

const palette = {
    common: {
        black: "#000000",
        white: "#FFFFFF",
    },
    primary: {
        main: "#3CA1C2",
        light: "#E2F1F6",
    },
    secondary: {
        main: "#edf2ff",
        light: "#EBEBEB",
    },
    grey: {
        100: "#f9f9f9",
        200: "#c8c8c8",
        300: "#F5F5F5",
        400: "#4F5557",
        500: "#7F8384",
        600: "#989A9B",
        700: "#B0B1B1",
    },
    success: {
        main: "#38D76D",
        dark: "#4EDC7D",
        light: "#E9FBEF",
    },
    info: {
        lightest: "#f9fcfd",
        light: "#EBF6F9",
        main: "#4FABC9",
        dark: '#63B4CF',
    },
    error: {
        light: "#FDE7EC",
        dark: "#F04164",
        main: "#EE2950",
    },
    warning: {
        light: "#FFF7EA",
        main: "#FBB640",
    },
    text: {
        primary: "#1E272A",
        secondary: "#676C6E",
    },
};

const theme = createTheme({
    typography: {
        allVariants: {
            color: palette.text.primary,
        },
    },
    palette,
});

export default theme;
