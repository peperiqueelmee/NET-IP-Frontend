import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ActionProvider } from "./context/ActionProvider";

import Index from "./pages/Index";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import ServerError from "./pages/ServerError";
import Test from "./pages/Test";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Index />} />
                <Route path="home" element={<ActionProvider><Home /></ActionProvider>} />
                <Route path="test" element={<Test />} />
                <Route path="test" element={<Test />} />
                <Route path="error-server" element={<ServerError />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
