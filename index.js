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





// fetching news data from a website providing api

const apiKey = "1fddc8c9987a48b683e9943b3f28a7bc"


const fetchData = async (category,pageSize)=>{
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`
    const data = await fetch(url)
    console.log(data);
    const response = await data.json()
    console.log(response);
    return response.articles
    
}
// fetchData('general',5)

//adding breaking news

const add_breakingNews = (data)=>{
    breakingImg.innerHTML = `<img src=${data[0].urlToImage} alt="image">`
    breakingNews_title.innerHTML = `<a href=${data[0].url} target="_blank"><h2>${data[0].title}</h2></a>`
    breakingNews_desc.innerHTML = `${data[0].description}`
}
fetchData('general',5).then(add_breakingNews)

const add_topNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
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

const add_sportsNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
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
    sportsNews.innerHTML = html
}
fetchData('sports',5).then(add_sportsNews)
const add_businessNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
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
    businessNews.innerHTML = html
}
fetchData('business',5).then(add_businessNews)
const add_techNews = (data)=>{
    let html = ''
    let title = ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
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
    techNews.innerHTML = html
}
fetchData('technology',5).then(add_techNews)

//  these event listeners after the existing ones
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

// this function to perform the search
const searchNews = async (query, page = 1) => {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&pageSize=20&page=${page}`;
    const data = await fetch(url);
    const response = await data.json();
    totalResults = response.totalResults;
    currentQuery = query;
    displaySearchResults(response.articles);
    updatePagination();
};

//  this function to update pagination
const updatePagination = () => {
    const totalPages = Math.ceil(totalResults / 20);
    document.getElementById('currentPage').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
};

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
    searchResultsBox.innerHTML = html;
    searchPopup.style.display = 'none';
    document.querySelector('.topHeadlines').style.display = 'none';
    document.querySelector('.page2').style.display = 'none';
    document.querySelector('.footer').style.display = 'none'; // Hide footer
    searchResults.style.display = 'block';
};