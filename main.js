var lastIdNum = 5,
  editNode = null;
function allowDrop(ev) {
  ev.preventDefault();
}
function dragStart(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
}
function dropIt(ev) {
  ev.preventDefault(); // default is not to allow drop
  let sourceId = ev.dataTransfer.getData("text/plain");
  let sourceIdEl = document.getElementById(sourceId);
  let sourceIdParentEl = sourceIdEl.parentElement;
  let targetEl = document.getElementById(ev.target.id);
  let targetParentEl = targetEl.parentElement;

  if (targetParentEl.id !== sourceIdParentEl.id) {
    if (
      targetEl.className === sourceIdEl.className ||
      targetEl.className === "list-title"
    ) {
      targetParentEl.appendChild(sourceIdEl);
    } else {
      targetEl.appendChild(sourceIdEl);
    }
  } else {
    if (targetEl.className !== "list-title") {
      let holder = targetEl;
      let holderText = holder.textContent;
      targetEl.textContent = sourceIdEl.textContent;
      sourceIdEl.textContent = holderText;
      holderText = "";
    }
  }
}
function validateTitle() {
  let title = document.getElementById("taskTitle");
  if (/^[a-zA-Z0-9 ]{2,26}$/.test(title.value)) {
    title.parentElement.classList.remove("has-error");
    return true;
  } else {
    title.parentElement.classList.add("has-error");
    console.log("err");
    return false;
  }
}
function createTask(edit = false, node = null) {
  let title = document.getElementById("taskTitle");
  let targetEl = document.getElementById("list1");
  console.log(editNode);
  if (editNode && validateTitle()) {
    editNode.innerHTML =
      title.value +
      '<i class="fas fa-trash pull-right" onclick="deleteTask(this)"></i><i class="fas fa-edit pull-right" onclick="createTask(true,this)" ></i>';
    editNode = null;
    $("#createModal").modal("toggle");
    return;
  }
  if (edit && node) {
    title.value =
      node.parentElement.textContent.trim() ||
      node.parentElement.innerText.trim() ||
      "";
    editNode = node.parentElement;
    $("#createModal").modal("toggle");
    return;
  }
  if (validateTitle()) {
    lastIdNum++;
    let cardContent =
      '<div id="card' +
      lastIdNum +
      '" class="card" draggable="true" ondragstart="dragStart(event)" >' +
      title.value +
      '<i class="fas fa-trash pull-right" onclick="deleteTask(this)"></i><i class="fas fa-edit pull-right" onclick="createTask(true,this)" ></i>' +
      "</div>";
    targetEl.innerHTML = targetEl.innerHTML + cardContent;
    title.value = "";
  }
}
function deleteTask(txt) {
  console.log(txt.parentElement);
  let r = confirm("Are you sure to delete?");
  if (r == true) {
    txt.parentElement.outerHTML = "";
  }
}
