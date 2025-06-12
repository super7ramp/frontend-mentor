import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.scss'
import App from './App.jsx'
import DetailsPage from "./pages/DetailsPage.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/:countryName" element={<DetailsPage/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
