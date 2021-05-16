const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
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
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
