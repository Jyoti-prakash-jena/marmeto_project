
function populateCartTable(cartData) {
    const tbody = document.querySelector('.cart-table tbody');
    tbody.innerHTML = ''; 

    cartData.items.forEach(item => {
        const tr = document.createElement('tr');

        const productCell = document.createElement('td');
        productCell.innerHTML = `
            <img src="${item.featured_image.url}" alt="${item.title}" style="width: 50px; height: auto; vertical-align: middle; margin-right: 10px;">
            ${item.title}
        `;
        tr.appendChild(productCell);

     
        const priceCell = document.createElement('td');
        priceCell.textContent = `Rs. ${(item.presentment_price / 100).toLocaleString()}`;
        tr.appendChild(priceCell);


        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        tr.appendChild(quantityCell);

 
        const subtotalCell = document.createElement('td');
        subtotalCell.textContent = `Rs. ${(item.line_price / 100).toLocaleString()}`;
        tr.appendChild(subtotalCell);

        const deleteCell = document.createElement('td');
        deleteCell.innerHTML = `<button onclick="removeItem(${item.id})">Remove</button>`;
        tr.appendChild(deleteCell);

        tbody.appendChild(tr);
    });
}

function removeItem(itemId) {
    const itemIndex = cartData.items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
       
        cartData.items.splice(itemIndex, 1);

      
        const row = document.querySelector(`.cart-table tbody tr:nth-child(${itemIndex + 1})`);
        row.remove();

     
        updateCartTotals(cartData.items);
    }
}

function fetchCartData() {
    const url = 'https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            populateCartTable(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const cartData = {
      "original_total_price": 250000,
      "items": [
        {
          "id": 49839206859071,
          "quantity": 1,
          "variant_id": 49839206859071,
          "title": "Asgaard sofa",
          "price": 25000000,
          "original_price": 25000000,
          "presentment_price": 250000,
          "discounted_price": 20000000,
          "line_price": 20000000,
          "original_line_price": 25000000,
          "total_discount": 5000000,
          "final_price": 25000000,
          "final_line_price": 25000000,
          "featured_image": {
            "url": "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481"
          }
        }
      ]
    };
    populateCartTable(cartData);
});
