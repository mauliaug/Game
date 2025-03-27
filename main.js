document.addEventListener("DOMContentLoaded", function () {
    const videoLoading = document.getElementById("video-loading");
    const loadingScreen = document.getElementById("loading-screen");
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    const nameForm = document.getElementById("name-form");
    const mcInput = document.getElementById("mc-name");
    const partnerInput = document.getElementById("partner-name");
    const mcDisplay = document.getElementById("mc-display");

    // Pastikan elemen ditemukan sebelum mengaksesnya
    if (!videoLoading || !loadingScreen || !startScreen || !gameScreen || !nameForm || !mcInput || !partnerInput || !mcDisplay) {
        console.error("Satu atau lebih elemen tidak ditemukan di index.html");
        return;
    }

    // Tampilkan video loading terlebih dahulu
    videoLoading.style.display = "block";
    videoLoading.style.opacity = "1";
    loadingScreen.style.display = "none";
    startScreen.style.display = "none";
    gameScreen.style.display = "none";

    // Setelah video selesai, masuk ke loading screen
    videoLoading.addEventListener("ended", function () {
        videoLoading.style.opacity = "0"; // Tambahkan efek fade out
        setTimeout(() => {
            videoLoading.style.display = "none";
            loadingScreen.style.display = "flex";
        }, 500); // Tunggu animasi selesai

        // Simulasi loading (3 detik), lalu masuk ke input nama
        setTimeout(() => {
            loadingScreen.style.display = "none";
            startScreen.style.display = "flex";
        }, 3500); // Sedikit lebih lama untuk efek transisi
    });

    // Ketika form nama dikirim
    nameForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const mcName = mcInput.value.trim();
        const partnerName = partnerInput.value.trim();

        if (mcName === "" || partnerName === "") {
            alert("Nama tidak boleh kosong!");
            return;
        }

        // Simpan nama ke localStorage
        localStorage.setItem("mcName", mcName);
        localStorage.setItem("partnerName", partnerName);

        // Sembunyikan input nama, tampilkan game utama
        startScreen.style.opacity = "0"; // Efek fade out
        setTimeout(() => {
            startScreen.style.display = "none";
            gameScreen.style.display = "block";
            gameScreen.style.opacity = "1";
        }, 500);

        // Tampilkan nama MC di header
        mcDisplay.innerText = mcName;
    });

    // Cek apakah pemain sudah pernah bermain sebelumnya
    const savedMC = localStorage.getItem("mcName");
    const savedPartner = localStorage.getItem("partnerName");

    if (savedMC && savedPartner) {
        startScreen.style.display = "none";
        gameScreen.style.display = "block";
        mcDisplay.innerText = savedMC;
    }
});