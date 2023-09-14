document.addEventListener("DOMContentLoaded"), () => {
    const postForm = document.getElementById("post-form");
    const postList = document.getElementById("post-list");
}
    postForm.addEventListener("submit"), (e) => {
        e.preventDefault();
    }

    document.addEventListener("DOMContentLoaded", () => {
        const postForm = document.getElementById("post-form");
        const postList = document.getElementById("post-list");
    
        // Función para cargar y mostrar las publicaciones
        const cargarPublicaciones = async () => {
            try {
                const response = await fetch("/publicaciones");
                const publicaciones = await response.json();
    
                // Limpia la lista de publicaciones antes de agregar las nuevas
                postList.innerHTML = "";
    
                publicaciones.forEach((publicacion) => {
                    const postCard = document.createElement("div");
                    postCard.classList.add("post-card");
    
                    const postImage = document.createElement("img");
                    postImage.classList.add("post-image");
                    postImage.src = publicacion.imagen || "placeholder.jpg";
                    postImage.alt = "Imagen de la publicación";
    
                    const postTitle = document.createElement("h2");
                    postTitle.classList.add("card-title");
                    postTitle.textContent = publicacion.titulo;
    
                    const postContent = document.createElement("p");
                    postContent.classList.add("card-text");
                    postContent.textContent = publicacion.contenido;
    
                    postCard.appendChild(postImage);
                    postCard.appendChild(postTitle);
                    postCard.appendChild(postContent);
    
                    postList.appendChild(postCard);
                });
            } catch (error) {
                console.error(error);
            }
        };
    
        // Cargar las publicaciones al cargar la página
        cargarPublicaciones();
    
        // Escuchar el envío del formulario y enviar la publicación al servidor
        postForm.addEventListener("submit", async (e) => {
            e.preventDefault();
    
            const titulo = document.getElementById("titulo").value;
            const contenido = document.getElementById("contenido").value;
            const imagen = document.getElementById("imagen").value;
    
            try {
                const response = await fetch("/publicar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ titulo, contenido, imagen }),
                });
    
                if (response.status === 200) {
                    // Limpiar el formulario después de una publicación exitosa
                    document.getElementById("titulo").value = "";
                    document.getElementById("contenido").value = "";
                    document.getElementById("imagen").value = "";
    
                    // Recargar las publicaciones para mostrar la nueva
                    cargarPublicaciones();
                } else {
                    console.error("Error al crear la publicación");
                }
            } catch (error) {
                console.error(error);
            }
        });
    });
    
