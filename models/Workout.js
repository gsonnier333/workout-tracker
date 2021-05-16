const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
	day: {
		type: Date,
		default: Date.now, //default to now if no date given for the workout
	},
	exercises: [
		{
			type: Schema.Types.ObjectId,
			ref: "Exercise",
		},
	],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
