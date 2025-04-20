import './App.css'
import TableWrapper from "./table/TableWrapper.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthWrapper from "./auth/AuthWrapper.tsx";

function App() {
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthWrapper>
                    <TableWrapper/>
                </AuthWrapper>
            </QueryClientProvider>

        </>
    )
}

export default App
