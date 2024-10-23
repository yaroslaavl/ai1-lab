let originalItems = JSON.parse(localStorage.getItem('savedItems')) || [];
let listContainer = document.getElementById('task-list');
let searchInput = document.getElementById('searchText');
let addButton = document.getElementById('submit');

searchInput.addEventListener('input', wyszukiwanie);
addButton.addEventListener('click', dodajElement);

originalItems.forEach(item => addTaskToList(item.text, item.date));

function createTaskElement(text, date) {
  let listItem = document.createElement('li');
  listItem.classList.add("task-item");

  let textElement = document.createElement('span');
  textElement.textContent = text;
  textElement.contentEditable = "true";
  textElement.addEventListener('blur', function() {
    let index = Array.from(listContainer.children).indexOf(listItem);
    originalItems[index].text = textElement.textContent;
    localStorage.setItem('savedItems', JSON.stringify(originalItems));
  });

  let dateElement = document.createElement('input');
  dateElement.type = 'date';
  dateElement.value = date || '';
  dateElement.addEventListener('change', function() {
    let index = Array.from(listContainer.children).indexOf(listItem);
    originalItems[index].date = dateElement.value;
    localStorage.setItem('savedItems', JSON.stringify(originalItems));
  });
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete';
  deleteButton.addEventListener('click', function() {
    let index = Array.from(listContainer.children).indexOf(listItem);
    originalItems.splice(index, 1);
    localStorage.setItem('savedItems', JSON.stringify(originalItems));
    listItem.remove();
  });

  listItem.appendChild(textElement);
  listItem.appendChild(dateElement);
  listItem.appendChild(deleteButton);
  return listItem;
}
function addTaskToList(text, date) {
  let listItem = createTaskElement(text, date);
  listContainer.appendChild(listItem);
}
function validateTask(text, date) {
  if (text.length < 3 || text.length > 255) {
    alert("Must be between 3 and 255 characters.");
    return false;
  }
  if (date && new Date(date) <= new Date()) {
    alert("Date must be in the future or empty.");
    return false;
  }
  return true;
}

function dodajElement() {
  let inputText = document.getElementById('task-input').value.trim();
  let inputDate = document.getElementById('task-date').value;

  if (!validateTask(inputText, inputDate)) return;
  originalItems.push({ text: inputText, date: inputDate });
  localStorage.setItem('savedItems', JSON.stringify(originalItems));

  addTaskToList(inputText, inputDate);
  document.getElementById('task-input').value = '';
  document.getElementById('task-date').value = '';
}

function wyszukiwanie() {
  let searchVal = this.value.trim().toLowerCase();
  if (searchVal.length < 2) {
    listContainer.innerHTML = '';
    originalItems.forEach(item => addTaskToList(item.text, item.date));
    return;
  }

  let filteredItems = originalItems.filter(item => item.text.toLowerCase().includes(searchVal));

  listContainer.innerHTML = '';

  if (filteredItems.length > 0) {
    filteredItems.forEach(item => {
      let listItem = createTaskElement(item.text, item.date);
      let regex = new RegExp(`(${searchVal})`, "gi");
      listItem.querySelector('span').innerHTML = item.text.replace(regex, "<span class='search-result'>$1</span>");
      listContainer.appendChild(listItem);
    });
  } else {
    originalItems.forEach(item => addTaskToList(item.text, item.date));
  }
}
