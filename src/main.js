import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    delay,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-btn');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

if (form) {
    form.addEventListener('submit', async e => {
        e.preventDefault();

        const query = e.target.elements['search-text'].value.trim();

        if (!query) {
            iziToast.warning({
                title: 'Caution',
                message: 'Please enter a search query!',
                position: 'topRight',
            });
            return;
        }

        currentQuery = query;
        currentPage = 1;
        clearGallery();
        hideLoadMoreButton();
        showLoader();

        try {
            const data = await getImagesByQuery(currentQuery, currentPage);
            totalHits = data.totalHits;

            await delay(500);

            if (data.hits.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message:
                        'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }

            createGallery(data.hits);

            const totalPages = Math.ceil(totalHits /  PER_PAGE);

            if (currentPage < totalPages) {
                showLoadMoreButton();
            } else {
                hideLoadMoreButton();
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                });
            }
        } catch (error) {
            iziToast.error({
                message: 'Something went wrong. Please try again later.',
                position: 'topRight',
            });
        } finally {
            hideLoader();
            form.reset();
        }
    });

    async function onLoadMore() {
        currentPage += 1;
        hideLoadMoreButton();
        showLoader();

        try {
            const data = await getImagesByQuery(currentQuery, currentPage);

            createGallery(data.hits);

            const totalPages = Math.ceil(totalHits / PER_PAGE);

            if (currentPage < totalPages) {
                showLoadMoreButton();
            } else {
                hideLoadMoreButton();
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                });
            }

            const card = document.querySelector('.gallery-item');

            if (card) {
                const cardHeight = card.getBoundingClientRect().height;

                window.scrollBy({
                    top: cardHeight * 2,
                    behavior: 'smooth',
                });
            }
        } catch (error) {
            iziToast.error({
                message: 'Something went wrong. Please try again later.',
                position: 'topRight',
            });
        } finally {
            hideLoader();
        }
    }

    loadMoreButton.addEventListener('click', onLoadMore);
}
