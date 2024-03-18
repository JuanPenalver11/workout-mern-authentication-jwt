import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"; // npm i fns // to make prettier your date

const WorkoutCard = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  async function handleClick() {
    if (!user) {
      return;
    }
    const response = await fetch(
      "https://l4rnrz4l-4000.asse.devtunnels.ms/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  }
  

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (Kg):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps (Kg):</strong> {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSufix: true })}
      </p>
      <span onClick={handleClick} className="fa-solid fa-trash"></span>
    </div>
  );
};

export default WorkoutCard;
