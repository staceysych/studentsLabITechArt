export const generateBtnText = (action: string) => {
  switch (action) {
    case "edit-game":
      return "Edit game";
    default:
      return "Add game";
  }
};
