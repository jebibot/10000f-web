export function getChannelUrl(username: string) {
  return `https://www.twitch.tv/${username}`;
}

export function getThumbnailUrl(username: string, w: number) {
  return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${username}-${w}x${Math.round(
    (w * 9) / 16,
  )}.jpg`;
}

export function getEmbedUrl(username: string) {
  return `https://embed.twitch.tv/?channel=${username}&parent=${process.env.NEXT_PUBLIC_HOSTNAME}&theme=dark&width=100%25`;
}
