// script.js
// Dados dos álbuns (simulação de API)
const albumsData = [
    {
        id: 'the_fame',
        title: 'The Fame',
        year: '2008',
        label: 'Interscope Records, Streamline Records',
        image: 'https://upload.wikimedia.org/wikipedia/pt/7/75/Capa_de_The_Fame_por_Lady_Gaga_%282008%29.jpg',
        tracks: ['Just Dance', 'Poker Face', 'Paparazzi']
    },
    {
        id: 'the_fame_monster',
        title: 'The Fame Monster',
        year: '2009',
        label: 'Interscope Records, Streamline Records',
        image: 'https://upload.wikimedia.org/wikipedia/pt/3/35/TheFameMonsterStandard.jpg',
        tracks: ['Bad Romance', 'Telephone', 'Alejandro']
    },
    {
        id: 'born_this_way',
        title: 'Born This Way',
        year: '2011',
        label: 'Streamline Records, Interscope Records',
        image: 'https://upload.wikimedia.org/wikipedia/pt/d/d2/Born_This_Way.jpg',
        tracks: ['Born This Way', 'Judas', 'The Edge of Glory']
    },
    {
        id: 'artpop',
        title: 'ARTPOP',
        year: '2013',
        label: 'Streamline Records, Interscope Records',
        image: 'https://upload.wikimedia.org/wikipedia/pt/e/e8/Capa_de_Artpop.png',
        tracks: ['Applause', 'G.U.Y.', 'Do What U Want']
    },
    {
        id: 'joanne',
        title: 'Joanne',
        year: '2016',
        label: 'Streamline Records, Interscope Records',
        image: 'https://upload.wikimedia.org/wikipedia/pt/c/cf/Lady_Gaga_-_Joanne.jpg',
        tracks: ['Perfect Illusion', 'Million Reasons', 'Joanne']
    },
    {
        id: 'chromatica',
        title: 'Chromatica',
        year: '2020',
        label: 'Streamline Records, Interscope Records',
        image: 'https://upload.wikimedia.org/wikipedia/pt/5/5d/Lady_Gaga_-_Chromatica.png',
        tracks: ['Stupid Love', 'Rain on Me', '911']
    },
    {
        id: 'harlequin',
        title: 'Harlequin',
        year: '2024',
        label: 'Warner Records',
        image: 'https://upload.wikimedia.org/wikipedia/pt/3/3f/Harlequin_-_Lady_Gaga.jpg',
        tracks: ['That\'s Life', 'Get Happy', 'Smile']
    },
    {
        id: 'mayhem',
        title: 'MAYHEM',
        year: '2025',
        label: 'Interscope Records',
        image: 'https://upload.wikimedia.org/wikipedia/pt/0/0a/Lady_Gaga_-_Mayhem.jpg',
        tracks: ['Abracadabra', 'Perfect Celebrity', 'Vanish Into You']
    }
];

const mainAlbumImage = document.getElementById('main-album-image');
const albumTitle = document.getElementById('album-title');
const albumYear = document.getElementById('album-year');
const albumLabel = document.getElementById('album-label');
const albumTracks = document.getElementById('album-tracks');
const albumsCarousel = document.getElementById('albums-carousel');

// Renderiza os detalhes do álbum selecionado
function renderAlbumDetails(album) {
    mainAlbumImage.src = album.image;
    mainAlbumImage.alt = `Capa do álbum ${album.title}`;
    albumTitle.textContent = album.title;
    albumYear.textContent = `Ano: ${album.year}`;
    albumLabel.textContent = `Gravadora: ${album.label}`;
    
    // Adiciona um manipulador de erro à imagem principal
    mainAlbumImage.onerror = () => {
      mainAlbumImage.src = `https://placehold.co/600x600/1a1a1a/e5e7eb?text=Capa+indisponível`;
      console.error(`Falha ao carregar a imagem do álbum: ${album.title}`);
    };
    
    // Renderiza a lista de faixas
    const tracksList = albumTracks.querySelector('ul');
    tracksList.innerHTML = '';
    album.tracks.forEach(track => {
        const li = document.createElement('li');
        li.textContent = track;
        tracksList.appendChild(li);
    });
}

// Renderiza o carrossel de álbuns
function renderAlbumsCarousel() {
    albumsData.forEach(album => {
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.classList.add('flex-shrink-0', 'w-24', 'h-24', 'sm:w-32', 'sm:h-32', 'rounded-lg', 'overflow-hidden', 'cursor-pointer', 'thumbnail-card');
        thumbnailContainer.dataset.albumId = album.id;

        const thumbnailImage = document.createElement('img');
        thumbnailImage.src = album.image;
        thumbnailImage.alt = `Capa do álbum ${album.title}`;
        thumbnailImage.classList.add('w-full', 'h-full', 'object-cover');
        
        // Adiciona um manipulador de erro para as miniaturas
        thumbnailImage.onerror = () => {
          thumbnailImage.src = `https://placehold.co/300x300/1a1a1a/e5e7eb?text=Capa+indisponível`;
          console.error(`Falha ao carregar a imagem da miniatura: ${album.title}`);
        };

        thumbnailContainer.appendChild(thumbnailImage);
        albumsCarousel.appendChild(thumbnailContainer);

        // Adiciona um evento de clique para atualizar a exibição principal
        thumbnailContainer.addEventListener('click', () => {
            renderAlbumDetails(album);
            updateActiveThumbnail(thumbnailContainer);
        });
    });
}

// Atualiza a borda do álbum ativo no carrossel
function updateActiveThumbnail(selectedThumbnail) {
    document.querySelectorAll('.thumbnail-card').forEach(thumb => {
        thumb.classList.remove('active-border');
        thumb.classList.add('border', 'border-transparent');
    });
    selectedThumbnail.classList.add('active-border');
    selectedThumbnail.classList.remove('border', 'border-transparent');
}

// Inicializa a aplicação
function init() {
    renderAlbumsCarousel();
    // Renderiza o primeiro álbum por padrão
    renderAlbumDetails(albumsData[0]);
    updateActiveThumbnail(document.querySelector('.thumbnail-card'));
}

// Inicia a aplicação após o carregamento da página
window.onload = init;