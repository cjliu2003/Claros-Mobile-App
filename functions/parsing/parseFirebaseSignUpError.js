export const parseFirebaseSignUpError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Enable them in the Firebase Console.';
      case 'auth/weak-password':
        return 'The password is not strong enough. Please choose a stronger password.';
      default:
        return 'An error occurred while creating the account. Please try again later.';
    }
  }
  