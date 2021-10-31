// Task 13 - Compulsory task 1
// Declare variables //

// Create empty array to store music objects (artist name, surname, song title etc)
let musicArray = []; 
let message;

// ------------------------------

// Create constructor function to add music info to objects more easily later
function musicObj(fname, surname, song, album, genre) {
    this.artist = {
        fname: fname,
        surname: surname
    };
    this.song = song;
    this.album = album;
    this.genre = genre;
}

// Take user entered info from form and store in object and in sessionStorage to be displayed on page by 
// "displayMusic()" function
function addMusic() {
    // Use contructor function "musicObj()" to add values from form
    let newMusic = new musicObj(
        document.getElementById("artistFName").value,
        document.getElementById("artistSurname").value,
        document.getElementById("songTitle").value,
        document.getElementById("albumName").value,
        document.getElementById("genreName").value
    );
        
    // Add object to array of objects
    musicArray.push(newMusic);
    sessionStorage.setItem("firstTimeRunning", true);
    // Update sessionStorage with updated array
    sessionStorage.setItem("musicObjects", JSON.stringify(musicArray));
    // Call function to display new music entry on page along with others (if they exist)
    displayMusic();

// End of addMusic() function
}

// Function to display contents of array of objects (info pulled from sessionStorage)
function displayMusic() {
    // Declare variables
    let createDiv = document.createElement("div");
    let selectParentDiv = document.getElementById("displayMusic");
    let selectFormDiv = document.getElementById("formToEdit");

    /* Hide form to delete/edit music entries by default. Will make visible later depending on outcome of 
    if statement which determines whether there are any stored entries or not*/
    selectFormDiv.style.visibility = "hidden";
    
    /* If no info in sessionStorage, display message to say "nothing captured yet". I struggled with this, as I was
    trying to say "if (musicArray == null)" but it never seemed to work. I thought I found the answer at 
    this website (using array.length == 0): 
    https://www.freecodecamp.org/news/check-if-javascript-array-is-empty-or-not-with-length/ , but that didn't work
    either. Eventually, I used the method from the example - personObjectEG2.js */

    console.log("Value of firsttimerunning is: " + sessionStorage.getItem("firstTimeRunning"));

    if (sessionStorage.getItem("firstTimeRunning") == null || 
        sessionStorage.getItem("firstTimeRunning") == false) { 
        
        sessionStorage.setItem("musicObjects", JSON.stringify(musicArray));

        // Write message to say no music has been captured yet
        createDiv.innerHTML = "No music information has been captured yet. Try using the form on the left to store some. ";

        // Nice red box around message
        createDiv.style.border = "red 1px solid";
        
        // Add message div to parent element and add line break for neatness
        selectParentDiv.appendChild(createDiv);

    /* However, if there is already info in sessionStorage, write contents of sessionStorage to "musicArray",
    and write each object to the page with a nice black border around every track's info. */
    } else { 
        // write info in sessionStorage to array
        musicArray = JSON.parse(sessionStorage.getItem("musicObjects"));

        // Make form to edit/delete entries visible, since we know entries do exist in sessionStorage
        selectFormDiv.style.visibility = "visible";

        // Call function to create dropdown list of artist's names (used to select which to edit or delete)
        createDropdown();

        // For each loop to loop through array and write each entry's info to page in a div with black border
        musicArray.forEach(function(theMusic) {
            // Declare variables
            let createDiv = document.createElement("div");
            let selectParentDiv = document.getElementById("displayMusic");

            // Write contents of object in sentence
            createDiv.innerHTML = theMusic.artist.fname + " " + theMusic.artist.surname + " plays a song called '" + theMusic.song + "' from the album '" + theMusic.album + "', which is of the genre '" + theMusic.genre + "'.";

            createDiv.style.border = "black 1px solid";
            selectParentDiv.appendChild(createDiv);

        // End of for each loop
        }); 

    // End of if statement to check if sessionStorage is empty or not
    } 

// displayMusic() function ends
}

/* Function to create a dropdown list with the first name of each "artist" in object array. This will be 
for the user to select a music entry to either delete, or edit/change. */
function createDropdown() {
    // Declare counter variable
    let i = 0;    

    // Write objects from sessionStorage to array
    musicArray = JSON.parse(sessionStorage.getItem("musicObjects"));

    /* For each loop used to loop through array and create an option element for each artist, using artist's
     first name as the contents of each dropdown option */
    musicArray.forEach(function(theMusic) {
        let chooseSelectElement = document.getElementById("artistToChange");
        let makeOption = document.createElement("option");

        // Add "option" element to dropdown with artist's first name as content
        makeOption.innerHTML = theMusic.artist.fname;
        // give each option element a value to make it easier to reference them later
        makeOption.value = i;
        // increment the option value for each new option element in dropdown (0, 1, 2 etc)
        i = i + 1;
        // Add each option element to the parent "select" element
        chooseSelectElement.appendChild(makeOption);

    // For each loop ends
    });
                
// createDropdown() function ends
}

/* This function is called when the user selects an option from the dropdown menu created in "createDropdown()"
function (see "onchange" command in html file). It lets the user decide if they want to delete an entry or change 
it. They can do this by clicking the appropriate button. */

// It is passed a value from the particular option selected from the dropdown menu (0,1,2 etc). The value 
// provides a reference to the specific option they selected.
function selectArtistToEdit(indexOfMusicObj) {

    // Declare variables
    let selectEditOrDeleteDiv = document.getElementById("editOrDeleteMsg");
    let createPara = document.createElement("p");

    let createDeleteButton = document.createElement("button");
    let createEditButton = document.createElement("button");

    // ---------------------------

    // Create message asking user to delete or edit entry, along with delete and edit buttons underneath
    createPara.innerHTML = "Delete or edit entry for '" + musicArray[indexOfMusicObj].artist.fname 
    + " " + musicArray[indexOfMusicObj].artist.surname + "' ?";

    /* If clicked, this delete button calls the "deleteTrack()" function and passes it the index from the dropdown
    list for that particular option. */
    createDeleteButton.innerHTML = "Delete";
    createDeleteButton.type = "button";

    // Use bootstrap to style buttons
    createDeleteButton.className = "btn btn-primary mr-1";
    createDeleteButton.addEventListener("click", function() {deleteTrack(indexOfMusicObj); } );

    /* If clicked, this edit button calls the "editTrack()" function and passes it the index from the dropdown
    list for that particular option. */
    createEditButton.innerHTML = "Edit";
    createEditButton.type = "button";
    
    // Bootstrap to style button
    createEditButton.className = "btn btn-primary mr-1";
    createEditButton.addEventListener("click", function() {editTrack(indexOfMusicObj); } );
    
    // Append/add message and buttons to parent div
    selectEditOrDeleteDiv.appendChild(createPara);
    selectEditOrDeleteDiv.appendChild(createDeleteButton);
    selectEditOrDeleteDiv.appendChild(createEditButton);

// End of "selectArtistToEdit()" function
} 

/* Function creates alert message to let user know they've successfully deleted the entry and then removes it from  the array with "splice()" and updates session storage. Lastly, reloads the page to update the list of entries.
I looked up how to do this and found the answer on this page:
https://www.w3schools.com/jsref/met_loc_reload.asp */

function deleteTrack(index) {
    alert("Entry for '" + musicArray[index].artist.fname + " " + musicArray[index].artist.surname + "' deleted.");
    musicArray.splice(index, 1);
    sessionStorage.setItem("musicObjects", JSON.stringify(musicArray));

    if (musicArray.length == undefined || musicArray.length == 0) {
        sessionStorage.setItem("firstTimeRunning", false);
    }
    
    location.reload();
}

/* This function is called when the user clicks the "Edit" button. It lets the user edit the contents of any field 
of the specific track entry selected (object) from the dropdown list before. It is passed the "index" of the
item selected from the dropdown list and the index is used in the function to refer to the specific object value
we want to use or display. */

function editTrack(index) {
    // Declare variables ------------------------------------------------
    let selectEditOptionsDiv = document.getElementById("editOptionsDiv");

    // Div, label and input element for every track value (name, surname, song title etc)
    let createDivFName = document.createElement("div");
    let createLabelName = document.createElement("label");
    let createInputName = document.createElement("input");

    let createDivSurname = document.createElement("div");
    let createLabelSurname = document.createElement("label");
    let createInputSurname = document.createElement("input");

    let createDivSong = document.createElement("div");
    let createLabelSong = document.createElement("label");
    let createInputSong = document.createElement("input");

    let createDivAlbum = document.createElement("div");
    let createLabelAlbum = document.createElement("label");
    let createInputAlbum = document.createElement("input");

    let createDivGenre = document.createElement("div");
    let createLabelGenre = document.createElement("label");
    let createInputGenre = document.createElement("input");

    let createUpdateButton = document.createElement('button');

    // -------------------------------------------------------------- //

    /* Create label and text input element for every track value. Class names specified so as to use Bootstrap 
    styles for the form items. "index" used to pull specific value from array. I referred to the Bootstrap
    website a great deal to create this section - https://getbootstrap.com/docs/4.1/components/forms/ */

    createLabelName.innerHTML = "Change artist's first name from '" + musicArray[index].artist.fname + "' to: ";
    createLabelName.for = "artistFNameInput";
    createInputName.type = "text";
    createInputName.id = "artistFNameInput";
    createInputName.className = "form-control";
    createInputName.placeholder = "..."; 
    createDivFName.className = "form-group";

    createLabelSurname.innerHTML = "Change artist's surname from '" + musicArray[index].artist.surname 
    + "' to: ";
    createLabelSurname.for = "artistSurnameInput";
    createInputSurname.type = "text";
    createInputSurname.id = "artistSurnameInput";
    createInputSurname.className = "form-control";
    createInputSurname.placeholder = "..."; 
    createDivSurname.className = "form-group";

    createLabelSong.innerHTML = "Change song title from '" + musicArray[index].song 
    + "' to: ";
    createLabelSong.for = "songInput";
    createInputSong.type = "text";
    createInputSong.id = "songInput";
    createInputSong.className = "form-control";
    createInputSong.placeholder = "..."; 
    createDivSong.className = "form-group";

    createLabelAlbum.innerHTML = "Change album title from '" + musicArray[index].album
    + "' to: ";
    createLabelAlbum.for = "albumInput";
    createInputAlbum.type = "text";
    createInputAlbum.id = "albumInput";
    createInputAlbum.className = "form-control";
    createInputAlbum.placeholder = "..."; 
    createDivAlbum.className = "form-group";

    createLabelGenre.innerHTML = "Change song genre from '" + musicArray[index].genre
    + "' to: ";
    createLabelGenre.for = "genreInput";
    createInputGenre.type = "text";
    createInputGenre.id = "genreInput";
    createInputGenre.className = "form-control";
    createInputGenre.placeholder = "..."; 
    createDivGenre.className = "form-group";

    /* Create "update" button and add event listener. When clicked, it calls an unnamed function that uses 
    a few if statements to check if the user entered anything into each text input box and if not, it skips that
    input and moves to the next one. This is so that an empty value does not replace an existing value in the 
    object. */
    createUpdateButton.innerHTML = "Update";
    createUpdateButton.type = "button";
    createUpdateButton.className = "btn btn-primary mr-1";
    createUpdateButton.addEventListener("click", function() {

        // Get values from text input fields in form and assign to variables
        let updatedFName = document.getElementById("artistFNameInput").value;
        let updatedSurname = document.getElementById("artistSurnameInput").value;
        let updatedSong = document.getElementById("songInput").value;
        let updatedAlbum = document.getElementById("albumInput").value;
        let updatedGenre = document.getElementById("genreInput").value;
        // --------------------------------------------------------------

        /* if statements to check whether or not input fields are empty. If not empty, add new value to object
         in musicArray */
        if (updatedFName != "") { 
            musicArray[index].artist.fname = updatedFName;
        }

        if (updatedSurname != "") {
            musicArray[index].artist.surname = updatedSurname;
        }
        
        if (updatedSong != "") {
            musicArray[index].song = updatedSong;
        }

        if (updatedAlbum != "") {
            musicArray[index].album = updatedAlbum;
        }

        if (updatedGenre != "") {
            musicArray[index].genre = updatedGenre;
        }
        // -------------------------------------------------------------

        // Update session storage with updated array of objects
        sessionStorage.setItem("musicObjects", JSON.stringify(musicArray));
        // Reload page to update list of track entries on page with new values
        location.reload();
    // End of update function triggered by clicking on update button
    });

    // Add divs, labels and input text boxes to parent divs
    selectEditOptionsDiv.appendChild(createDivFName);
    createDivFName.appendChild(createLabelName);
    createDivFName.appendChild(createInputName);

    selectEditOptionsDiv.appendChild(createDivSurname);
    createDivSurname.appendChild(createLabelSurname);
    createDivSurname.appendChild(createInputSurname);

    selectEditOptionsDiv.appendChild(createDivSong);
    createDivSong.appendChild(createLabelSong);
    createDivSong.appendChild(createInputSong);

    selectEditOptionsDiv.appendChild(createDivAlbum);
    createDivAlbum.appendChild(createLabelAlbum);
    createDivAlbum.appendChild(createInputAlbum);

    selectEditOptionsDiv.appendChild(createDivGenre);
    createDivGenre.appendChild(createLabelGenre);
    createDivGenre.appendChild(createInputGenre);
  
    // Add update button to parent div and add padding and red border around all form elements
    selectEditOptionsDiv.appendChild(createUpdateButton);
    selectEditOptionsDiv.style.border = "2px #ffa0b7 solid";
    selectEditOptionsDiv.style.padding = "8px";
    
}