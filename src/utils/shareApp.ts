export const shareApp = async () => {
  const shareData = {
    title: "VerbUp – Learn Irregular Verbs",
    text: "Learn irregular verbs in a fun and interactive way! 🚀",
    url: window.location.origin,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.log("Share cancelled or failed", error);
    }
  } else {
    // fallback — копіюємо лінк
    try {
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  }
};