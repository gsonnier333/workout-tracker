const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
	useNewUrlParser: true,
});

mongoose.set("useFindAndModify", false);

app.get("/api/workouts", (req, res) => {
	db.Workout.find({})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.post("/api/workouts", (req, res) => {
	db.Workout.create({})
		.then((newWorkout) => {
			console.log(newWorkout);
			res.json(newWorkout);
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

app.put("/api/workouts/:id", (req, res) => {
	console.log(
		`Updating id: ${req.params.id} with ${JSON.stringify(req.body)}`
	);

	db.Workout.updateOne(
		{ _id: req.params.id },
		{
			$push: { exercises: req.body },
		},
		(err, doc) => {
			if (err) {
				console.log(err);
				res.json(err);
			} else {
				console.log(doc);
				res.json(doc);
			}
		}
	);
});

app.get("/exercise", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
