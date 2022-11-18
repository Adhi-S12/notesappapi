const NotesModel = require('../model/NotesModel');
const { formatISO } = require('date-fns');
var ObjectId = require('mongoose').Types.ObjectId;

// Create new note
const createNote = (req, res) => {
	const { title, content } = req.body;
	const { email } = req.data;

	if (!title || !content) {
		return res.status(406).send({ error: 'Please enter both title and content' });
	}

	const note = new NotesModel({
		title,
		content,
		email,
		created: formatISO(new Date()),
		editedAt: formatISO(new Date()),
	});

	note
		.save()
		.then((doc) => {
			// console.log(doc);
			return res.status(200).send({ message: 'Note successfully created', data: doc });
		})
		.catch((err) => {
			console.error(err);
			return res.status(400).send({ message: err.message });
		});
};

// Get all notes
const getAllNotes = async (req, res) => {
	const { email } = req.data;
	const notes = await NotesModel.find({ email: email }).exec();

	if (!notes) {
		console.log('Enters Here');
		return res.send({ data: [] });
	}

	return res.status(200).send({ notes });
};

// get single note
const getSingleNote = async (req, res) => {
	const id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.status(400).send({ error: 'Note id is not valid' });
	}

	try {
		const note = await NotesModel.find({ _id: id }).exec();
		return res.status(200).send({ note: note });
	} catch (error) {
		return res.status(400).send({ error: 'Note id is not valid' });
	}
};

// edit note
const editNote = async (req, res) => {
	const id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.status(400).send({ error: 'Note id is not valid' });
	}

	const { title, content } = req.body;

	if (!title || !content) {
		return res.status(406).send({ error: 'Please enter both title and content' });
	}

	try {
		const note = await NotesModel.updateOne(
			{ _id: id },
			{
				title,
				content,
				editedAt: formatISO(new Date()),
			}
		).exec();

		return res.status(200).send({ note: note });
	} catch (error) {
		return res.status(400).send({ error: error.message });
	}
};

// delete note
const deleteNote = (req, res) => {
	const id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.status(400).send({ error: 'Note id is not valid' });
	}

	NotesModel.deleteOne({ _id: id })
		.then((doc) => res.status(200).send({ msg: 'Item deleted', doc }))
		.catch((err) => res.status(400).send({ error: err.message }));
};

module.exports = {
	createNote,
	getAllNotes,
	getSingleNote,
	editNote,
	deleteNote,
};
