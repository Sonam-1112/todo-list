let add = document.getElementById("add");
add.addEventListener("click", addItem);
addItem()

function addItem() {
    let tit = document.getElementById("title").value;
    let desc = document.getElementById("description").value;
    let itemJsonArray = [];
    if (!localStorage.getItem("itemsJson")) {
        itemJsonArray.push([tit, desc]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        if (tit != "" && desc != "")
            itemJsonArray.push([tit, desc]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }

    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += ` <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button id="delete" class="btn btn-sm btn-primary" onclick="deleteItem(${index})">Delete</button></td>
        </tr>`;
    });
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    tableBody.innerHTML = str;
}

function deleteItem(id) {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(id, 1);
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));

    addItem();
}

function clearList() {
    if (confirm("Do you really want to clear list??")) {
        localStorage.clear();
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        addItem();
        deleteItem(0);
    }
}