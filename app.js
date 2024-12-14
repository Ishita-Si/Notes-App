// Select necessary DOM elements
const addNoteInput = document.querySelector(".addNote");
const addButton = document.querySelector(".btn-dark");
const notesContainer = document.querySelector(".notes-container");

// Retrieve stored notes from localStorage
let notes = JSON.parse(localStorage.getItem("addedNotes")) || [];

// Function to generate a unique ID
function generateId() {
  return Math.floor(Math.random()*100000000)
}

// Function to save notes to localStorage
function updateLocalStorage() {
  localStorage.setItem("addedNotes", JSON.stringify(notes));
}

// Function to add a note to the DOM
function addNoteToDOM(note) {
  const noteRow = document.createElement("div");
  noteRow.classList.add("row", "note");
  noteRow.dataset.id = note.id; // Add data-id to identify the note

  noteRow.innerHTML = `
    <div class="col col-8 notes-box">
      <p>Added on: ${note.addedOn}</p>
      <p></br>${note.content}</p>
    </div>
    <div class="col col-4">
      <button type="button" class="btn btn-secondary delete-button">Delete</button>
    </div>
  `;

  notesContainer.appendChild(noteRow);
}

// Function to render all notes
function renderNotes() {
  notesContainer.innerHTML = ""; // Clear container
  notes.forEach(note => addNoteToDOM(note));
}

// Event listener for adding a new note
addButton.addEventListener("click", () => {
  const noteContent = addNoteInput.value.trim();
  if (noteContent === "") {
    alert("Please enter a note!");
    return;
  }

  const newNote = {
    id: generateId(),
    content: noteContent,
    addedOn: new Date().toLocaleString(),
  };

  notes.push(newNote);
  addNoteToDOM(newNote);
  updateLocalStorage();
  addNoteInput.value = ""; // Clear input
});

// Event delegation for deleting a note
notesContainer.addEventListener("click", (e) => {
  // Check if the clicked element is a delete button
  if (e.target.classList.contains("delete-button")) {
    const noteRow = e.target.closest(".note");
    const noteId = noteRow.dataset.id;
    

    // Remove the note from the notes array
    notes = notes.filter(note => note.id !== noteId);

    // Update localStorage
    updateLocalStorage();

    // Remove the note from the DOM
    noteRow.remove();
   
  }
});

// Initial render of stored notes
renderNotes();
