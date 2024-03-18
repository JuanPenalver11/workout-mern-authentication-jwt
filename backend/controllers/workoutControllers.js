const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//GET Controller
const getWorkout = async (request, response) => {
  const user_id = request.user._id
  try {
    const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
    response.status(200).json(workouts);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

//GET by ID Controller

const getWorkoutById = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) { // este metodo se asegura que el id 
        // introducido respete el modelo de id establecido por moongose
      return response.status(404).json({ error: "Invalid Id" });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      response.status(404).json({ error: "Workout not found" });
    } else {
      response.status(200).json(workout);
    }
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

//POST Controller
const createWorkout = async (request, response) => {
  const {title, reps, load} = request.body

  const emptyField = []

  if(!title){
    emptyField.push(' title')
  }
  if(!load){
    emptyField.push(' load')
  }
  if(!reps){
    emptyField.push(' reps')
  }
  if(emptyField.length > 0){
    return response.status(400).json({error: `Please fill in ${emptyField}`, emptyField})
  }
  try {
    const user_id = request.user._id
    const workout = await Workout.create({title, reps, load, user_id});
    response.status(200).json(workout);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

//DELETE Controller

const deleteWorkout = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) { // este metodo se asegura que el id 
        // introducido respete el modelo de id establecido por moongose
      return response.status(404).json({ error: "Invalid Id" });
    }
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) response.status(404).json({ error: "Workout not found" });
    response.status(200).json({message:   "Workout was deleted successfully"});
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

//PATCH Controller

const updateWorkout = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) { // este metodo se asegura que el id 
        // introducido respete el modelo de id establecido por moongose
      return response.status(404).json({ error: "Invalid Id" });
    }
    const workoutId = await Workout.findByIdAndUpdate(id, request.body);
    if (!workoutId) {
      response.status(404).json({ error: "Workout not found" });
    } else {
      const workout = await Workout.findById(id);
      response.status(200).json(workout);
    }
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

module.exports = {
  getWorkout,
  getWorkoutById,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
