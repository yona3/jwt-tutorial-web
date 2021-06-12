import "tailwindcss/tailwind.css";

import type { AppProps } from "next/dist/next-server/lib/router/router";

import { RootComponent } from "../store/context";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RootComponent>
      <Component {...pageProps} />
    </RootComponent>
  );
};

export default App;
