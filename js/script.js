document.addEventListener('DOMContentLoaded', function() {
    const itemInput = document.getElementById('itemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const itemList = document.getElementById('itemList');
    const clearListBtn = document.getElementById('clearListBtn');
    let shoppingList = [];

   
    if (localStorage.getItem('shoppingList')) {
        shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
        renderList();
    }

    addItemBtn.addEventListener('click', function() {
        const newItem = itemInput.value.trim();
        if (newItem !== '') {
            shoppingList.push({ name: newItem, purchased: false });
            saveList();
            renderList();
            itemInput.value = '';
        }
    });


    itemList.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            const index = e.target.dataset.index;
            shoppingList[index].purchased = !shoppingList[index].purchased;
            saveList();
            renderList();
        }
    });

    clearListBtn.addEventListener('click', function() {
        shoppingList = [];
        saveList();
        renderList();
    });



    function saveList() {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }

    function renderList() {
        itemList.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.dataset.index = index;
            if (item.purchased) {
                li.classList.add('purchased');
            }
            itemList.appendChild(li);
        });
    }
});
