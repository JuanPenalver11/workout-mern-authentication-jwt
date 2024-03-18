import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutContext"

const useLogout = () => {
  const {dispatch} = useAuthContext()
  const { dispatch: workoutDispatch } = useWorkoutContext()
 
  const logout = () =>{
    //remove user from storage
    localStorage.removeItem('user')
    dispatch({type:'LOGOUT'})
    workoutDispatch({type:'SET_WORKOUTS', payload:null})
    // este codigo hace que cuando un usuario haga logout
    // su contenido se resete a null para evitar eliminar residuos
    // y que si otro cliente se loguea su workout list no aunque sea por unos segundos
    // tiempo que el navegador esta cargando su informacion la informacion de otro usuario
  }

  return {logout}
}

export default useLogout
