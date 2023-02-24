import axios from 'axios';
const API_KEY = '33884715-0dc68d810fba427cd8d5ff839';

export default class PixabayApiService {
  constructor() {
    this.page = 1;
    this.perPage = 40;
    this.searchQuery = '';
  }

  async getImages() {
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;

    const response = await axios.get(URL);
    this.updatePage();
    console.log(response.data);
    return response.data;
  }

  updatePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
