let titleInput = document.getElementById("title");
let dateInput = document.getElementById("date");
let statusSelect = document.getElementById("status");
let prioritySelect = document.getElementById("priority");
let descInput = document.getElementById("description");
let submitInput = document.getElementById("submit");
let formation = document.getElementById("myForm");

let todoContainer = document.querySelector(".toDo");
let doingContainer = document.querySelector(".doing");
let doneContainer = document.querySelector(".done");

let array = [];
let editIndex = -1;

const openPopupButton = document.getElementById("openPopup");
const closePopupButton = document.getElementById("closePopup");
const popupForm = document.getElementById("popupForm");

openPopupButton.addEventListener("click", () => {
  popupForm.classList.remove("hidden");
  setTimeout(() => {
      popupForm.classList.remove("opacity-0", "scale-90");
      popupForm.classList.add("opacity-100", "scale-100");
  }, 10); 
});

closePopupButton.addEventListener("click", () => {
  popupForm.classList.remove("opacity-100", "scale-100");
  popupForm.classList.add("opacity-0", "scale-95");
  setTimeout(() => popupForm.classList.add("hidden"), 700);
});



formation.addEventListener("submit", function (event) {
    event.preventDefault();
    if (titleInput.value !== "" && dateInput.value !== "" && prioritySelect.value !== "" && statusSelect.value !== "" && descInput.value !== "") {
        if (editIndex > -1) {
            array[editIndex] = {
                title: titleInput.value,
                date: dateInput.value,
                status: statusSelect.value,
                priority: prioritySelect.value,
                desc: descInput.value
            };
            editIndex = -1;
            submitInput.value = "Add";
        } else {
            add_to_array(titleInput.value, dateInput.value, statusSelect.value, prioritySelect.value, descInput.value);
        }
        renderList();
        popupForm.classList.add("hidden");

    } else {
        alert("Complete the form!");
    }
});

function add_to_array(title, date, status, priority, desc) {
    let card_element = {
        title: title,
        date: date,
        status: status,
        priority: priority,
        desc: desc,
    };
    array.push(card_element);

    titleInput.value = "";
    dateInput.value = "";
    statusSelect.value = "";
    prioritySelect.value = "";
    descInput.value = "";
}

function renderList() {
    todoContainer.innerHTML = "";
    doingContainer.innerHTML = "";
    doneContainer.innerHTML = "";

    array.forEach((card_element, index) => {
        let div = document.createElement("div");
        div.classList.add('border', 'p-2', 'm-2', 'rounded');

        if (card_element.priority === "op1") {
            div.classList.add('border-l-4', 'border-red-500', 'bg-red-200');
        } else if (card_element.priority === "op2") {
            div.classList.add('border-l-4', 'border-yellow-500', 'bg-yellow-200');
        } else if (card_element.priority === "op3") {
            div.classList.add('border-l-4', 'border-green-500', 'bg-green-200');
        }

        div.innerHTML = `
        <h3 class="text-lg font-semibold">${card_element.title}</h3>
        <p class="text-sm text-black">Date: ${card_element.date}</p>
        <p class="text-sm text-black">Priority: ${card_element.priority}</p>
        <p class="text-sm text-black">Description: ${card_element.desc}</p>
        <button class="delete-btn bg-red-500 text-white p-1 rounded mt-2 mr-2 hover:bg-red-600">Delete</button>
        <button class="edit-btn bg-green-500 text-white p-1 rounded mt-2 mr-2 hover:bg-green-600">Edit</button>
        `;

        if (card_element.status === "toDo") {
            todoContainer.appendChild(div);
        } else if (card_element.status === "Doing") {
            doingContainer.appendChild(div);
        } else if (card_element.status === "Done") {
            doneContainer.appendChild(div);
        }
        div.querySelector(".delete-btn").addEventListener("click", () => {
            array.splice(index, 1);
            renderList();
        });

        div.querySelector(".edit-btn").addEventListener("click", () => {
            titleInput.value = card_element.title;
            dateInput.value = card_element.date;
            statusSelect.value = card_element.status;
            prioritySelect.value = card_element.priority;
            descInput.value = card_element.desc;

            editIndex = index;
            submitInput.value = "Save";
            popupForm.classList.remove("hidden");
        });
    });
}