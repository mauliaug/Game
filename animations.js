document.addEventListener("DOMContentLoaded", function () {
    // Animasi saat membuka dan menutup layar dengan efek lebih halus
    function fadeIn(element) {
        element.style.opacity = 0;
        element.style.display = "block";

        let opacity = 0;
        function increaseOpacity() {
            if (opacity >= 1) return;
            opacity += 0.05;
            element.style.opacity = opacity;
            requestAnimationFrame(increaseOpacity);
        }
        increaseOpacity();
    }

    function fadeOut(element) {
        let opacity = 1;
        function decreaseOpacity() {
            if (opacity <= 0) {
                element.style.display = "none";
                return;
            }
            opacity -= 0.05;
            element.style.opacity = opacity;
            requestAnimationFrame(decreaseOpacity);
        }
        decreaseOpacity();
    }

    // Efek klik tombol dengan transisi lebih halus
    function buttonClickEffect(button) {
        button.style.transition = "transform 0.1s ease";
        
        button.addEventListener("mousedown", function () {
            button.style.transform = "scale(0.9)";
        });

        button.addEventListener("mouseup", function () {
            button.style.transform = "scale(1)";
        });

        button.addEventListener("mouseleave", function () {
            button.style.transform = "scale(1)";
        });
    }

    // Terapkan efek klik ke semua tombol
    document.querySelectorAll("button").forEach(button => {
        buttonClickEffect(button);
    });

    // Animasi notifikasi pesan baru (dapat diperbarui saat ada pesan masuk)
    function animateMessageNotification() {
        const notif = document.getElementById("message-notif");
        if (!notif) return;

        let isVisible = true;
        setInterval(() => {
            notif.style.opacity = isVisible ? "1" : "0.3";
            isVisible = !isVisible;
        }, 500);
    }

    // Memastikan notifikasi berjalan setiap kali ada pesan baru
    document.addEventListener("newMessage", function () {
        animateMessageNotification();
    });

    // Animasi uang bertambah dengan efek lebih akurat
    function animateMoneyIncrease(amount) {
        const moneyDisplay = document.getElementById("game-money");
        if (!moneyDisplay) return;

        let currentMoney = parseInt(moneyDisplay.textContent.replace("Rp ", "").replace(/,/g, "")) || 0;
        let targetMoney = currentMoney + amount;
        let step = Math.ceil(amount / 50);

        function updateMoney() {
            if (currentMoney >= targetMoney) {
                moneyDisplay.textContent = `Rp ${targetMoney.toLocaleString()}`;
                return;
            }
            currentMoney += step;
            moneyDisplay.textContent = `Rp ${currentMoney.toLocaleString()}`;
            requestAnimationFrame(updateMoney);
        }
        updateMoney();
    }

    // Event listener untuk perubahan uang
    document.addEventListener("updateMoney", function (event) {
        animateMoneyIncrease(event.detail.amount);
    });

    // Tambahkan efek animasi saat game dimulai
    const nameInputScreen = document.getElementById("name-input-screen");
    const gameUI = document.getElementById("game-ui");
    
    if (nameInputScreen) fadeIn(nameInputScreen);
    
    window.startGame = function () {
        fadeOut(nameInputScreen);
        setTimeout(() => {
            fadeIn(gameUI);
        }, 500);
    };
});