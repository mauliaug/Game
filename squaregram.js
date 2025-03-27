document.addEventListener("DOMContentLoaded", function () {
    const squaregramContainer = document.getElementById("squaregram-container");
    const postForm = document.getElementById("post-form");
    const postInput = document.getElementById("post-input");
    const imageInput = document.getElementById("image-input");

    // Load postingan dari localStorage
    function loadPosts() {
        squaregramContainer.innerHTML = "";
        let posts = JSON.parse(localStorage.getItem("squaregram")) || [];
        posts.forEach(post => addPostToSquaregram(post.text, post.image));
    }

    // Menambahkan postingan ke Squaregram
    function addPostToSquaregram(text, imageSrc) {
        let postElement = document.createElement("div");
        postElement.classList.add("squaregram-post");

        let textElement = document.createElement("p");
        textElement.textContent = text;

        postElement.appendChild(textElement);

        if (imageSrc) {
            let imgElement = document.createElement("img");
            imgElement.src = imageSrc;
            postElement.appendChild(imgElement);
        }

        squaregramContainer.prepend(postElement); // Postingan terbaru di atas
    }

    // Simpan postingan ke localStorage
    function savePost(text, imageSrc) {
        let posts = JSON.parse(localStorage.getItem("squaregram")) || [];
        posts.push({ text, image: imageSrc });
        localStorage.setItem("squaregram", JSON.stringify(posts));
        addPostToSquaregram(text, imageSrc);
    }

    // Saat pengguna mengirimkan postingan baru
    postForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let text = postInput.value.trim();
        let imageSrc = imageInput.value.trim(); // Diubah sesuai input file gambar

        if (text || imageSrc) {
            savePost(text, imageSrc);
            postInput.value = "";
            imageInput.value = "";
        }
    });

    // Load postingan saat halaman dibuka
    loadPosts();
});