// Знаходимо елементи бота та хмарки
const bot = document.getElementById('bot-container');
const bubble = document.getElementById('bot-bubble');

// Список рандомних фраз (англійською)
const messages = [
    "I'm a Frontend Bot!",
    "Let's build something.",
    "IT Step was my foundation.",
    "SQL is also cool!",
    "Check my education below!",
    "Nice to meet you!"
];

let bubbleTimeout; // Змінна для керування часом показу тексту

// --- ФУНКЦІЯ ПОКАЗУ ТЕКСТУ З АНІМАЦІЄЮ ---
const showBubble = (text) => {
    // Якщо текст уже показується, нічого не робимо
    if (bubble.classList.contains('bubble-visible')) return;

    bubble.innerText = text;
    
    // Прибираємо клас приховання (якщо він був) і додаємо клас анімації
    bubble.classList.remove('hidden');
    bubble.classList.add('bubble-visible');

    // Очищаємо попередні таймери
    clearTimeout(bubbleTimeout);

    // Через 3 секунди прибираємо анімацію
    bubbleTimeout = setTimeout(() => {
        bubble.classList.remove('bubble-visible');
    }, 3000);
};

// --- КЛІК ПО БОТУ ---
bot.addEventListener('click', () => {
    // Якщо бот невидимий (через малий екран), клік не працює
    if (bot.style.opacity === "0") return;

    const msg = messages[Math.floor(Math.random() * messages.length)];
    showBubble(msg);
});

// --- ЛОГІКА ЗМІНИ РОЗМІРУ ВІКНА (RESIZE) ---
window.addEventListener('resize', () => {
    const width = window.innerWidth;

    if (width < 380) {
        // Стадія 1: Повністю зникає (ширина < 380px)
        bubble.innerText = "noooo";
        bubble.classList.add('hidden'); // Ховаємо хмарку відразу
        bubble.classList.remove('bubble-visible');
        bot.style.opacity = "0";
        bot.style.pointerEvents = "none";
        bot.classList.remove('shake'); 
    } 
    else if (width >= 380 && width < 420) {
        // Стадія 2: Попередження + ТРЕМТІННЯ (між 380px та 420px)
        bubble.innerText = "Stop! I'm vanishing!";
        bubble.classList.remove('hidden');
        bubble.classList.add('bubble-visible');
        bot.style.opacity = "1";
        bot.style.pointerEvents = "auto";
        bot.classList.add('shake'); 
    } 
    else {
        // Стадія 3: Нормальний стан (ширина > 420px)
        bot.style.opacity = "1";
        bot.style.pointerEvents = "auto";
        bot.classList.remove('shake');
        
        // Ховаємо хмарку паніки, якщо вона була
        if (bubble.innerText === "Stop! I'm vanishing!" || bubble.innerText === "noooo") {
            bubble.classList.remove('bubble-visible');
            bubble.classList.add('hidden');
        }
    }
});

// --- ЛОГІКА ПОЯВИ ЕЛЕМЕНТІВ ПРИ СКРОЛІ (SCROLL REVEAL) ---
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        
        // Визначаємо "точку активації" (100px від низу екрана)
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        } else {
            // Опціонально: прибирати клас, щоб анімація спрацьовувала знову при скролі вгору
            // el.classList.remove('active');
        }
    });
};

// Запускаємо функцію при кожному скролі
window.addEventListener('scroll', revealOnScroll);

// Також запускаємо один раз при завантаженні, щоб показати перші елементи
revealOnScroll();
