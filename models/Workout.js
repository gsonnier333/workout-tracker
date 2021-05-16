const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
	day: {
		type: Date,
		default: Date.now, //default to now if no date given for the workout
	},
	exercises: [
		{
			_id: false,

			type: {
				type: String,
			},

			name: {
				type: String,
			},

			weight: {
				type: Number,
				required: false, //doesn't apply to all exercises
			},

			sets: {
				type: Number,
				required: false, //doesn't apply to all exercises
			},

			reps: {
				type: Number,
				required: false, //doesn't apply to all exercises
			},

			duration: {
				type: Number,
			},

			distance: {
				type: Number,
				required: false, //doesn't apply to all exercises
			},
		},
	],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
