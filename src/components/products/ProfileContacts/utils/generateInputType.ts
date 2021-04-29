export const generateInputType = (input: string) => {
  switch (input) {
    case "phone":
      return "tel";
    case "email":
      return "email";
    default:
      return "text";
  }
};
