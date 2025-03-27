document.addEventListener("DOMContentLoaded", function () {
    const messageNotif = document.getElementById("message-notif");

    // Fungsi menampilkan notifikasi pesan baru
    function showMessageNotif() {
        messageNotif.classList.remove("hidden");
    }

    // Fungsi menyembunyikan notifikasi setelah dibuka
    function hideMessageNotif() {
        messageNotif.classList.add("hidden");
    }

    // Simulasi penerimaan pesan baru
    function receiveNewMessage() {
        showMessageNotif();
    }

    // Event klik untuk membuka chat dan menyembunyikan notifikasi
    document.getElementById("messages-btn").addEventListener("click", function () {
        hideMessageNotif();
    });

    // Simulasi pesan baru setiap beberapa waktu
    setInterval(receiveNewMessage, 60000); // Setiap 1 menit
});