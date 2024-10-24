let i = 1;
let score = 0;
let bestScore = 0;
let timeLeft = 30;
let timerInterval;
let bul = false;
let numberInterval;

function updateNumber() {
    document.getElementById('iteration').innerText = i;
    i++;
    bul = false;
}

function startNumberInterval() {
    numberInterval = setInterval(updateNumber, 500); 
}

function sprawdzanie() {
    const write = document.getElementById('wynik');
    let liczba = parseInt(document.getElementById('iteration').innerText); 

    if (timeLeft > 0) { 
        if ((liczba % 7 === 0 || liczba.toString().includes('7')) && bul === false) {
            write.innerText = 'Dobrze!';
            score++;
            bul = true; 
        } else {
            score = 0;
            write.innerText = 'Spróbuj ponownie.';
           
        }

        document.getElementById('score').innerText = 'Punkty: ' + score; 

        if (score > bestScore) {
            bestScore = score;
            document.getElementById('bestScore').innerText = 'Najlepszy wynik: ' + bestScore;
        }
    }
}

document.getElementById('check').addEventListener('click', sprawdzanie);

function startTimer() {
    let progressBar = document.getElementById('progressBar');
    timeLeft = 30;
    progressBar.style.width = '100%'; 
    progressBar.style.transition = 'none'; 

    setTimeout(() => {
        progressBar.style.transition = 'width 1s linear'; 
    }, 10);
    
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(numberInterval);
            document.getElementById('wynik').innerText = 'Czas minął! Twoje punkty: ' + score;
            document.getElementById('check').innerText = 'Zagraj ponownie';
            document.getElementById('check').removeEventListener('click', sprawdzanie);
            document.getElementById('check').addEventListener('click', restartGame);
        } else {
            timeLeft--;
            progressBar.style.width = (timeLeft / 30 * 100) + '%';
        }
    }, 1000);
}

function restartGame() {
    clearInterval(timerInterval);
    clearInterval(numberInterval); 
    document.getElementById('check').removeEventListener('click', restartGame);
    document.getElementById('check').addEventListener('click', sprawdzanie); 
    

    timeLeft = 30;
    i = 1;
    score = 0;
    
    document.getElementById('wynik').innerText = '';
    document.getElementById('score').innerText = 'Punkty: 0';
    document.getElementById('check').innerText = 'Kliknij gdy będziesz gotowy';
    document.getElementById('check').disabled = false; 

    let progressBar = document.getElementById('progressBar');
    progressBar.style.width = '100%';
    progressBar.style.transition = 'none'; 
    setTimeout(() => {
        progressBar.style.transition = 'width 1s linear'; 
    }, 10);


    startNumberInterval();
    startTimer();
    
}


startNumberInterval();
startTimer();