export default async function getInstagramFeed(): Promise<unknown> {
  const response = await fetch("/api/instagram-feed");
  const data = await response.json();
  return data;
}
