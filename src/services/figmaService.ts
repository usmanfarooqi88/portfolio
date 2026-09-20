export interface FigmaThumbnailResponse {
  err?: string
  images: Record<string, string | null>
}

export class FigmaService {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  /** Extract file key from figma.com or embed.figma.com prototype URLs */
  extractFileKey(figmaUrl: string): string | null {
    const match = figmaUrl.match(/figma\.com\/proto\/([a-zA-Z0-9]+)/)
    return match ? match[1] : null
  }

  /** Convert node-id=1-102 from URL to API format 1:102 */
  extractNodeId(figmaUrl: string): string | null {
    const match = figmaUrl.match(/node-id=([^&]+)/)
    if (!match) return null
    return decodeURIComponent(match[1]).replace(/-/g, ':')
  }

  getSourceUrl(project: { embedUrl?: string; figmaUrl?: string }): string | null {
    return project.embedUrl ?? project.figmaUrl ?? null
  }

  async getThumbnail(fileKey: string, nodeId: string, scale = 2): Promise<string | null> {
    if (!this.accessToken) return null

    try {
      const url = `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=png&scale=${scale}`

      const response = await fetch(url, {
        headers: { 'X-Figma-Token': this.accessToken },
      })

      if (!response.ok) {
        console.error(`Figma API error (${response.status}) for ${fileKey}`)
        return null
      }

      const data = (await response.json()) as FigmaThumbnailResponse
      if (data.err) {
        console.error('Figma API error:', data.err)
        return null
      }

      return data.images[nodeId] ?? null
    } catch (error) {
      console.error('Error fetching Figma thumbnail:', error)
      return null
    }
  }

  async getThumbnailsBatch(
    fileKey: string,
    nodeIds: string[],
    scale = 2,
  ): Promise<Record<string, string | null>> {
    if (!this.accessToken || nodeIds.length === 0) return {}

    const idsParam = encodeURIComponent(nodeIds.join(','))
    const url = `https://api.figma.com/v1/images/${fileKey}?ids=${idsParam}&format=png&scale=${scale}`

    try {
      const response = await fetch(url, {
        headers: { 'X-Figma-Token': this.accessToken },
      })

      if (!response.ok) {
        console.error(`Figma batch API error (${response.status}) for ${fileKey}`)
        return {}
      }

      const data = (await response.json()) as FigmaThumbnailResponse
      return data.images ?? {}
    } catch (error) {
      console.error('Error fetching Figma batch thumbnails:', error)
      return {}
    }
  }

  async getThumbnailFromUrl(figmaUrl: string, scale = 2): Promise<string | null> {
    const fileKey = this.extractFileKey(figmaUrl)
    const nodeId = this.extractNodeId(figmaUrl)

    if (!fileKey || !nodeId) {
      console.error('Could not parse Figma URL:', figmaUrl)
      return null
    }

    return this.getThumbnail(fileKey, nodeId, scale)
  }
}
