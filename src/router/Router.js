import { Routes, Route } from 'react-router-dom';
import RosePaul from '../RosePaul';
import App from '../App';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/roseandpaul" element={<RosePaul />} />

        </Routes>

    );
};

export default Router;