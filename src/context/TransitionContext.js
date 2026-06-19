import React, { createContext } from 'react';
import { useState } from 'react';

const TransitionContext = createContext({ completed: false });

export const TransitionProvider = ({ children }) => {
    const [completed, setCompleted] = useState(false);
    console.log("aquiiiiiiiii")
    const toggleCompleted = (value) => {
        setCompleted(value);
    };

    return (
        <TransitionContext.Provider
            value={{
                toggleCompleted,
                completed,
            }}
        >
            {children}
        </TransitionContext.Provider>
    );
};

export default TransitionContext;