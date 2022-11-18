const express = require('express');
const notesRouter = express.Router();
const checkAuthentication = require('../../middlewares/checkAuthentication');

const {
	createNote,
	getAllNotes,
	getSingleNote,
	editNote,
	deleteNote,
} = require('../../controller/NotesController');

// Create new Note
notesRouter.post('/', checkAuthentication, createNote);

// Get All notes
notesRouter.get('/', checkAuthentication, getAllNotes);

// Get a single note
notesRouter.get('/:id', checkAuthentication, getSingleNote);

// Edit note
notesRouter.patch('/:id', checkAuthentication, editNote);

// Delete note
notesRouter.delete('/:id', checkAuthentication, deleteNote);

module.exports = notesRouter;
