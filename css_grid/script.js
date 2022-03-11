const form = document.getElementById("form");

// Fetch images from API
async function getImages() {
  return await fetch("https://picsum.photos/v2/list?page=3&limit=20").then(
    (res) => res.json()
  );
}

async function showImages() {
  const images = await getImages();
  images.forEach((image) => {
    const imageEl = document.createElement("div");
    imageEl.classList.add("image");
    imageEl.innerHTML = `
        <img src=https://picsum.photos/id/${image.id}/200/300 alt=${image.author}/>
    `;
    form.appendChild(imageEl);
  });
}

showImages();
