export const validateCredentials = (email, password, confirmPassword) => {
    if (email === "" || password === "" || confirmPassword === "") {
        return "Please ensure all fields are filled."
    } else if (password !== confirmPassword) {
        return "Passwords must match."
    } else {
        return null
    }
}