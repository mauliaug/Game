document.addEventListener("DOMContentLoaded", function () {
    const chatList = document.getElementById("chat-list");
    const chatWindow = document.getElementById("chat-window");
    const chatHeader = document.getElementById("chat-header");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");

    let activeContact = null;
    let chatData = {};

    // Load dialog dari JSON
    fetch("data/dialog.json")
        .then(response => response.json())
        .then(data => {
            chatData = data;
            loadChatContacts();
        });

    // Menampilkan daftar kontak
    function loadChatContacts() {
        chatList.innerHTML = "";
        Object.keys(chatData).forEach(character => {
            let contact = document.createElement("div");
            contact.classList.add("chat-contact");
            contact.innerHTML = `
                <img src="assets/avatars/${character}.png" alt="${character}">
                <span>${chatData[character].name}</span>
                <span class="notif" id="notif-${character}" style="display:none;">!</span>
            `;
            contact.onclick = () => openChat(character);
            chatList.appendChild(contact);
        });
    }

    // Membuka chat dengan karakter
    function openChat(character) {
        activeContact = character;
        chatHeader.innerText = chatData[character].name;
        chatMessages.innerHTML = "";

        let messages = getChatHistory(character);
        messages.forEach(msg => addMessage(msg.text, msg.sender, msg.timestamp));

        chatWindow.style.display = "block";
        document.getElementById(`notif-${character}`).style.display = "none";
    }

    // Menambahkan pesan ke chat dengan animasi dan timestamp
    function addMessage(text, sender, timestamp = null) {
        let message = document.createElement("div");
        message.classList.add("chat-message", sender);
        message.innerHTML = `
            <span>${text}</span>
            <div class="timestamp">${timestamp || getCurrentTime()}</div>
        `;
        chatMessages.appendChild(message);

        // Animasi masuk
        setTimeout(() => message.classList.add("fade-in"), 100);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Mengirim pesan
    sendButton.addEventListener("click", function () {
        let text = chatInput.value.trim();
        if (text && activeContact) {
            let timestamp = getCurrentTime();
            addMessage(text, "player", timestamp);
            saveChatHistory(activeContact, { text, sender: "player", timestamp });
            chatInput.value = "";

            // Kirim event ke even.js atau chat-system.js
            document.dispatchEvent(new CustomEvent("playerSentMessage", {
                detail: { character: activeContact, message: text }
            }));

            // Simulasi balasan NPC
            setTimeout(() => npcReply(activeContact), 1000);
        }
    });

    // Fungsi balasan NPC berdasarkan konteks
    function npcReply(character) {
        let responses = chatData[character].responses;
        let reply = responses[Math.floor(Math.random() * responses.length)];
        let timestamp = getCurrentTime();

        addMessage(reply, "npc", timestamp);
        saveChatHistory(character, { text: reply, sender: "npc", timestamp });

        // Jika pengguna tidak sedang di chat, tampilkan notifikasi
        if (activeContact !== character) {
            document.getElementById(`notif-${character}`).style.display = "block";
        }

        // Kirim event ke even.js
        document.dispatchEvent(new CustomEvent("npcSentMessage", {
            detail: { character, message: reply }
        }));
    }

    // Menyimpan riwayat chat ke localStorage
    function saveChatHistory(character, message) {
        let history = JSON.parse(localStorage.getItem(`chat-${character}`)) || [];
        history.push(message);
        localStorage.setItem(`chat-${character}`, JSON.stringify(history));
    }

    // Mengambil riwayat chat dari localStorage
    function getChatHistory(character) {
        return JSON.parse(localStorage.getItem(`chat-${character}`)) || [];
    }

    // Fungsi mendapatkan waktu saat ini
    function getCurrentTime() {
        let now = new Date();
        return now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
    }

    // Event listener untuk menerima pesan dari file lain (even.js, chat-system.js)
    document.addEventListener("externalNpcMessage", function (event) {
        let { character, text } = event.detail;
        let timestamp = getCurrentTime();
        addMessage(text, "npc", timestamp);
        saveChatHistory(character, { text, sender: "npc", timestamp });
    });
});