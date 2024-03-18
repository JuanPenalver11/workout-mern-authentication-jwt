import { useReducer, createContext } from "react";
//crear un contexto y un reducer para getsionar el estado de los entrenamientos

export const WorkoutContext = createContext();
//este es el contexto


// el state establece el estado de workout que en este momento es null 
// action establece que accion se va a realizar dependiendo del case 
// action tiene un type que indica el tipo de action  que se va a realizar y un payload que es la informacion
// requerida para llevar acabo esa accion 
export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    //imprime todos los workouts
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };
    //crea un workout
    case "DELETE_WORKOUT":
      return {
        //borra un workout
        workouts: state.workouts.filter((workout) => workout._id !== action.payload._id),
      };
    default:
      // por defecto estado
      return state;
  }
};
// aqui arriba se gestiona el estado de los entrenamientos

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, { workouts: null });
// WokoutContextProvider toma a un hijo que es el que va a estar bajo la influencia del contexto. 
//En nuestro caso sera la App, ya que queremos que este contexto se aplique a toda la app. 
//App.js  
console.log(state)
  return (
    // aqui se pasa el estado y el dispatach para que el children tenga acceso como props. 
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );

};
