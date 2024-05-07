// script.js

// Get elements
const addNoteButton = document.querySelector('.notes__add');
const titleInput = document.querySelector('.notes__title');
const bodyTextarea = document.querySelector('.notes__body');
const notesList = document.querySelector('.notes__list');

// Load notes from local storage
document.addEventListener('DOMContentLoaded', () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => addNoteToList(note.title, note.body));
});

// Add note
addNoteButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const body = bodyTextarea.value.trim();

    if (title !== '' && body !== '') {
        addNoteToList(title, body);
        saveNotesToLocalStorage(title, body);
        titleInput.value = '';
        bodyTextarea.value = '';
    } else {
        alert('Please enter a title and a note body.');
    }
});

// Add note to the list
function addNoteToList(title, body) {
    const listItem = document.createElement('div');
    listItem.classList.add('notes__list-item');
    listItem.innerHTML = `
        <div class="notes__small-title">${title}</div>
        <div class="notes__small-body">${body}</div>
        <div class="notes__small-update">${getCurrentDateTime()}</div>
    `;
    notesList.appendChild(listItem);
}

// Save notes to local storage
function saveNotesToLocalStorage(title, body) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ title, body });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Get current date and time
function getCurrentDateTime() {
    const now = new Date();
    const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
    return now.toLocaleDateString('en-US', options);
}
