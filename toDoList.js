
//#region // sahip olunmasi gereken elementler
var input = document.getElementById("task");
var button = document.getElementById("liveToastBtn");
var ullist = document.getElementById("list");
//#endregion

//  <li> elamani silmek icin button yaratir
function createlittlebutton(li) {
    var spanText = document.createElement("span");
    spanText.textContent = li.textContent;

    // <li> öğesini temizle
    li.innerHTML = "";

    // <span> öğesini <li> öğesine ekle
    li.appendChild(spanText);

    // <li> öğesine kapatma düğmesi ekle
    var cancelButton = document.createElement("button");
    li.appendChild(cancelButton);
    cancelButton.className = "close";
    cancelButton.textContent = "x";

    // Kapatma düğmesine tıklama olayı ekle (closeElement fonksiyonunu çağır)
    cancelButton.addEventListener("click", closeElement);
}

function newElement() {
    var text = input.value.trim();

    if (text !== "") {
        // Yeni <li> öğesi oluştur
        var newli = document.createElement("li");
        newli.innerHTML = text;
        ullist.appendChild(newli);

        // <li> öğesine kapatma düğmesi ekle
        createlittlebutton(newli);

        // Giriş alanını temizle
        input.value = "";

        // Yeni <li> öğesine tıklama olayı ekle (checked durumunu değiştir)
        newli.addEventListener("click", toggleto);

        // Yeni öğeyi local storage'a kaydet
        saveToLocalStorage();
    }
}
// Local storage'a todo list öğelerini kaydet
function saveToLocalStorage() {

    // Local storage'a todo list öğelerini kaydet
    var todos = Array.from(ullist.children).map(element => ({
        text: element.querySelector("span").textContent,
        checked: element.classList.contains("checked")

    }));

    localStorage.setItem("todos", JSON.stringify(todos));
} function toggleto() {
    this.classList.toggle("checked")
    saveToLocalStorage();
}

function loadFromLocalStorage() {
    // Local storage'dan todo list öğelerini yükle
    var todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Todo list öğelerini oluştur ve ekle
    todos.forEach(todo => {

        var newli = document.createElement("li");
        newli.innerHTML = todo.text;

        newli.addEventListener("click", toggleto);
        if (todo.checked) {

            newli.classList.add("checked");
        }
        ullist.appendChild(newli);
        createlittlebutton(newli);
    });
}

function closeElement(event) {
    var listItem = event.currentTarget.parentNode;
    listItem.remove();

    // Öğe kapatıldığında local storage'ı güncelle
    saveToLocalStorage();
}

// Sayfa yüklendiğinde local storage'dan önceki todo list öğelerini yükle
loadFromLocalStorage();
