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











// Função para upload de GIF
function uploadGIF() {
    const fileInput = document.getElementById('gifUpload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Selecione um arquivo GIF para fazer o upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', API_KEY);

    fetch('https://upload.giphy.com/v1/gifs', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.meta.status === 200) {
            console.log('Upload realizado com sucesso! ID do GIF: ' + data.data.id)
        } else {
            console.log('Erro ao enviar o GIF.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Falha ao enviar o GIF.');
    });
}



//exemplo de id: FAy18i3zF84FwlkyxH




function buscarGIFPorID() {
    const gifId = document.getElementById('gifIdInput').value;
    if (!gifId) {
        alert('Digite um ID de GIF para buscar.');
        return;
    }

    const API_URL = `https://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (!data.data) {
                alert('GIF não encontrado.');
                return;
            }
            const gif = data.data;
            const container = document.getElementById('gifContainer');
            container.innerHTML = `
                <div class="gif">
                    <img src="${gif.images.fixed_height.url}" alt="GIF">
                </div>
            `;
        })
        .catch(error => {
            console.error('Erro ao buscar GIF:', error);
            alert('Falha ao buscar o GIF.');
        });
}






document.addEventListener('DOMContentLoaded', exibirFavoritos);