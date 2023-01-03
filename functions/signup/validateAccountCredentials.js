import { containsProfanity } from "../NLP/contentModeration"

export const validateAccountCredentials = (nickname, email, password, confirmPassword) => {
    if (nickname === "" || email === "" || password === "" || confirmPassword === "") {
        return "Please ensure all fields are filled."
    } else if (password !== confirmPassword) {
        return "Passwords must match."
    } else if (containsProfanity(nickname)) {
        return "Please no profanity in your nickname."
    } else {
        return "None"
    }
}