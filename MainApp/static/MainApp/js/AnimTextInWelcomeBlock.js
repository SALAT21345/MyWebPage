    const textToType = "Мастерская Салата - Место, где можно воплотить свои мечты в реальность!";

    const typingTextElement = document.getElementById('DescriptionWelcomeBlock');

    let mainIndex = 0;
    let bonusIndex = 0;
    let charIndex = 0;
    let isTypingBonus = false;

    typingTextElement.innerHTML = '';

    function typeText() {
        if (!isTypingBonus) {
            // Печатаем основной текст
            if (mainIndex < textToType.length) {
                typingTextElement.innerHTML += textToType.charAt(mainIndex);
                mainIndex++;
                setTimeout(typeText, 30);
            } else {
                // Переход к бонусам
                isTypingBonus = true;
                typingTextElement.innerHTML += "<br>";
                setTimeout(typeText, 300);
            }
        } 
    }

    setTimeout(typeText, 1000);