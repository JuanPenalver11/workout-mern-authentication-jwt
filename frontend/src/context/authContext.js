import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
      user: null,
    });

    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('user'))
      // estamos utilizando este hook para evitar que cuando se recargue la pagina 
      // el usuario sea log out. 
      // para ello tenemos que usar JSON.parse para traducir la informacion concerniente al user 
      // que ha sido guardada en el localStorage cuando el ususario se logueo
      //de esta forma nuestra aplicacion podra utilizar la informacion

      if(user){ 
        dispatch({type: 'LOGIN', payload: user})
      }
    },[])
  
    console.log('AuthContext state: ', state);
  
    return (
      <AuthContext.Provider value={{...state, dispatch}}>
        {children}
      </AuthContext.Provider>
    );
  };
