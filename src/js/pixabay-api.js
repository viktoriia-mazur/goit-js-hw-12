import axios from 'axios';

const API_KEY = '55463829-87ababc408fcd8cb97ff0a765';

export async function getImagesByQuery(query, page = 1) {
    const response = await axios.get('https://pixabay.com/api/', {
    params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page,
    },
    });

    return response.data;
}
