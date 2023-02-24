import './css/styles.css';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayApiService from './PixabayApiService';
import LoadMoreBtn from './loadMoreBtn';

const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn('.load-more');
const lightbox = new SimpleLightbox('.gallery a');

const formEl = document.querySelector('.search-form');
const searchBtnEl = document.querySelector('.search-form-btn');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.button.addEventListener('click', renderGallery);

function onFormSubmit(event) {
  event.preventDefault();

  loadMoreBtn.hide();

  const inputValue = formEl.elements.searchQuery.value.trim();
 
  if (inputValue.length != 0) {
    pixabayApiService.resetPage();
    
    clearGallery();
   
    pixabayApiService.searchQuery = inputValue;
    renderGallery().finally(() => formEl.reset());
  }
}

async function renderGallery() {
  try {
    const images = await pixabayApiService.getImages();
  
    if (images.hits.length === 0) {
      loadMoreBtn.hide();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        { width: '300px', position: 'center-top', distance: '120px' }
      );
      return;
    }

    const markup = images.hits.reduce(
      (acc, image) => createGalleryCardMarkup(image) + acc,
      ''
    );

    appendImageToGallery(markup);

    const totalPages = Math.ceil(images.totalHits / pixabayApiService.perPage);
   
    if (pixabayApiService.page > totalPages) {
      loadMoreBtn.hide();
      Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreBtn.show();
    }

    lightbox.refresh();
  } catch (err) {
    console.error(err);
  }
}

function createGalleryCardMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <div class="photo-card">
        <a class='image-wrap' href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="280"/>
        </a>
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${downloads}
        </p>
      </div>
    </div>
    `;
}

function appendImageToGallery(markup) {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  galleryEl.innerHTML = '';
}
