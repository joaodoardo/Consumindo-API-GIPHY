const API_KEY = 'i6M1NEe3ZFD1kw0761wOdD2EFUtPffTq';
const QUANTIDADE = 10;

function randomGIFs() {

    const search = document.getElementById('search')
    const API_URLRandom = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${search.value}`;
    const container = document.getElementById('gifContainer');
    container.innerHTML = '';

    for (let index = 0; index < QUANTIDADE; index++) {
        fetch(API_URLRandom)
        .then(response => response.json())
        .then(data => {
            const gif = data.data;
            const div = document.createElement('div');
            div.className = 'gif';
            div.innerHTML = `
                <img src="${gif.images.fixed_height.url}" alt="GIF">
                <button onclick="favoritarGIF('${gif.id}', '${gif.images.fixed_height.url}')" class="favbtn"></button>
            `;
            container.appendChild(div);
          
        });
    }
}

function buscarGIFs() {

    const search = document.getElementById('search')
    const API_URLBusca = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search.value}&limit=${QUANTIDADE}`;
    
    fetch(API_URLBusca)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('gifContainer');
            container.innerHTML = '';
        
            data.data.forEach(gif => { 
                const div = document.createElement('div');
                div.className = 'gif';
                div.innerHTML = `
                    <img src="${gif.images.fixed_height.url}" alt="GIF">
                    <button onclick="favoritarGIF('${gif.id}', '${gif.images.fixed_height.url}')" class="favbtn"></button>
                `;
                container.appendChild(div); 
            });
    });

}

function favoritarGIF(id, url) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (!favoritos.find(gif => gif.id === id)) {
        favoritos.push({ id, url });
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        exibirFavoritos();
    }
}

function removerFavorito(id) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos = favoritos.filter(gif => gif.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    exibirFavoritos();
}

function exibirFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const container = document.getElementById('favoritosContainer');
    container.innerHTML = '';
    favoritos.forEach(gif => {
        const div = document.createElement('div');
        div.className = 'gif';
        div.innerHTML = `
            <img src="${gif.url}" alt="GIF Favorito">
            <button onclick="removerFavorito('${gif.id}')" class="rmvfavbtn"></button>
        `;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', exibirFavoritos);