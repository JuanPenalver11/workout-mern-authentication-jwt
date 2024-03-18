const express = require("express");
const {
  getWorkout,
  getWorkoutById,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");

const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)
//este middleware exige que este identificado para que puedas acceder a las rutas de abajo

//GET all workouts
router.get("/", getWorkout);

//GET a single workout
router.get("/:id", getWorkoutById);

//POST a new workout
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
