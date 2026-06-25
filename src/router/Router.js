import React from 'react'
import { Switch, Route } from 'react-router-dom';
import App from '../App';

const Router = () => {
    return (
        <Route
            render={() => (
                <Switch>
                    <Route path="/roseandpaul" element={<App />} />
                </Switch>
            )}
        />
    );
};

export default Router;