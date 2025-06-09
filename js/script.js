// --- CONFIGURAÇÃO DO CONTADOR ---
const startDate = new Date(2024, 1, 14, 23, 30, 0); 
// --- FIM DA CONFIGURAÇÃO  ---

// --- CONFIGURAÇÃO DAS IMAGENS DO CARROSSEL ---
const images = [
    'images/abraco.jpg',
    'images/domingo.jpg',
    'images/festa1.jpg',
    'images/festa2.jpg', 
    'images/igreja.jpg',
    'images/jantar.jpg',
    'images/lagoa1.jpg',
    'images/lagoa2.jpg',
    'images/pastel.jpg',
    'images/pastelSorriso.jpg',
    'images/pedido.jpg'
];
// --- CONFIGURAÇÃO DO TEMPO DE CADA IMAGEM ---
const slideshowIntervalTime = 3000; 
// --- FIM DA CONFIGURAÇÃO DO CARROSSEL ---

// --- Código do Contador ---
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

// --- Código do Carrossel de Fotos ---
let currentImageIndex = 0;
const slideshowImage = document.getElementById('slideshow-image');

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    slideshowImage.src = images[currentImageIndex];
}

// --- Código para o botão "Tocar Música" (Ativado e Configurado para MP3) ---
document.addEventListener('DOMContentLoaded', () => {
    const playMusicBtn = document.getElementById('playMusicBtn');
    const myAudio = document.getElementById('myAudio'); // Pega o elemento de áudio HTML5

    if (playMusicBtn && myAudio) { // Verifica se ambos os elementos foram encontrados no HTML
        playMusicBtn.addEventListener('click', () => {
            myAudio.play() // Tenta reproduzir o áudio
                .then(() => {
                    // Áudio reproduzido com sucesso
                    console.log('Música tocando!');
                    // Opcional: Esconde o botão após o clique para indicar que a música está tocando
                    playMusicBtn.style.display = 'none'; 
                    // myAudio.controls = false; // Se quiser esconder os controles do player HTML5 após o play
                })
                .catch(error => {
                    // Erro na reprodução (geralmente por bloqueio de autoplay sem interação, ou erro de carregamento)
                    console.error('Erro ao tentar tocar a música:', error);
                    alert('Não foi possível tocar a música automaticamente. Por favor, interaja mais com a página ou verifique se o arquivo de áudio está acessível.');
                    // Em caso de falha, podemos mostrar os controles do player HTML5 para que o usuário tente manualmente
                    myAudio.controls = true; // Mostra os controles nativos do HTML5 para o usuário tentar dar play
                    playMusicBtn.style.display = 'none'; // Esconde o botão personalizado
                });
        });
    }
});


// --- Inicialização de Funções ---
// Inicia o contador
updateCountdown();
setInterval(updateCountdown, 1000);

// Inicia o carrossel
setInterval(changeImage, slideshowIntervalTime);