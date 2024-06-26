// TODO: Building the functionality for the Note app

/*************************************************************************
 *! CREATE Note Popup Logic
 **************************************************************************/
 function popup(){
    // STEP ONE: create a new div container that will contain the popup.
    const popupContainer = document.createElement("div");
    popupContainer.innerHTML = `
        <div id= "popupContainer">
            <h1>New Note</h1>
            <textarea id="note-text" placeholder="Enter your note..."></textarea>
            <div id="btn-container">
                <button id="submitBtn" onclick="createNote()">Create Note</button>
                <button id="closeBtn" onclick="closePopup()">Close</button>
            </div>
        </div>
    `;
    // STEP TWO: append the document to the body of the document.
    document.body.appendChild(popupContainer);

    // Add event listener to textarea for 'keypress' event
    const noteTextarea = document.getElementById('note-text');
    noteTextarea.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            createNote();
        }
    });
}

// ? Close the pop up
function closePopup(){
    // get the popup container
    const popupContainer = document.getElementById("popupContainer");
    // logic to remove the popupcontainer
    if(popupContainer){
        popupContainer.remove();
    }
}

function createNote(){
    // Get reference to the container and the note value
    const popupContainer = document.getElementById('popupContainer');
    const noteText = document.getElementById('note-text').value;
    let note; // Declare note outside if block
    // Creating a new note
    if(noteText.trim() !== ''){
        note = {
            id: new Date().getTime(),
            text:noteText
        };
    }

    // retrieving existing notes from localStorage
    const existingNotes = JSON.parse(localStorage.getItem('notes') ) || [];
    // adding note to localstorage
    if (note) { // Ensure note is defined before pushing
        existingNotes.push(note);
    }
    // saving the updated  notes in localstorage 
    localStorage.setItem('notes', JSON.stringify(existingNotes));
    // clear the note text
    document.getElementById('note-text').value = '';
    
    popupContainer.remove();
    displayNotes();
}

/*************************************************************************
 * !DISPLAY Notes Logic
 **************************************************************************/

function displayNotes(){
    // get any existing notes from the list
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    // retrieve any EXISTING notes from localstorage
    const notes = JSON.parse(localStorage.getItem('notes') || [])
                        .filter(note => note !== null);

    // Iterate for each note to create a Li for each note
    notes.forEach(note => {
        const listItem = document.createElement('li');  
        listItem.innerHTML =`
            <span>${note.text}</span>
            <div id="noteBtns-container">
                <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
                <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        notesList.appendChild(listItem);
    });
}

/*************************************************************************
 * !EDIT Note Popup Logic
 **************************************************************************/

function editNote(noteId){
    // retrieving existing notes from localstorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    // get the note by existing id
    const noteToEdit = notes.find( note => note.id === noteId);
    // grab the exisiting note text
    const noteText = noteToEdit ? noteToEdit.text: '';
    // new html element to hold the popup content
    const editingPopup = document.createElement("div");

    // Creating the HMTL element 
    editingPopup.innerHTML = `
        <div id="editing-container" data-note-id="${noteId}">
            <h1>Edit Note</h1>
            <textarea id="edit-note-text">${noteText}</textarea>
            <div id="btn-container">
                <button id="submitBtn" onclick="updateNote()">Done</button>
                <button id="closeBtn" onclick="closeEditPopUp()">Cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(editingPopup);

    // Add event listener to textarea for 'keypress' event
    const editNoteTextarea = document.getElementById('edit-note-text');
    editNoteTextarea.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            updateNote();
        }
    });
}

// TODO: create closeEditPopUp and updateNote Functions(DONE)

function closeEditPopUp(){
    //    ?grab the editPopUp container 
    const editingPopup = document.getElementById("editing-container");

    // ?remove the editing popup container 
    if(editingPopup){
        editingPopup.remove();
    }
}

function updateNote(){
    // ?grab the updated note from textarea
    const noteText = document.getElementById('edit-note-text').value.trim();
    // ?grab the editingPopup container by its Id
    const editingPopup = document.getElementById('editing-container');

    // ?checking if the updated noteText is not  empty
    if(noteText !== '' ){
        const noteId = editingPopup.getAttribute('data-note-id');
        //  retrieve existing notes from Local Storage.
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        //? Find the note to update
        const updatedNotes = notes.map(note => {
            if (note.id == noteId) {
                return { id: note.id, text: noteText };
            }
            return note;
        });

        // ?Update the notes in local storage
        localStorage.setItem('notes', JSON.stringify(updatedNotes));

        // ?Close the editing popup
        editingPopup.remove();

        // ?Refresh the displayed notes
        displayNotes();
    }
}

/*************************************************************************
 * !DELETE Note Logic
 **************************************************************************/
function deleteNote(noteId){
    // STEP ONE: retrieve note from local storage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // STEP TWO: filter the note from display with specified ID
    notes = notes.filter( note => note.id !== noteId);

    // STEP THREE: save the updated notes to local storage
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// ? Final step: Call displayNotes function outside all the functions

displayNotes();
