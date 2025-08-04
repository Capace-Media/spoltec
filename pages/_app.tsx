import { useRouter } from "next/router";

import "../styles/global.scss";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [queryClient] = useState(() => new QueryClient());
  const completeRoute = router.asPath;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
