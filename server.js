const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { debugPort } = require("process");

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
	db.Workout.aggregate([
		{
			$addFields: {
				totalDuration: {
					$sum: "$exercises.duration",
				},
			},
		},
	])
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});

	// db.Workout.find({})
	// 	.then((data) => {
	// 		res.json(data);
	// 	})
	// 	.catch((err) => {
	// 		res.json(err);
	// 	});
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

app.get("/api/workouts/range", (req, res) => {
	db.Workout.aggregate([
		{
			$addFields: {
				totalDuration: {
					$sum: "$exercises.duration",
				},
			},
		},
	])
		.then((data) => {
			let lastSeven = data.slice(data.length - 7); //grab a slice of the array that only includes the last seven workouts

			res.json(lastSeven);
		})
		.catch((err) => {
			res.json(err);
		});
	// db.Workout.find({})
	// 	.then((data) => {
	// 		let lastSeven = data.slice(data.length - 7); //grab a slice of the array that only includes the last seven workouts
	// 		console.log(lastSeven[0]);
	// 		res.json(lastSeven);
	// 	})
	// 	.catch((err) => {
	// 		res.json(err);
	// 	});
});

app.get("/exercise", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
