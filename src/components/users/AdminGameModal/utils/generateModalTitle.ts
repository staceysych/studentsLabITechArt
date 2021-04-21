export const generateModalTitle = (action: string) => {
  switch (action) {
    case "edit-game":
      return "Edit game";
    default:
      return "Add a new game";
  }
};
