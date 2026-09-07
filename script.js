// نظام تبديل لغة التعلم
function setLanguage(lang, event) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    const desc = document.getElementById('langDesc');
    if (desc) {
        if (lang === 'jp') desc.innerText = "حالياً، أنت تستعرض محتوى اللغة اليابانية 🇯🇵";
        if (lang === 'tr') desc.innerText = "حالياً، أنت تستعرض محتوى اللغة التركية 🇹🇷";
        if (lang === 'en') desc.innerText = "حالياً، أنت تستعرض محتوى اللغة الإنجليزية 🇺🇸";
    }
    
    localStorage.setItem('learningLang', lang);
}

// كود الصوتيات المطور
let currentAudio = null;

function playSound(soundName) {
    if (!soundName) return;

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // تم تعديل المسار هنا ليتطابق مع اسم المجلد عندك (sond)
    // إذا كانت الملفات مباشرة داخل sond:
    const audioPath = `sond/${soundName.trim()}.mp3`;

    // (ملاحظة: إذا كنت تضع داخل sond مجلد باسم jp، اجعل السطر هكذا:
    // const audioPath = `sond/jp/${soundName.trim()}.mp3`; )

    currentAudio = new Audio(audioPath);

    currentAudio.play().catch(error => {
        console.error("لم يتم تشغيل الصوت! المسار المطلوب غير موجود:", audioPath);
        console.error("تفاصيل الخطأ:", error);
    });
}

// تفعيل الضغط بعد تحميل الصفحة بالكامل لضمان عملها
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".letter").forEach(letter => {
        letter.addEventListener("click", () => {
            const sound = letter.dataset.sound;
            playSound(sound);
            
            document.querySelectorAll(".letter").forEach(l => l.classList.remove("active"));
            letter.classList.add("active");
        });
    });
});
