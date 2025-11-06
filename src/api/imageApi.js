export async function getRandomImage() {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/randomimage", {
      headers: {
        "X-Api-Key": import.meta.env.VITE_NINJA_API_KEY,
        Accept: "image/jpg",
      },
    });

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  } catch (error) {
    console.error("Error fetching random image:", error);
  }
}
