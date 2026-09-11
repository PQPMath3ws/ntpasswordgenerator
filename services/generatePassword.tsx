import PasswordCombinationsInterface from "../types/password";

export default function GeneratePassword(
  settings: PasswordCombinationsInterface,
): string {
  const charactersDefaults = {
    upperCaseCharacters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCaseCharacters: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    specialCharacters: `!@#$&*'"-_=+`,
  };

  let allowedCharacters: string = "";
  let generatedPassword: string = "";

  if (settings.hasLowerCaseCharacters)
    allowedCharacters += charactersDefaults.lowerCaseCharacters;
  if (settings.hasUpperCaseCharacters)
    allowedCharacters += charactersDefaults.upperCaseCharacters;
  if (settings.hasNumbers) allowedCharacters += charactersDefaults.numbers;
  if (settings.hasSpecialCharacters)
    allowedCharacters += charactersDefaults.specialCharacters;

  while (generatedPassword.length < settings.passwordLength) {
    const selectedIndex = Math.floor(Math.random() * allowedCharacters.length);
    if (allowedCharacters[selectedIndex] !== undefined) {
      generatedPassword += allowedCharacters[selectedIndex];
      if (!settings.canRepeatCharacters) {
        const newAllowedCharacters: string[] = allowedCharacters.split("");
        newAllowedCharacters.splice(selectedIndex, 1);
        allowedCharacters = newAllowedCharacters.join("");
      }
    }
  }

  return generatedPassword;
}
