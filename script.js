const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = document.getElementById("descriptionText"),
addBtn = popupBox.querySelector(".add-note-btn");

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.body.style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    resetPopup();
});

function resetPopup() {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.body.style.overflow = "auto";
}

function showNotes() {
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description.replaceAll("\n", '<br/>')}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', \`${note.description}\`)"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName !== "I" || e.target !== elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    if(confirm("Are you sure you want to delete this note?")) {
        notes.splice(noteId, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
    }
}

function updateNote(noteId, title, description) {
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description.replaceAll('<br/>', '\n');
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
}

addBtn.addEventListener("click", () => {
    let title = titleTag.value.trim(),
    description = descTag.value.trim();

    if(title || description) {
        let currentDate = new Date(),
        noteInfo = {
            title,
            description,
            date: `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
        };
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            notes[updateId] = noteInfo;
            isUpdate = false;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        resetPopup();
    }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.classList.replace('uil-moon', 'uil-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.classList.replace(isDark ? 'uil-moon' : 'uil-sun', isDark ? 'uil-sun' : 'uil-moon');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
});



