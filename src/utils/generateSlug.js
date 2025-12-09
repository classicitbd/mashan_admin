export const generateSlug = (slugName) => {
  return slugName
    .toLowerCase() // Convert to lowercase
    .replace(/ /g, "-") // Replace spaces with dashes
    .replace(/[^\u0980-\u09FFa-z0-9-]/g, "");
};
