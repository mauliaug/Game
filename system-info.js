document.addEventListener("DOMContentLoaded", function () {
    const playtimeDisplay = document.getElementById("playtime");
    const galleryCountDisplay = document.getElementById("gallery-count");

    // Ambil data dari localStorage atau inisialisasi
    let systemData = JSON.parse(localStorage.getItem("systemInfo")) || {
        playtime: 0, // dalam menit
        galleryCount: 0
    };

    // Update tampilan UI
    function updateSystemInfo() {
        playtimeDisplay.textContent = `Waktu Bermain: ${systemData.playtime} menit`;
        galleryCountDisplay.textContent = `Gambar Tersimpan: ${systemData.galleryCount}`;
    }

    // Fungsi untuk menambah waktu bermain setiap menit
    function incrementPlaytime() {
        systemData.playtime += 1;
        saveSystemInfo();
        updateSystemInfo();
    }

    // Simpan data ke localStorage
    function saveSystemInfo() {
        localStorage.setItem("systemInfo", JSON.stringify(systemData));
    }

    // Update jumlah gambar dari gallery.js
    document.addEventListener("newImageReceived", function () {
        systemData.galleryCount += 1;
        saveSystemInfo();
        updateSystemInfo();
    });

    // Perbarui UI saat halaman dimuat
    updateSystemInfo();

    // Tambahkan waktu bermain setiap menit
    setInterval(incrementPlaytime, 60000);
});