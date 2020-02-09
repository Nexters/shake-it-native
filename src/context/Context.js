import React, {createContext, useContext, useReducer} from 'react';

const init = {mode: 'now'};

function todoReducer(state, action) {
  switch (action.type) {
    case 'now':
      return {mode: 'now'};
    case 'history':
      return {mode: 'history'};
    default:
      return {mode: 'now'};
  }
}

const ModeStateContext = createContext();
const ModeDispatchContext = createContext();

export function ModeProvider({children}) {
  const [state, dispatch] = useReducer(todoReducer, init);
  return (
    <ModeStateContext.Provider value={state}>
      <ModeDispatchContext.Provider value={dispatch}>
        {children}
      </ModeDispatchContext.Provider>
    </ModeStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(ModeStateContext);
}

export function useTodoDispatch() {
  return useContext(ModeDispatchContext);
}
