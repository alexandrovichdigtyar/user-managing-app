import { AppProps } from "next/app";
import Providers from "../src/providers/Providers";

const App = ({ Component, pageProps }: AppProps) => (
  <Providers>
    <Component {...pageProps} />
  </Providers>
);

export default App;