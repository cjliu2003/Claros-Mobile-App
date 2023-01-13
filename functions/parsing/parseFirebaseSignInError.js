export const parseFirebaseSignInError = (firebaseError) => {
    let error = "";
    switch (firebaseError.code) {
        case 'auth/invalid-email':
            error = "Invalid email address";
            break;
        case 'auth/user-not-found':
            error = "No user found with this email";
            break;
        case 'auth/wrong-password':
            error = "Incorrect password";
            break;
        case 'auth/too-many-requests':
            error = "Too many requests. Try again later";
            break;
        case 'auth/user-disabled':
            error = "This account has been disabled";
            break;
        default:
            error = firebaseError.message;
            break;
    }
    return error;
}
