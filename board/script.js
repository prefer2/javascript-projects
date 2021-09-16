const writeBtn = document.getElementById('writeBtn');
const writeForm = document.getElementById('writeForm');
const overlay = document.getElementById('overlay');
const btnCloseModal = document.getElementById('closeModal');
let editBtn = document.querySelectorAll('#editBtn');
const deleteBtn = document.querySelectorAll('#deleteBtn');
const saveBtn = document.getElementById('saveBtn');
const readForm = document.getElementById('readForm');
const btnCloseRead = document.getElementById('closeRead');
let check = -1;

/* open modal to write new post */
const openModal = () => {
    writeForm.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = () => {
    writeForm.classList.add('hidden');
    overlay.classList.add('hidden');
    readForm.classList.add('hidden');
    resetForm();
};

const openRead = () => {
    readForm.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeRead = () => {
    overlay.classList.add('hidden');
    readForm.classList.add('hidden');
}

const createLi = (title, writer, text, i) => {
    const li = document.createElement("li");
    li.setAttribute('id','textItem');
    li.setAttribute('class',"text-item");
    
    li.innerHTML=`<div class="title" onclick="readPost(this)">${title}</div>
    <div class="writer">${writer}</div> <div class="text" hidden>${text}</div>`
    const btns = document.createElement("div");
    btns.innerHTML = `<button class="btn edit" id="editBtn" onClick="onEdit(this)">EDIT</button>
                    <button class="btn delete" id="deleteBtn" onClick="onDelete(this)">DELETE</button>`
    
    if(i!=-1){
        onDelete(i);
        check=-1;
    }
    li.appendChild(btns);
    document.getElementById('textList').appendChild(li);
}

const onDelete = (i) => {   
    document.getElementById('textList').removeChild(i.parentElement.parentElement);
}

const onEdit = (i) => {
    const li = i.parentElement.parentElement;
    document.getElementById('postTitle').value = li.children[0].textContent;
    document.getElementById('postWriter').value = li.children[1].textContent;
    document.getElementById('postText').value = li.children[2].textContent;

    check = i;
    openModal();
}

const savePost = () => {
    const title = document.getElementById('postTitle').value;
    const writer = document.getElementById('postWriter').value;
    const text = document.getElementById('postText').value;

    createLi(title, writer, text, check);
    closeModal();
}

const readPost = (i) => {
    document.getElementById('readTitle').textContent = i.parentElement.children[0].textContent;
    document.getElementById('readWriter').textContent = i.parentElement.children[1].textContent;
    document.getElementById('readText').textContent = i.parentElement.children[2].textContent;
    openRead();
    console.log(i.parentElement.children[2]);
}

const resetForm = () => {
    document.getElementById('postTitle').value = "";
    document.getElementById('postWriter').value = "";
    document.getElementById('postText').value = "";
}

writeBtn.addEventListener('click', openModal);


/* close modal (X button/overlay) */
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

btnCloseRead.addEventListener('click', closeRead);