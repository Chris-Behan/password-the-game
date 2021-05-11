function removeDuplicates(words) {
    const uniqueWords = []
    for (let i = 0; i < words.length; i++) {
        if (!uniqueWords.includes(words[i])) {
            uniqueWords.push(words[i])
        }
    }
    return uniqueWords;
}

function capitalizeWords(words) {
    const upperCaseWords = []
    for (let i = 0; i < words.length; i++) {
        const word = words[i]
        cWord = word.charAt(0).toUpperCase() + word.slice(1);
        upperCaseWords.push(cWord)
    }
    return upperCaseWords
}
)