$(".nav").append(`
    <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Buscar</button>
    </form>
`);





const clickButton = document.querySelectorAll('.btn');
const tbody = document.querySelector('.tbody')
let carrito = [];

clickButton.forEach(button => {
    button.addEventListener('click', addToCartItem);
});

function addToCartItem(e) {
   const btn = e.target;
   const item = btn.closest('.card');
   const itemTitle = item.querySelector('.card-title').textContent;
   const itemPrice = item.querySelector('.price').textContent;
   const itemImg = item.querySelector('.card-img-top').src;

   const newItem = {
       title: itemTitle,
       price: itemPrice,
       img: itemImg,
       cantidad: 1
   }

   addItemCarrito(newItem);
}


function addItemCarrito(newItem){

    const alert = document.querySelector(".alert")

    setTimeout(function(){
        alert.classList.add('hide');
    }, 2000)
        alert.classList.remove('hide');

    const inputProduct = tbody.getElementsByClassName('input__product')
    
    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            const inputValue = inputProduct[i];
            inputValue.value++;
            carritoTotal();
            return null;
        }
    }

    carrito.push(newItem);
    
    renderCarrito();

}
        
        
    

function renderCarrito(){
    
    tbody.innerHTML = '';
    carrito.map(item => {
        const tr = document.createElement('tr');
        tr.classList.add('itemCarrito'); 
        const content = `
        
        <tr>
            <th scope="row">1</th>
            <td class="table__producto">
                <img src=${item.img} alt="">
                <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price">
                <p>${item.price}</p>
            </td>
            <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__product">
                <button class="delete btn btn-danger">X</button>
            </td>
        </tr>        
        
        `
        tr.innerHTML = content;
        tbody.append(tr);
        
        tr.querySelector(".delete").addEventListener('click', removeItemCarrito);
        tr.querySelector(".input__product").addEventListener('change', sumaCantidad);
    
    })
    
    carritoTotal()

}


function carritoTotal(){
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal');
    carrito.forEach((item) => {
        const precio = Number(item.price.replace("$", '')); 
        total = total + precio * item.cantidad;
    })

    itemCartTotal.innerHTML = `Total $${total}`;
    addToLocalStorage();
}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".itemCarrito");
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i<carrito.length; i++){

        if (carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)
        }
    }

    
    const alert = document.querySelector(".remove")

    setTimeout(function(){
        alert.classList.add('remove');
    }, 2000)
        alert.classList.remove('remove');


    tr.remove();
    carritoTotal();
}

function sumaCantidad(e){
    const sumaInput = e.target;
    const tr = sumaInput.closest(".itemCarrito");
    const title = tr.querySelector(".title").textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal();
        }
    })
}


function addToLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem("carrito"));
    if(storage){
        carrito = storage;
        renderCarrito();
    }
}



