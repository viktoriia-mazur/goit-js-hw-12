import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-btn');

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    if (!gallery) return;


    const markup = images
        .map(
            img => `
        <li class="gallery-item">
        <a class="item-link" href="${img.largeImageURL}">
            <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <div class="img-info-wrapper">
            <p class="img-info">Likes: <span class="info-accent">${img.likes}</span></p>
            <p class="img-info">Views: <span class="info-accent">${img.views}</span></p>
            <p class="img-info">Comments: <span class="info-accent">${img.comments}</span></p>
            <p class="img-info">Downloads: <span class="info-accent">${img.downloads}</span></p>
        </div>
        </li>
    `
        )
        .join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    export function clearGallery() {
        if (gallery) {
            gallery.innerHTML = '';
        }
    }

    export function showLoader() {
        if (loader) {
            loader.classList.add('active');
        }
    }

    export function hideLoader() {
        if (loader) {
            loader.classList.remove('active');
        }
    }

    export function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    export function showLoadMoreButton() {
        if (loadMoreButton) {
            loadMoreButton.classList.add('is-visible');
        }
    }

    export function hideLoadMoreButton() {
        if (loadMoreButton) {
            loadMoreButton.classList.remove('is-visible');
        }
    }
}
