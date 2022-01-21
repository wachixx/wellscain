import React, {createContext, useEffect, useReducer} from "react";              
import Reducer from './Reducer';
                                                                                                                                                                       
const initialState = {}       
                                                                                                                             
export const Context = createContext(initialState);                                                                      
                                                                                
const Store = ({children}) => {    

    const [state, dispatch] = useReducer(Reducer, initialState); 
                                                                          
    useEffect(() => {                 
        const local_state = JSON.parse(localStorage.getItem('state'))           
        if (local_state) {                                                      
            dispatch({type: 'SET', key:'tabs', payload: local_state.tabs}); 
            dispatch({type: 'SET', key:'currentTab', payload: local_state.currentTab}); 
        }                                                                       
    }, [])                                                                      
                                                                                
    useEffect(() => {           
        localStorage.setItem('state', JSON.stringify(state))                    
    }, [state])                                                                  

    return (                                                                    
        <Context.Provider value={[state, dispatch]}>                            
            {children}                                                          
        </Context.Provider>                                                     
    )                                                                           
};  

export default Store;