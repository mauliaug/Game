document.addEventListener("DOMContentLoaded", function () {
    const resetButton = document.getElementById("reset-game");

    // Data default saat game pertama kali dimainkan
    let gameData = {
        mcName: "Pemain",
        partnerName: "Pasangan",
        money: 0,
        chapter: 1,
        ownedItems: [],
        achievements: []
    };

    // Ambil data dari localStorage jika ada
    let savedData = JSON.parse(localStorage.getItem("gameData"));
    if (savedData) {
        gameData = savedData;
    }

    // Simpan data ke localStorage
    function saveGame() {
        localStorage.setItem("gameData", JSON.stringify(gameData));
        console.log("Game disimpan!", gameData);
    }

    // Reset game ke kondisi awal
    function resetGame() {
        if (confirm("Apakah kamu yakin ingin menghapus semua data game?")) {
            localStorage.removeItem("gameData");
            localStorage.removeItem("achievements");
            alert("Game telah direset!");
            location.reload(); // Refresh halaman untuk menerapkan perubahan
        }
    }

    // Tambahkan event listener untuk tombol reset
    if (resetButton) {
        resetButton.addEventListener("click", resetGame);
    }

    // Simpan otomatis setiap 10 detik
    setInterval(saveGame, 10000);

    // Debug: cek data game
    console.log("Game data:", gameData);
});