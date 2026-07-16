import { Routes, Route } from 'react-router-dom';
import App from '../App';
import CoupleWrapper from '../CoupleWrapper';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:coupleSlug" element={<CoupleWrapper />} />

        </Routes>

    );
};

export default Router;