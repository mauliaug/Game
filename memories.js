document.addEventListener("DOMContentLoaded", function () {
    const memoriesContainer = document.getElementById("memories-container");

    // Load progress dari localStorage
    function loadMemories() {
        memoriesContainer.innerHTML = "";
        let chapters = JSON.parse(localStorage.getItem("memories")) || [];
        chapters.forEach(chapter => addChapterToMemories(chapter));
    }

    // Menambahkan chapter ke dalam daftar memories
    function addChapterToMemories(chapter) {
        let chapterElement = document.createElement("div");
        chapterElement.classList.add("memory-item");
        chapterElement.textContent = chapter.title;
        chapterElement.onclick = () => openChapter(chapter.id);
        memoriesContainer.appendChild(chapterElement);
    }

    // Menyimpan chapter ke localStorage
    function saveChapter(chapterId, chapterTitle) {
        let chapters = JSON.parse(localStorage.getItem("memories")) || [];
        let exists = chapters.some(ch => ch.id === chapterId);

        if (!exists) {
            chapters.push({ id: chapterId, title: chapterTitle });
            localStorage.setItem("memories", JSON.stringify(chapters));
            addChapterToMemories({ id: chapterId, title: chapterTitle });
        }
    }

    // Fungsi membuka chapter (misalnya menampilkan ulang cerita)
    function openChapter(chapterId) {
        alert("Membuka kembali Chapter: " + chapterId);
        // Bisa diintegrasikan dengan sistem cerita di game
    }

    // Menambahkan chapter baru (misalnya saat menyelesaikan bagian cerita)
    document.addEventListener("chapterCompleted", function (event) {
        saveChapter(event.detail.chapterId, event.detail.chapterTitle);
    });

    // Load memories saat halaman dimuat
    loadMemories();
});