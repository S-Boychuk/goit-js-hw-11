import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';


const galleryEl = document.querySelector('.gallery');
const galleryContent = createGallery(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', galleryContent);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li>
          <a class="gallery__item" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join('');
}

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});



