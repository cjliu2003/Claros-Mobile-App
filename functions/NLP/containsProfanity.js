export const containsProfanity = (input) => {
    let lowercaseInput = input.toLowerCase()
    if (lowercaseInput.includes("fuck")) return true
    if (lowercaseInput.includes("shit")) return true
    if (lowercaseInput.includes("bitch")) return true
    if (lowercaseInput.includes("damn")) return true
    if (lowercaseInput.includes("slut")) return true
}