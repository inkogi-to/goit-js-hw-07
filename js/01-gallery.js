import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");

const itemsGallery = createGalleryList(galleryItems);
galleryList.innerHTML = itemsGallery;

function createGalleryList(items) {
  return items
    .map(
      (item) => `<div class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      loading="lazy"
      data-source="${item.original}"
      alt="${item.description}"
      width = 200
      height = 200
    />
  </a>
</div>`
    )
    .join("");
}

const img = document.querySelectorAll('img[loading="lazy"]');
img.forEach((image) => {
  image.src = image.dataset.source;
});

galleryList.addEventListener("click", openModalWindow);

function openModalWindow(event) {
  blockAction(event);

  if (event.target.nodeName !== "IMG") return;

  const instance = basicLightbox.create(`
    <img src='${event.target.dataset.source}' width="800" height="600">`);

  instance.show();

  galleryList.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      instance.close();
    }
  });
}

function blockAction(event) {
  event.preventDefault();
}
