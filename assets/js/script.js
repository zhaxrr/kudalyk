const countdown = document.getElementById("countdown");
const eventDate = new Date("2026-08-23T12:00:00+05:00").getTime();

setInterval(() => {
    let now = new Date().getTime();
    let diff = eventDate - now;

    let d = Math.floor(diff / (1000 * 60 * 60 * 24));
    let h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let m = Math.floor((diff / (1000 * 60)) % 60);

    if (diff < 0) {
        countdown.innerHTML = "<b style='font-size: 1.5rem; color: #8e6d3d;'>Той басталды!</b>";
        return;
    }

    countdown.innerHTML = `
        <div class="time-box"><span>${d}</span><small>күн</small></div>
        <div class="time-box"><span>${h}</span><small>сағат</small></div>
        <div class="time-box"><span>${m}</span><small>минут</small></div>
    `;
}, 1000);

const sections = document.querySelectorAll(".section-wrap");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));


// --- ПЛЕЕР ---
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    if (music.paused) {
        music.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        music.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// --- ФОРМА ---
function checkStatus() {
    const status = document.getElementById('attendance_status').value;
    const group = document.getElementById('guest-input-group');
    group.style.display = (status === 'Өкінішке орай, келе алмаймын') ? 'none' : 'block';
}

document.getElementById('tg-form').onsubmit = async (e) => {
    e.preventDefault();
    
    // ДАННЫЕ БОТА (ВСТАВЬ СВОИ)
    const token = "8637725900:AAHlW9VsiGZnVfQqtUhV1iAyKUCdvKI34zQ";
    const chat_id = "409251921";

    const name = document.getElementById('user_name').value;
    const status = document.getElementById('attendance_status').value;
    const count = document.getElementById('guest_count').value;

    const message = `
🔔 *Жаңа жауап (Құдалық - аралас шай)*
👤 Аты: ${name}
📌 Жауабы: ${status}
👥 Адам саны: ${status.includes('келе алмаймын') ? '-' : count}
    `.trim();

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chat_id,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (response.ok) {
            alert("Жауабыңыз қабылданды! Рахмет.");
            e.target.reset();
        }
    } catch (error) {
        alert("Қате! Интернетті тексеріңіз.");
    }
};

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const musicText = document.querySelector('.music-text');

    if (music.paused) {
        music.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        musicText.innerText = "Музыканы өшіру"; // Меняем текст
    } else {
        music.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        musicText.innerText = "Музыканы қосу"; // Возвращаем текст
    }
}