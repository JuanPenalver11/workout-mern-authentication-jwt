require("dotenv").config(); //npm i notenv 
const cors = require('cors')
const express = require("express");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes")
const mongoose = require("mongoose");

//connect to db
mongoose
  .connect("mongodb://localhost:27017/workoutApp")
  .then(() => {
    //PORT
    app.listen(process.env.PORT, () => {
      console.log(`connected to dataBS & PORT in ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//express app
const app = express();

//middlewares
app.use(express.json());

app.use(cors())
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

//route /
app.use("/api/workouts", workoutRoutes);
app.use("/api/user",userRoutes)
