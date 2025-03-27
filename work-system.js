document.addEventListener("DOMContentLoaded", function () {
    const workButton = document.getElementById("work-button");
    const restButton = document.getElementById("rest-button"); // Tombol istirahat
    const moneyDisplay = document.getElementById("money");
    const timeDisplay = document.getElementById("game-time");

    // Cek apakah ada data tersimpan
    let gameData = JSON.parse(localStorage.getItem("gameData")) || {
        money: 0,
        gameHour: 8, // Waktu mulai dari jam 08:00 pagi
        fatigue: 0 // Tingkat kelelahan
    };

    // Fungsi untuk memperbarui tampilan uang & waktu
    function updateUI() {
        moneyDisplay.textContent = `Uang: ${gameData.money} koin`;
        timeDisplay.textContent = `Jam: ${gameData.gameHour}:00`;

        // Cek apakah tombol tidur perlu ditampilkan
        if (gameData.fatigue >= 3) {
            restButton.style.display = "block"; // Tampilkan tombol tidur
        } else {
            restButton.style.display = "none"; // Sembunyikan jika tidak perlu
        }
    }

    // Fungsi kerja
    function work() {
        if (gameData.fatigue >= 3) {
            alert("Kamu terlalu lelah untuk bekerja! Istirahat dulu.");
            return;
        }

        let workHours = parseInt(prompt("Bekerja selama berapa jam? (1-3)"), 10);
        if (isNaN(workHours) || workHours < 1 || workHours > 3) {
            alert("Masukkan angka antara 1 hingga 3.");
            return;
        }

        // Hitung pendapatan dan kelelahan
        let earnings = workHours * 100; // 100 koin per jam
        gameData.money += earnings;
        gameData.gameHour += workHours;
        gameData.fatigue += 1;

        // Jika jam melewati 24, reset keesokan harinya
        if (gameData.gameHour >= 24) {
            gameData.gameHour -= 24;
            gameData.fatigue = 0; // Reset kelelahan setiap hari
        }

        // Peringatan jika sudah malam
        if (gameData.gameHour >= 21) {
            alert("Sudah larut malam, sebaiknya istirahat.");
        }

        saveGame();
        updateUI();

        alert(`Kamu bekerja selama ${workHours} jam dan mendapat ${earnings} koin!`);
    }

    // Fungsi istirahat (tidur)
    function rest() {
        alert("Kamu tidur dan merasa segar kembali.");
        gameData.gameHour = 8; // Reset ke jam 08:00 pagi
        gameData.fatigue = 0; // Reset kelelahan

        saveGame();
        updateUI();
    }

    // Fungsi menyimpan ke localStorage
    function saveGame() {
        localStorage.setItem("gameData", JSON.stringify(gameData));
    }

    // Tambahkan event listener ke tombol kerja & istirahat
    if (workButton) workButton.addEventListener("click", work);
    if (restButton) restButton.addEventListener("click", rest);

    // Perbarui tampilan saat halaman dimuat
    updateUI();
});