export async function getQoutesData() {
  try {
    const response = await fetch(
      "https://random-quotes-freeapi.vercel.app/api/random"
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote data:", error);
  }
}
