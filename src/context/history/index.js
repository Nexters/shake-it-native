import React, { useContext, createContext, useReducer } from 'react';

function historyReducer(state, action) {
    console.warn(action)
    switch (action.type) {
        case 'historyDetail': 
            return {
                ...state,
                history: action.history
            }
        default: 
            throw new Error('not history type');
    }
}

const HistoryDetailContext = createContext();
const HistoryDispatchContext = createContext();

export function HistoryProvider({ children }) {
    const [state, dispatch] = useReducer(historyReducer, { history: {}});

    return (
        <HistoryDetailContext.Provider value={state}>
            <HistoryDispatchContext.Provider value={dispatch}>
                { children }
            </HistoryDispatchContext.Provider>
        </HistoryDetailContext.Provider>
    )
}

export function useHistoryState() {
    return useContext(HistoryDetailContext);
}

export function useHistoryDispatch() {
    return useContext(HistoryDispatchContext);
}
