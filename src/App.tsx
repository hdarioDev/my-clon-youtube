import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';
import Watch from './pages/Watch';

const App = () => {
    return (
        <BrowserRouter>
            <Routes >

                <Route path="home" element={<Home />} />
                <Route path="watch/:id" element={<Watch />} />
                <Route path="search" element={<Search />} />
                <Route path="/*" element={<Navigate to="/home" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App