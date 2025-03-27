document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery-container");
    const modal = document.getElementById("gallery-modal");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementById("close-modal");

    // Load gambar dari localStorage
    function loadGallery() {
        galleryContainer.innerHTML = "";
        let images = JSON.parse(localStorage.getItem("gallery")) || [];
        images.forEach(imgSrc => addImageToGallery(imgSrc));
    }

    // Menambahkan gambar ke galeri
    function addImageToGallery(imgSrc) {
        let imgElement = document.createElement("img");
        imgElement.src = imgSrc;
        imgElement.classList.add("gallery-image");
        imgElement.onclick = () => openModal(imgSrc);
        galleryContainer.appendChild(imgElement);
    }

    // Menyimpan gambar ke localStorage
    function saveImage(imgSrc) {
        let images = JSON.parse(localStorage.getItem("gallery")) || [];
        if (!images.includes(imgSrc)) {
            images.push(imgSrc);
            localStorage.setItem("gallery", JSON.stringify(images));
            addImageToGallery(imgSrc);
        }
    }

    // Buka modal saat gambar diklik
    function openModal(imgSrc) {
        modal.style.display = "flex";
        modalImage.src = imgSrc;
    }

    // Tutup modal saat tombol X ditekan
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Tambah gambar ke galeri (misalnya saat menerima dari chat)
    document.addEventListener("newImageReceived", function (event) {
        saveImage(event.detail.imageSrc);
    });

    // Load galeri saat halaman dimuat
    loadGallery();
});