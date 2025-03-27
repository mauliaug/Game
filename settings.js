document.addEventListener("DOMContentLoaded", function () {
    const volumeSlider = document.getElementById("volume-slider");
    const resetButton = document.getElementById("reset-game");
    
    // Cek data pengaturan dari localStorage
    let settings = JSON.parse(localStorage.getItem("settings")) || {
        volume: 50
    };

    // Terapkan volume yang tersimpan
    volumeSlider.value = settings.volume;
    document.getElementById("game-audio").volume = settings.volume / 100;

    // Simpan perubahan volume
    volumeSlider.addEventListener("input", function () {
        settings.volume = this.value;
        localStorage.setItem("settings", JSON.stringify(settings));
        document.getElementById("game-audio").volume = settings.volume / 100;
    });

    // Reset game
    resetButton.addEventListener("click", function () {
        if (confirm("Apakah kamu yakin ingin mereset permainan? Semua data akan hilang!")) {
            localStorage.clear();
            location.reload();
        }
    });
});