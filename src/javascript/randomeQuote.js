const generateQuote = function() {
    const quotes = [
    {
        quote: "Remember purposeful action",
    },
    {
        quote: "Authenticity is rebellion",
    },
    {
        quote: "Unleash your monster",
    },
    {
        quote: "Grit fuels your journey",
    },
    {
        quote: "You are always worthy",
    },
    {
        quote: "Just blame the system",
    },
    {
        quote: "Show up with empathy",
    },
    {
        quote: "Embrace the chaos and flow",
    }
];

    let arrayIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("phrases-text").innerHTML = quotes[arrayIndex].quote;
}

window.onload = function() {
    generateQuote();
    document.getElementById("change-phrases").addEventListener('click', generateQuote);
} 