export default interface PasswordCombinationsInterface {
  passwordLength: number;
  hasLowerCaseCharacters: boolean;
  hasUpperCaseCharacters: boolean;
  hasNumbers: boolean;
  hasSpecialCharacters: boolean;
  canRepeatCharacters: boolean;
}
