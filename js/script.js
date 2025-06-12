// --- CONFIGURAÇÃO DO CONTADOR ---
const startDate = new Date(2025, 1, 14, 23, 30, 0); 
// --- FIM DA CONFIGURAÇÃO  ---

// --- CONFIGURAÇÃO DAS IMAGENS DO CARROSSEL ---
const mediaItems = [
    { type: 'image', src: 'images/abraco.jpg', duration: 5000 },
    { type: 'image', src: 'images/domingo.jpg', duration: 5000 },
    { type: 'image', src: 'images/festa1.jpg', duration: 5000 },
    { type: 'image', src: 'images/festa2.jpg', duration: 5000 }, 
    { type: 'image', src: 'images/igreja.jpg', duration: 5000 },
    { type: 'image', src: 'images/jantar.jpg', duration: 5000 },
    { type: 'image', src: 'images/lagoa1.jpg', duration: 5000 },
    { type: 'image', src: 'images/lagoa2.jpg', duration: 5000 },
    { type: 'image', src: 'images/pastel.jpg', duration: 5000 },
    { type: 'image', src: 'images/pastelSorriso.jpg', duration: 5000 },
    { type: 'image', src: 'images/pedido.jpg', duration: 5000 }
];
// --- FIM DA CONFIGURAÇÃO DE MÍDIA ---


// --- Código do Contador (Permanece o mesmo) ---
function updateCountdown() {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    const secondsTotal = Math.floor(diff / 1000);
    const minutesTotal = Math.floor(secondsTotal / 60);
    const hoursTotal = Math.floor(minutesTotal / 60);
    const daysTotal = Math.floor(hoursTotal / 24);

    const years = Math.floor(daysTotal / 365.25);
    const remainingDaysAfterYears = daysTotal % 365.25;
    const months = Math.floor(remainingDaysAfterYears / 30.44);

    const days = Math.floor(remainingDaysAfterYears % 30.44);
    const hours = hoursTotal % 24;
    const minutes = minutesTotal % 60;
    const seconds = secondsTotal % 60;

    document.getElementById('years').innerText = String(years).padStart(2, '0');
    document.getElementById('months').innerText = String(months).padStart(2, '0');
    document.getElementById('days').innerText = String(days).padStart(2, '0');

    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// --- Código do Carrossel de Mídia (Fotos) ---
let currentMediaIndex = 0;
let slideshowTimer;

function showMedia(index) {
    const mediaContent = document.getElementById('media-content');
    const item = mediaItems[index];

    mediaContent.innerHTML = '';
    clearTimeout(slideshowTimer);

    if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = 'Foto do Casal'; 
        mediaContent.appendChild(img);
        slideshowTimer = setTimeout(nextMedia, item.duration);
    }
    // Se você não for usar vídeos, pode remover a parte 'else if (item.type === 'video')'
    // Se for usar, mantenha e configure corretamente.
}

function nextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
    showMedia(currentMediaIndex);
}

// --- Código para o botão "Desmutar Música" ---
document.addEventListener('DOMContentLoaded', () => {
    const unmuteMusicBtn = document.getElementById('unmuteMusicBtn');
    const myAudio = document.getElementById('myAudio'); 

    // Tentar tocar a música assim que a página carregar (mutada)
    // Embora tenhamos 'autoplay' no HTML, chamar .play() aqui pode ser um fallback
    // para garantir que ela realmente comece a tocar mutada em alguns navegadores.
    myAudio.play()
        .then(() => {
            console.log('Música iniciada mutada automaticamente.');
            // Se o botão de desmutar for clicado, remove o mute
            if (unmuteMusicBtn) {
                unmuteMusicBtn.addEventListener('click', () => {
                    myAudio.muted = false; // Desmuta o áudio
                    console.log('Música desmutada!');
                    unmuteMusicBtn.style.display = 'none'; // Esconde o botão após desmutar
                });
            }
        })
        .catch(error => {
            console.error('Erro ao tentar iniciar música mutada automaticamente:', error);
            // Se autoplay mutado falhar, pode ser necessário mostrar o botão de desmutar/play
            // e talvez até os controles nativos do áudio.
            if (unmuteMusicBtn) {
                unmuteMusicBtn.style.display = 'block'; // Garante que o botão apareça
            }
        });
});


// --- Inicialização de Funções ---
// Inicia o contador
updateCountdown();
setInterval(updateCountdown, 1000);

// Inicia o carrossel (mostra a primeira mídia e então o timer começa)
showMedia(currentMediaIndex);