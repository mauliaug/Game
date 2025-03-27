document.addEventListener("DOMContentLoaded", function () {
    const shopContainer = document.getElementById("shop-container");
    const playerMoneyDisplay = document.getElementById("player-money");

    let playerMoney = parseInt(localStorage.getItem("playerMoney")) || 1000; // Default uang 1000
    let ownedItems = JSON.parse(localStorage.getItem("ownedItems")) || [];

    const items = [
        { id: 1, name: "Potion", price: 100 },
        { id: 2, name: "Energy Drink", price: 200 },
        { id: 3, name: "Lucky Charm", price: 500 },
        { id: 4, name: "VIP Pass", price: 1000 },
        { id: 5, name: "Mystery Box", price: 1500 }
    ];

    // Update tampilan uang pemain
    function updateMoneyDisplay() {
        playerMoneyDisplay.textContent = `Uang: ${playerMoney}`;
        localStorage.setItem("playerMoney", playerMoney);
    }

    // Membeli item
    function buyItem(itemId) {
        const item = items.find(i => i.id === itemId);
        if (!item) return;

        if (playerMoney >= item.price) {
            playerMoney -= item.price;
            ownedItems.push(item);
            localStorage.setItem("ownedItems", JSON.stringify(ownedItems));
            updateMoneyDisplay();
            alert(`Berhasil membeli ${item.name}!`);
            renderShop();
        } else {
            alert("Uang tidak cukup!");
        }
    }

    // Menampilkan daftar item di shop
    function renderShop() {
        shopContainer.innerHTML = "";
        items.forEach(item => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("shop-item");
            itemElement.innerHTML = `
                <span>${item.name} - ${item.price}</span>
                <button onclick="buyItem(${item.id})">Beli</button>
            `;

            // Jika sudah dibeli, nonaktifkan tombol
            if (ownedItems.some(i => i.id === item.id)) {
                itemElement.querySelector("button").textContent = "Dibeli";
                itemElement.querySelector("button").disabled = true;
            }

            shopContainer.appendChild(itemElement);
        });
    }

    // Inisialisasi tampilan
    updateMoneyDisplay();
    renderShop();
});