import { WorkoutContext } from "../context/workoutContext";
import { useContext } from "react";
// useContext es un hook como lo puede ser useState o useEffect

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  // useContext se utiliza para obtener el tipo de contexto 
  // useWokoutContext se utiliza para que el resto de los componentes tengan acceso a dispatch o a workouts

  if (!context) {
    throw Error(
      "useWorkoutContext must be used inside an WorkoutContextProvider"
    );
  }
  // aqui se verifica que context existe si no existe se envia un error

  return context;
};
