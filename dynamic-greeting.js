const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜßÇË0123456789";
const greetings = [
    "Hallo", // German
    "Përshëndetje", // Albanian
    "مرحبًا", //Arabic
    "Salam", // Azerbaijani
    "হ্যালো", // Bengali
    "Zdravo", // Bosnian
    "Здравейте", // Bulgarian
    "你好", // Chinese
    "Hola", // Spanish
    "Ahoj", // Czech
    "Hej", // Danish
    "Hoi", // Dutch
    "Tere", // Estonian
    "Kumusta", // Filipino
    "Hei", // Finnish
    "Bonjour", // French
    "Dia dhuit", // Irish
    "Ola", // Galician
    "გამარჯობა", // Georgian
    "γεια", // Greek
    "Aloha", // Hawaiian
    "שלום", //Hebrew
    "नमस्ते", // Hindi
    "Szia", // Hungarian
    "Halló", // Icelandic
    "Ciao", // Italian
    "こんにちは", // Japanese
    "Сәлеметсіз бе", // Kazakh
    "안녕하세요", // Korean
    "Salve", // Latin
    "Sveiki", // Latvian
    "Sveik(a/s)", // Lithuanian
    "Moien", // Luxembourgish
    "Kia Ora", // Maori
    "Привет", // Russian
    "Hallå", // Swedish
    "Li-hó", // Taiwanese
    "வணக்கம்", // Tamil
    "สวัสดี", // Thai
    "Merhaba", // Turkish
    "السلام عليكم", // Urdu
    "Xin chào", // Vietnamese
].map((greeting) => greeting.toUpperCase());

const longestGreetingLength = greetings.reduce((maxLength, greeting) => {
    return Math.max(maxLength, greeting.length);
}, 0);

const badLuckProtection = 10;
const usedGreetings = [
    "Hello", // English
];

const dynamicGreetingElement = document.querySelector(".dynamic-greeting");

function shuffleText() {
    const randomGreeting =
        greetings[Math.floor(Math.random() * greetings.length)];
    dynamicGreetingElement.dataset.value = randomGreeting;
    dynamicGreetingElement.innerText = randomGreeting.padEnd(
        longestGreetingLength,
        " "
    );
    usedGreetings.push(randomGreeting);
    if (usedGreetings.length >= badLuckProtection) {
        greetings.push(usedGreetings.shift());
    }
    greetings.splice(greetings.indexOf(randomGreeting), 1);

    let iterations = 0;
    const interval = setInterval(() => {
        dynamicGreetingElement.innerText = dynamicGreetingElement.innerText
            .split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return dynamicGreetingElement.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

        if (iterations >= longestGreetingLength) {
            clearInterval(interval);
            setTimeout(() => {
                const randomGreeting =
                    greetings[Math.floor(Math.random() * greetings.length)];
                dynamicGreetingElement.dataset.value = randomGreeting;
                dynamicGreetingElement.innerText = randomGreeting.padEnd(
                    longestGreetingLength,
                    " "
                );
                shuffleText();
            }, 2000); // Stay still for 2 seconds before shuffling again
        }

        iterations += 1 / 3;
    }, 30);
}

setTimeout(() => {
    shuffleText();
}, 3000);
