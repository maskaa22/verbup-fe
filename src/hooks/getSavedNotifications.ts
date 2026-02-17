export const getSavedNotifications = () => {
  return JSON.parse(localStorage.getItem("notifications") || "{}");
};
