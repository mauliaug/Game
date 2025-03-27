document.addEventListener("DOMContentLoaded", function () {
    const eventPopup = document.getElementById("event-popup");

    // Daftar event acak
    const events = [
        { message: "🔥 Diskon besar-besaran di toko hari ini!", effect: "discount" },
        { message: "🎁 Kamu mendapat hadiah kejutan dari teman!", effect: "gift" },
        { message: "💰 Bonus kerja hari ini! Pendapatan bertambah 50%.", effect: "bonus" },
        { message: "😴 Kamu merasa lelah. Efisiensi kerja menurun.", effect: "fatigue" }
    ];

    // Fungsi untuk memunculkan event acak
    function triggerRandomEvent() {
        let randomIndex = Math.floor(Math.random() * events.length);
        let selectedEvent = events[randomIndex];

        // Tampilkan popup event
        eventPopup.querySelector("p").textContent = selectedEvent.message;
        eventPopup.classList.remove("hidden");

        // Terapkan efek event ke gameData
        applyEventEffect(selectedEvent.effect);
    }

    // Fungsi untuk menerapkan efek event
    function applyEventEffect(effect) {
        let gameData = JSON.parse(localStorage.getItem("gameData")) || { money: 0, fatigue: 0 };

        switch (effect) {
            case "discount":
                alert("Harga barang di toko turun 20% hari ini!");
                break;
            case "gift":
                gameData.money += 200;
                alert("Kamu menerima 200 koin!");
                break;
            case "bonus":
                gameData.money += 100;
                alert("Kamu mendapat bonus kerja 100 koin!");
                break;
            case "fatigue":
                gameData.fatigue += 1;
                alert("Kamu merasa lebih lelah dari biasanya.");
                break;
        }

        localStorage.setItem("gameData", JSON.stringify(gameData));
    }

    // Fungsi untuk menutup popup event
    window.closePopup = function () {
        eventPopup.classList.add("hidden");
    };

    // Jalankan event acak setiap 5 menit
    setInterval(triggerRandomEvent, 300000);
});