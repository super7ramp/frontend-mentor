import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.scss'
import DetailsPage from "./pages/DetailsPage.jsx";
import MainPage from "./pages/MainPage.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/:countryName" element={<DetailsPage/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
