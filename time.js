document.addEventListener("DOMContentLoaded", function () {
    const clockDisplay = document.getElementById("clock");
    const dateDisplay = document.getElementById("date");
    const gameScreen = document.getElementById("game-screen");

    function updateTime() {
        const now = new Date();

        // Format jam digital (HH:MM:SS)
        let hours = now.getHours().toString().padStart(2, "0");
        let minutes = now.getMinutes().toString().padStart(2, "0");
        let seconds = now.getSeconds().toString().padStart(2, "0");
        clockDisplay.innerText = `${hours}:${minutes}:${seconds}`;

        // Format tanggal (Hari, DD/MM/YYYY)
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        let day = days[now.getDay()];
        let date = now.getDate();
        let month = months[now.getMonth()];
        let year = now.getFullYear();
        dateDisplay.innerText = `${day}, ${date} ${month} ${year}`;

        // Tentukan waktu dalam game (pagi, siang, sore, malam)
        let timeOfDay = "";
        if (hours >= 5 && hours < 12) {
            timeOfDay = "pagi";
            gameScreen.style.backgroundColor = "#FFD700"; // Kuning (pagi)
        } else if (hours >= 12 && hours < 17) {
            timeOfDay = "siang";
            gameScreen.style.backgroundColor = "#87CEEB"; // Biru muda (siang)
        } else if (hours >= 17 && hours < 20) {
            timeOfDay = "sore";
            gameScreen.style.backgroundColor = "#FF8C00"; // Jingga (sore)
        } else {
            timeOfDay = "malam";
            gameScreen.style.backgroundColor = "#191970"; // Biru tua (malam)
        }

        // Simpan waktu dalam game ke localStorage (untuk interaksi lain)
        localStorage.setItem("gameTime", timeOfDay);
    }

    // Update waktu setiap detik
    setInterval(updateTime, 1000);
    updateTime();
});