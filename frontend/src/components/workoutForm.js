import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);
  const { dispatch } = useWorkoutContext();
  const {user } = useAuthContext()

  async function handleSubmit(e) {
    e.preventDefault();

    if(!user){
      setError('You must be logged in ')
      return 
    }

    const workout = { title, load, reps };

    const response = await fetch(
      "https://l4rnrz4l-4000.asse.devtunnels.ms/api/workouts",
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${user.token}`
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyField(json.emptyField);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyField([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyField.includes(" title") ? "error" : ""}
      />

      <label>Load (Kg): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyField.includes(" load") ? "error" : ""}
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyField.includes(" reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
