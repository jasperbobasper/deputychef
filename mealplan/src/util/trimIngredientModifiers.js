export default function trimIngredientModifiers(ingredient) {
    const lowercaseString = ingredient.toLowerCase();
    const cleanedString = lowercaseString.replace(/[,()].*$/, '');

  // Trim the string to remove spaces from the front and back
  const trimmedString = cleanedString.trim();

  return trimmedString;
}
