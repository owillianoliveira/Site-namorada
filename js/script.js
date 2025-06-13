// --- CONFIGURAÇÃO IMPORTANTE ---
const startDate = new Date(2025, 1, 14, 23, 30, 0); // Ajuste esta data para o início do seu namoro!
// --- FIM DA CONFIGURAÇÃO DO CONTADOR ---

// --- CONFIGURAÇÃO DAS IMAGENS PARA O CARROSSEL ---
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
    'images/beijinho.jpg',
    'images/elevador.jpg',
    'images/filme1.jpg',
    'images/lingua.jpg',
    'images/lingua2.jpg',
    'images/chiquinho.jpg',
    'images/churros.jpg',
    'images/betania.jpg',
    'images/chiquinho2.jpg',
    'images/carro.jpg',
    'images/linda.jpg',
    'images/bk.jpg',
    'images/vo.jpg',
    'images/vô.jpg',
    'images/abraço.jpg'
];
const slideshowIntervalTime = 5000; // Tempo em milissegundos para cada foto (5000ms = 5 segundos)
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
    console.log('Exibindo imagem: ' + images[currentImageIndex]); // Depuração
}

// --- Código para o botão "Tocar Música" ---
document.addEventListener('DOMContentLoaded', () => {
    const playMusicBtn = document.getElementById('playMusicBtn');
    const myAudio = document.getElementById('myAudio');

    if (playMusicBtn && myAudio) {
        playMusicBtn.addEventListener('click', () => {
            myAudio.play()
                .then(() => {
                    console.log('Música tocando!');
                    playMusicBtn.style.display = 'none';

                    // --- NOVO: Inicializa o carrossel AQUI, após a música começar ---
                    if (images.length > 0) {
                        slideshowImage.src = images[currentImageIndex]; // Define a primeira imagem
                        console.log('Carrossel iniciado com imagem inicial: ' + images[currentImageIndex]);
                        setInterval(changeImage, slideshowIntervalTime); // Inicia a troca automática
                    } else {
                        console.warn('Nenhuma imagem configurada para o carrossel.');
                    }
                    // --- FIM DA NOVA LÓGICA ---

                })
                .catch(error => {
                    console.error('Erro ao tentar tocar a música:', error);
                    alert('Não foi possível tocar a música. Por favor, tente novamente ou verifique se o arquivo de áudio está acessível.');
                    myAudio.controls = true; // Mostra os controles nativos do HTML5 para o usuário tentar dar play
                    playMusicBtn.style.display = 'none'; // Esconde o botão personalizado
                });
        });
    } else {
        console.error('Botão de Play (#playMusicBtn) ou elemento de áudio (#myAudio) não encontrado no HTML.');
    }
});


// --- Inicialização de Funções ---
// O contador ainda começa imediatamente na página
updateCountdown();
setInterval(updateCountdown, 1000);

// REMOVIDO: A inicialização do carrossel NÃO acontece mais aqui no carregamento da página.
// Agora ela acontece DENTRO do evento de clique do botão playMusicBtn.
/*
if (images.length > 0) {
    slideshowImage.src = images[currentImageIndex];
    console.log('Imagem inicial exibida: ' + images[currentImageIndex]);
    setInterval(changeImage, slideshowIntervalTime);
} else {
    console.warn('Nenhuma imagem configurada no array images.');
}
*/