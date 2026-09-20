/** Convert a Figma prototype URL to an embeddable iframe URL */
export function toFigmaEmbedUrl(figmaProtoUrl: string): string {
  const url = figmaProtoUrl.replace('www.figma.com/proto', 'embed.figma.com/proto')
  try {
    const parsed = new URL(url)
    if (!parsed.searchParams.has('embed-host')) {
      parsed.searchParams.set('embed-host', 'share')
    }
    return parsed.toString()
  } catch {
    return url
  }
}

/** Normalize embed URL back to a shareable Figma prototype link */
export function toFigmaOpenUrl(url: string): string {
  return url
    .replace('embed.figma.com/proto', 'www.figma.com/proto')
    .replace(/([?&])embed-host=[^&]*&?/g, '$1')
    .replace(/[?&]$/, '')
}

export function isFigmaProtoUrl(url: string): boolean {
  return url.includes('figma.com/proto') || url.includes('embed.figma.com/proto')
}
