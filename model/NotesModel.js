const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	created: {
		type: String,
	},
	editedAt: {
		type: String,
	},
});

const NotesModel = mongoose.model('Note', NotesSchema);

module.exports = NotesModel;
