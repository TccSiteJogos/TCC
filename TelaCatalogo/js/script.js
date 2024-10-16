let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showNextImage() {
  currentIndex = (currentIndex + 1) % totalItems;
  document.querySelector('.carousel').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Troca de imagem a cada 3 segundos
setInterval(showNextImage, 3000);





let cart = [];
let total = 0;

function addToCart(id, name, category, price, img) {
  // Verifica se o jogo já está no carrinho
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    alert(`${name} já está no carrinho.`);
    return;
  }

  // Adiciona o jogo ao carrinho
  const game = { id, name, category, price, img };
  cart.push(game);

  // Atualiza o total
  total += price;
  updateCart();
}

function removeFromCart(id) {
  // Encontra o item no carrinho e remove
  const itemIndex = cart.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    total -= cart[itemIndex].price; // Remove o preço do total
    cart.splice(itemIndex, 1); // Remove o item do array
  }
  
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  // Limpa os itens atuais
  cartItemsContainer.innerHTML = '';

  // Adiciona os itens novamente
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" width="50">
      <span>${item.name} - R$${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart('${item.id}')">Remover</button>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });

  // Atualiza o total
  cartTotalElement.textContent = total.toFixed(2);
}
