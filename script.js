// نظام تبديل لغة التعلم
function setLanguage(lang, event) {
    // إزالة التفعيل عن الأزرار
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    
    // إضافة التفعيل للزر المختار بأمان
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    const desc = document.getElementById('langDesc');
    if (desc) {
        if (lang === 'jp') desc.innerText = "حالياً، أنت تستعرض محتوى اللغة اليابانية 🇯🇵";
        if (lang === 'tr') desc.innerText = "حالياً، أنت تستعرض محتوى اللغة التركية 🇹🇷";
        if (lang === 'en') desc.innerText = "حالياً، أنت تستعرض محتوى اللغة الإنجليزية 🇺🇸";
    }
    
    // حفظ اللغة المختارة
    localStorage.setItem('learningLang', lang);
}

// كود الصوتيات المطور
let currentAudio = null;

function playSound(soundName) {
    if (!soundName) return;

    // Varsayılan dil 'jp'
    const lang = (localStorage.getItem('learningLang') || 'jp').toLowerCase();
    
    // Önceki çalan sesi durdur ve başa al
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Klasör adı 'sounds' olarak ayarlandı
    const audioPath = `sounds/${lang}/${soundName.trim()}.mp3`;
    currentAudio = new Audio(audioPath);

    currentAudio.play().catch(error => {
        console.error("Ses çalınamadı! Aranan dosya yolu:", audioPath);
        console.error("Hata ayrıntısı:", error);
    });
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
