document.addEventListener("DOMContentLoaded", function () {
    const achievementContainer = document.getElementById("achieve-list");

    if (!achievementContainer) {
        console.error("Elemen achievement list tidak ditemukan di index.html");
        return;
    }

    let achievements = [
        { id: 1, name: "Petualangan Dimulai", unlocked: false },
        { id: 2, name: "Mendapatkan Teman", unlocked: false },
        { id: 3, name: "Mendapatkan 1000 Uang", unlocked: false },
        { id: 4, name: "Membeli Item Pertama", unlocked: false },
        { id: 5, name: "Menyelesaikan Chapter 1", unlocked: false },
        { id: 6, name: "Memulai Pekerjaan", unlocked: false },
        { id: 7, name: "Mendapatkan Ending Pertama", unlocked: false },
        { id: 8, name: "Menyelesaikan Semua Ending", unlocked: false },
        { id: 9, name: "Membuka Semua Gambar", unlocked: false },
        { id: 10, name: "Menghabiskan 10 Jam Bermain", unlocked: false }
    ];

    // Ambil progres dari localStorage
    let savedAchievements = JSON.parse(localStorage.getItem("achievements"));
    if (savedAchievements) {
        achievements = savedAchievements;
    }

    // Update tampilan pencapaian
    function renderAchievements() {
        achievementContainer.innerHTML = "";
        achievements.forEach(ach => {
            let achElement = document.createElement("div");
            achElement.classList.add("locked");
            achElement.textContent = ach.unlocked ? ach.name : "?";

            if (ach.unlocked) {
                achElement.classList.add("unlocked");
            }

            achievementContainer.appendChild(achElement);
        });

        // Simpan progres ke localStorage
        localStorage.setItem("achievements", JSON.stringify(achievements));
    }

    // Fungsi untuk membuka pencapaian tertentu
    function unlockAchievement(id) {
        let achievement = achievements.find(ach => ach.id === id);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            renderAchievements();
            alert(`Pencapaian baru: ${achievement.name}!`);
        }
    }

    // Fungsi untuk mengecek pencapaian berdasarkan progres game
    function checkAchievements(playerMoney, ownedItems, gameProgress, playTime) {
        if (gameProgress.chapter >= 1) unlockAchievement(5);
        if (playerMoney >= 1000) unlockAchievement(3);
        if (ownedItems.length > 0) unlockAchievement(4);
        if (gameProgress.workStarted) unlockAchievement(6);
        if (playTime >= 36000) unlockAchievement(10); // 10 jam dalam detik (10 * 3600)
    }

    // **Event Listener** untuk mendeteksi perubahan progres game
    document.addEventListener("updateAchievements", function (event) {
        const { playerMoney, ownedItems, gameProgress, playTime } = event.detail;
        checkAchievements(playerMoney, ownedItems, gameProgress, playTime);
    });

    // Inisialisasi tampilan awal
    renderAchievements();
});