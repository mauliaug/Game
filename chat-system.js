document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");
    const notifBadge = document.getElementById("chat-notif");
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

    // Fungsi untuk menampilkan chat dengan animasi masuk
    function renderChat() {
        chatBox.innerHTML = "";
        chatHistory.forEach((msg) => {
            let chatItem = document.createElement("div");
            chatItem.classList.add("chat-message", msg.sender);
            chatItem.innerHTML = `<b>${msg.sender === "MC" ? "Kamu" : msg.sender}:</b> ${msg.text}`;
            chatBox.appendChild(chatItem);

            // Tambahkan animasi fade-in untuk chat baru
            setTimeout(() => chatItem.classList.add("fade-in"), 100);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Fungsi mengirim chat
    function sendMessage() {
        let message = chatInput.value.trim();
        if (message === "") return;

        // Tambahkan ke chat history
        chatHistory.push({ sender: "MC", text: message });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

        // Reset input, perbarui tampilan, dan hilangkan notifikasi
        chatInput.value = "";
        renderChat();
        notifBadge.style.display = "none";

        // Kirim event ke chat.js atau even.js jika ada kondisi khusus
        document.dispatchEvent(new CustomEvent("newChatMessage", { detail: { message } }));

        // Karakter membalas setelah 1 detik
        setTimeout(() => botReply(message), 1000);
    }

    // Fungsi balasan karakter berdasarkan konteks pesan
    function botReply(playerMessage) {
        let npcName = "NPC"; // Default NPC, bisa diganti dari even.js
        let replies = {
            "halo": ["Hai!", "Halo juga!", "Apa kabar?"],
            "kabar": ["Aku baik, kamu?", "Lagi santai aja.", "Biasa aja sih."],
            "lucu": ["Haha, beneran?", "Aku juga ketawa!", "Seru ya!"],
            "default": ["Oh, begitu ya?", "Serius?", "Menarik, ceritakan lebih banyak!"]
        };

        let replyText = replies["default"][Math.floor(Math.random() * replies["default"].length)];
        for (let key in replies) {
            if (playerMessage.toLowerCase().includes(key)) {
                replyText = replies[key][Math.floor(Math.random() * replies[key].length)];
                break;
            }
        }

        chatHistory.push({ sender: npcName, text: replyText });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        renderChat();

        // Tampilkan notifikasi jika pengguna tidak sedang di layar chat
        if (document.hidden) {
            notifBadge.style.display = "block";
        }
    }

    // Event listener tombol kirim
    sendButton.addEventListener("click", sendMessage);

    // Event listener enter key
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    // Jika pengguna membuka chat atau mengetik, sembunyikan notifikasi
    chatBox.addEventListener("click", function () {
        notifBadge.style.display = "none";
    });

    chatInput.addEventListener("focus", function () {
        notifBadge.style.display = "none";
    });

    // Event listener untuk menerima pesan dari file lain (misal dari even.js)
    document.addEventListener("npcChatResponse", function (event) {
        let { sender, text } = event.detail;
        chatHistory.push({ sender, text });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        renderChat();
    });

    // Tampilkan chat saat halaman dimuat
    renderChat();
});