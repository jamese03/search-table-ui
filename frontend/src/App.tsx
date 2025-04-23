import './App.css'
import SearchPage from "./search/SearchPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthWrapper from "./auth/AuthWrapper.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import TableWrapper from "./table/TableWrapper.tsx";

function App() {
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AuthWrapper>
                        <Routes>
                            <Route path="/" element={<SearchPage />} />
                            <Route path="/results" element={<TableWrapper />} />
                        </Routes>
                    </AuthWrapper>
                </BrowserRouter>
            </QueryClientProvider>

        </>
    )
}

export default App
