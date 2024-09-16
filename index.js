/**
 * Fetches news data from the NewsAPI and displays it on the page.
 * The code includes functions to fetch and display breaking news, top news, sports news, business news, and tech news.
 * It also includes functionality for searching news articles and pagination.
 */
let breakingImg = document.querySelector('#breakingImg')
let breakingNews_title = document.querySelector('#breakingNews .title')
let breakingNews_desc = document.querySelector('#breakingNews .description')
let topNews = document.querySelector('.topNews')
let sportsNews = document.querySelector('#sportsNews .newsBox')
let businessNews = document.querySelector('#businessNews .newsBox')
let techNews = document.querySelector('#techNews .newsBox')

let header = document.querySelector('.header')
let toggleMenu = document.querySelector('.bar')
let menu = document.querySelector('nav ul')

const searchBtn = document.querySelector('#searchBtn');
const searchPopup = document.querySelector('#searchPopup');
const searchInput = document.querySelector('#searchInput');
const performSearch = document.querySelector('#performSearch');
const searchResults = document.querySelector('#searchResults');
const searchResultsBox = document.querySelector('#searchResultsBox');
const backToHome = document.querySelector('#backToHome');

let sportsPage = 1;
let businessPage = 1;
let techPage = 1;
let currentPage = 1;
let totalResults = 0;
let currentQuery = '';

const toggle = (e)=>{
    toggleMenu.classList.toggle('active')
    menu.classList.toggle('activeMenu')
}

toggleMenu.addEventListener('click',toggle)



window.addEventListener('scroll',()=>{
    if(window.scrollY>50){
        header.classList.add('sticky')
    }
    else{
        header.classList.remove('sticky')
    }
})

/**
 * Fetches news data from the NewsAPI.org API.
 *
 * @param {string} category - The news category to fetch (e.g. 'general', 'sports', 'business', 'technology').
 * @param {number} pageSize - The number of news articles to fetch per page.
 * @param {number} [page=1] - The page number to fetch (optional, defaults to 1).
 * @returns {Promise<object>} - The response data from the NewsAPI.org API.
 */
const fetchData = async (category, pageSize, page = 1) => {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
    const data = await fetch(url);
    const response = await data.json();
    return response;
}
const apiKey = "1fddc8c9987a48b683e9943b3f28a7bc"


/**
 * Fetches and displays the breaking news article from the NewsAPI.org API.
 *
 * This function is responsible for fetching the latest breaking news article from the NewsAPI.org API and displaying it on the page. It retrieves the article's image, title, and description, and updates the corresponding HTML elements with the fetched data.
 *
 * @param {object} data - The response data from the NewsAPI.org API, containing the latest breaking news article.
 */
//adding breaking news

const add_breakingNews = (data) => {
    if (data.articles && data.articles.length > 0) {
        const article = data.articles[0]
        breakingImg.innerHTML = `<img src=${article.urlToImage || 'placeholder-image-url.jpg'} alt="image">`
        breakingNews_title.innerHTML = `<a href=${article.url} target="_blank"><h2>${article.title}</h2></a>`
        breakingNews_desc.innerHTML = `${article.description || ''}`
    }
}
fetchData('general',5).then(add_breakingNews)

/**
 * Fetches and displays the top news articles from the NewsAPI.org API.
 *
 * This function is responsible for fetching the latest top news articles from the NewsAPI.org API and displaying them on the page. It retrieves the article's image, title, and URL, and updates the corresponding HTML elements with the fetched data.
 *
 * @param {object} data - The response data from the NewsAPI.org API, containing the latest top news articles.
 */
const add_topNews = (data)=>{
    let html = ''
    let title = ''
    data.articles.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="news">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    topNews.innerHTML = html
}
fetchData('general',20).then(add_topNews)

/**
 * Fetches and displays the latest sports news articles from the NewsAPI.org API.
 *
 * This function is responsible for fetching the latest sports news articles from the NewsAPI.org API and displaying them on the page. It retrieves the article's image, title, and URL, and updates the corresponding HTML elements with the fetched data.
 *
 * @param {object} data - The response data from the NewsAPI.org API, containing the latest sports news articles.
 */
const add_sportsNews = (data) => {
    let html = ''
    if (data.articles && data.articles.length > 0) {
        data.articles.forEach((element) => {
            const title = element.title.length < 100 ? element.title : element.title.slice(0,100) + "..."
            html += `<div class="newsCard">
                        <div class="img">
                            <img src=${element.urlToImage || 'placeholder-image-url.jpg'} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                            <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`
        })
    }
    sportsNews.innerHTML = html + createPagination('sports', sportsPage, data.totalResults)
}
fetchData('sports', 5, sportsPage).then(add_sportsNews)

/**
 * Fetches and displays the latest business news articles from the NewsAPI.org API.
 *
 * This function is responsible for fetching the latest business news articles from the NewsAPI.org API and displaying them on the page. It retrieves the article's image, title, and URL, and updates the corresponding HTML elements with the fetched data.
 *
 * @param {object} data - The response data from the NewsAPI.org API, containing the latest business news articles.
 */
const add_businessNews = (data) => {
    let html = ''
    if (data.articles && data.articles.length > 0) {
        data.articles.forEach((element) => {
            const title = element.title.length < 100 ? element.title : element.title.slice(0,100) + "..."
            html += `<div class="newsCard">
                        <div class="img">
                            <img src=${element.urlToImage || 'placeholder-image-url.jpg'} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                            <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`
        })
    }
    businessNews.innerHTML = html + createPagination('business', businessPage, data.totalResults)
}
fetchData('business', 5, businessPage).then(add_businessNews)

/**
 * Fetches and displays the latest technology news articles from the NewsAPI.org API.
 *
 * This function is responsible for fetching the latest technology news articles from the NewsAPI.org API and displaying them on the page. It retrieves the article's image, title, and URL, and updates the corresponding HTML elements with the fetched data.
 *
 * @param {object} data - The response data from the NewsAPI.org API, containing the latest technology news articles.
 */
const add_techNews = (data) => {
    let html = ''
    if (data.articles && data.articles.length > 0) {
        data.articles.forEach((element) => {
            const title = element.title.length < 100 ? element.title : element.title.slice(0,100) + "..."
            html += `<div class="newsCard">
                        <div class="img">
                            <img src=${element.urlToImage || 'placeholder-image-url.jpg'} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                            <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`
        })
    }
    techNews.innerHTML = html + createPagination('tech', techPage, data.totalResults)
}
fetchData('technology', 5, techPage).then(add_techNews)



/**
 * Creates the pagination HTML for a given news category and current page.
 *
 * This function generates the HTML for the pagination controls, including the "Previous" and "Next" buttons. The buttons are disabled if the current page is the first or last page, respectively.
 *
 * @param {string} category - The news category (e.g. 'sports', 'business', 'tech').
 * @param {number} currentPage - The current page number.
 * @param {number} totalResults - The total number of results for the news category.
 * @returns {string} The HTML for the pagination controls.
 */
const createPagination = (category, currentPage, totalResults) => {
    const totalPages = Math.ceil(totalResults / 5)
    return `
        <div class="pagination-home">
            <button onclick="changePage('${category}', ${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&lt</button>
            <button onclick="changePage('${category}', ${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>&gt</button>
        </div>
    `
}

/**
 * Changes the current page for a given news category.
 *
 * This function is called when the user clicks the "Previous" or "Next" button on the pagination controls. It updates the corresponding page variable (e.g. `sportsPage`, `businessPage`, `techPage`) and then fetches the news data for the new page.
 *
 * @param {string} category - The news category (e.g. 'sports', 'business', 'tech').
 * @param {number} newPage - The new page number to display.
 */
const changePage = (category, newPage) => {
    switch(category) {
        case 'sports':
            sportsPage = newPage
            fetchData('sports', 5, sportsPage).then(add_sportsNews)
            break
        case 'business':
            businessPage = newPage
            fetchData('business', 5, businessPage).then(add_businessNews)
            break
        case 'tech':
            techPage = newPage
            fetchData('technology', 5, techPage).then(add_techNews)
            break
    }
}


/**
 * Handles the user's search interactions, including displaying the search popup, performing a search, and navigating through search results pages.
 * 
 * The `searchBtn` click event listener displays the search popup when the user clicks the search button.
 * The `performSearch` click event listener performs a search when the user clicks the search button, using the value of the search input.
 * The `prevPage` and `nextPage` click event listeners allow the user to navigate through the search results pages.
 * The `backToHome` click event listener hides the search results and displays the top headlines and other page elements.
 */
searchBtn.addEventListener('click', () => {
    searchPopup.style.display = 'block';
});

performSearch.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        currentPage = 1;
        searchNews(query);
    }
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        searchNews(currentQuery, currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    searchNews(currentQuery, currentPage);
});

backToHome.addEventListener('click', () => {
    searchResults.style.display = 'none';
    document.querySelector('.topHeadlines').style.display = 'grid';
    document.querySelector('.page2').style.display = 'block';
    document.querySelector('.footer').style.display = 'block'; // Show footer

});

/**
 * Performs a search for news articles based on the provided query and page number.
 *
 * @param {string} query - The search query to use for the news search.
 * @param {number} [page=1] - The page number of the search results to retrieve.
 * @returns {Promise<void>} - A Promise that resolves when the search results have been displayed.
 */
const searchNews = async (query, page = 1) => {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&pageSize=20&page=${page}`;
    const data = await fetch(url);
    const response = await data.json();
    totalResults = response.totalResults;
    currentQuery = query;
    displaySearchResults(response.articles);
    updatePagination();
};

/**
 * Updates the pagination controls based on the current page and total number of results.
 * Disables the previous page button if on the first page, and disables the next page button if on the last page.
 */
//  this function to update pagination
const updatePagination = () => {
    const totalPages = Math.ceil(totalResults / 20);
    document.getElementById('currentPage').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
};

/**
 * Displays the search results on the page.
 *
 * @param {Object[]} articles - An array of article objects, each containing information about a news article.
 * @returns {void}
 */
//  this function to display search results
const displaySearchResults = (articles) => {
    let html = '';
    articles.forEach((article) => {
        const title = article.title.length < 100 ? article.title : article.title.slice(0, 100) + "...";
        html += `
            <div class="newsCard">
                <div class="img">
                    <img src=${article.urlToImage || 'placeholder-image-url.jpg'} alt="image">
                </div>
                <div class="text">
                    <div class="title">
                        <a href=${article.url} target="_blank"><p>${title}</p></a>
                    </div>
                </div>
            </div>
        `;
    });
    /**
     * Displays the search results on the page and hides other UI elements.
     *
     * @returns {void}
     */
    searchResultsBox.innerHTML = html;
    searchPopup.style.display = 'none';
    document.querySelector('.topHeadlines').style.display = 'none';
    document.querySelector('.page2').style.display = 'none';
    document.querySelector('.footer').style.display = 'none'; // Hide footer
    searchResults.style.display = 'block';
};