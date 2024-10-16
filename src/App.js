import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import "rsuite/dist/rsuite-no-reset.min.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import First from "./pages/First";
import Ais from "./pages/Ais";
import D2c from "./pages/D2c";

export const axInst = axios.create({
  baseURL: window.epAppData.API_BASE_URL,
});

function App() {
  const hourAgo = new Date().getTime() - 3600000;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        initialDataUpdatedAt: hourAgo,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/d2c" element={<D2c />} />
          <Route path="/ais" element={<Ais />} />
        </Routes>
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
