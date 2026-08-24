// نظام تبديل لغة التعلم
function setLanguage(lang) {
    // إزالة التفعيل عن الأزرار
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    
    // إضافة التفعيل للزر المختار
    event.target.classList.add('active');

    const desc = document.getElementById('langDesc');
    if(lang === 'jp') desc.innerText = "حالياً، أنت تستعرض محتوى اللغة اليابانية 🇯🇵";
    if(lang === 'tr') desc.innerText = "حالياً، أنت تستعرض محتوى اللغة التركية 🇹🇷";
    if(lang === 'en') desc.innerText = "حالياً، أنت تستعرض محتوى اللغة الإنجليزية 🇺🇸";
    
    // هنا يمكننا إضافة كود لتحميل محتوى اللغة المختار من ملف JSON
    localStorage.setItem('learningLang', lang);
}

// كود الصوتيات المطور من ملفك الأصلي
let currentAudio = null;

function playSound(soundName) {
    const lang = localStorage.getItem('learningLang') || 'jp';
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // يبحث عن الصوت بناءً على اللغة المختارة (مثلاً: sounds/jp/ka.mp3)
    currentAudio = new Audio(`sounds/${lang}/${soundName}.mp3`);
    currentAudio.play().catch(e => console.log("ملف الصوت غير موجود لهذا المسار"));
}

// تفعيل ضغطة الحروف
document.querySelectorAll(".letter").forEach(letter => {
    letter.addEventListener("click", () => {
        const sound = letter.dataset.sound;
        playSound(sound);
        
        document.querySelectorAll(".letter").forEach(l => l.classList.remove("active"));
        letter.classList.add("active");
    });
});