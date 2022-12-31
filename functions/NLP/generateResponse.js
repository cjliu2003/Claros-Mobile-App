import { containsProfanity } from "./containsProfanity"

export const generateResponse = (input) => {
    if (containsProfanity(input)) return "Please don't swear."
    return "Response"
}