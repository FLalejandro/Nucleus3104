import NotesAPI from './NotesAPI.js';

export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New Note...">
                <textarea class="notes__body">Take Note...</textarea>
                <button class="notes__delete" style="display: none;">Delete Note</button>
            </div>
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);

        this.root.querySelector(".notes__delete").addEventListener("click", () => {
            const doDelete = confirm("Are you sure you want to delete this note?");
            if (doDelete) {
                const selectedNoteId = this.root.querySelector(".notes__list-item--selected").dataset.noteId;
                this.onNoteDelete(selectedNoteId);
            }
        });
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}

const root = document.getElementById("app");
const notesView = new NotesView(root, {
    onNoteSelect: id => {
        const note = NotesAPI.getNoteById(id);
        notesView.updateActiveNote(note);
        root.querySelector(".notes__delete").style.display = "block"; // Show the delete button when a note is selected
    },
    onNoteAdd: () => {
        const title = root.querySelector(".notes__title").value.trim();
        const body = root.querySelector(".notes__body").value.trim();
        const color = "#ffffff"; // Default color, you can modify it according to your requirement
        const newNote = {
            title,
            body,
            color
        };
        NotesAPI.saveNote(newNote);
        const notes = NotesAPI.getAllNotes();
        notesView.updateNoteList(notes);
    },
    onNoteEdit: (title, body) => {
        const selectedNoteId = root.querySelector(".notes__list-item--selected").dataset.noteId;
        const updatedNote = {
            id: selectedNoteId,
            title,
            body
        };
        NotesAPI.saveNote(updatedNote);
        const notes = NotesAPI.getAllNotes();
        notesView.updateNoteList(notes);
    },
    onNoteDelete: id => {
        NotesAPI.deleteNote(id);
        const notes = NotesAPI.getAllNotes();
        notesView.updateNoteList(notes);
        notesView.updateActiveNote({
            title: "",
            body: ""
        });
        root.querySelector(".notes__delete").style.display = "none"; // Hide the delete button after deleting the note
    }
});

const notes = NotesAPI.getAllNotes();
notesView.updateNoteList(notes);
