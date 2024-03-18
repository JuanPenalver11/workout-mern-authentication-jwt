import { AuthContext  } from "../context/authContext";
import { useContext } from "react";
// useContext es un hook como lo puede ser useState o useEffect

export const useAuthContext = () => {
  const context = useContext(AuthContext );
  // useContext se utiliza para obtener el tipo de contexto 
  // useWokoutContext se utiliza para que el resto de los componentes tengan acceso a dispatch o a workouts

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside an AuthContextProvider"
    );
  }
  // aqui se verifica que context existe si no existe se envia un error

  return context;
};
