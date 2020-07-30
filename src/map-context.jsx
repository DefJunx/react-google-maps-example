import React, { createContext, useReducer, useContext } from 'react';

const MapStateContext = createContext();
const MapDispatchContext = createContext();

function mapReducer(state, action) {
   switch (action.type) {
      case 'SET_MAP':
         return { [action.payload.id]: action.payload.map };
      default:
         throw new Error(`Action type unknown: ${action.type}`);
   }
}

function MapProvider({ children }) {
   const [state, dispatch] = useReducer(mapReducer, {});

   return (
      <MapStateContext.Provider value={state}>
         <MapDispatchContext.Provider value={dispatch}>
            {children}
         </MapDispatchContext.Provider>
      </MapStateContext.Provider>
   )
}

function useMapState() {
   const context = useContext(MapStateContext);

   if (context === undefined) {
      throw new Error('useMapState must be used within a CountProvider')
   }

   return context
}

function useMapDispatch() {
   const context = useContext(MapDispatchContext);

   if (context === undefined) {
      throw new Error('useMapState must be used within a CountProvider')
   }

   return context
}

export { MapProvider, useMapState, useMapDispatch };