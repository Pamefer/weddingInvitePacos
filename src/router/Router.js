import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { TransitionProvider } from '../context/transitionContext';
import TransitionComponent from '../components/Transition';
import App from '../App';

const Router = () => {
    return (
        <Routes>
            <Route>
                <TransitionComponent>
                    <App />
                </TransitionComponent>
            </Route>
        </Routes>
    );
};

export default Router;