export interface Experiment {
  id: string
  title: string
  description?: string
  tags?: string[]
  /** Path to video file (mp4 recommended) */
  videoSrc?: string
  /** Poster image shown before video loads */
  poster?: string
  /** 'portrait' for mobile recordings, 'landscape' for wide videos. Defaults to 'landscape'. */
  orientation?: 'portrait' | 'landscape'
}

export const experiments: Experiment[] = [
  {
    id: 'parking-app-concept',
    title: 'Parking App Concept',
    description: 'An interaction exploration for a parking-finding mobile experience.',
    tags: ['Mobile', 'Interaction', 'Prototype'],
    videoSrc: '/video/parking-app-concept.mp4',
    orientation: 'portrait',
  },
  {
    id: 'e-mosque-concept',
    title: 'E-Mosque Concept',
    description: 'A concept exploration for a digital mosque experience.',
    tags: ['Mobile', 'Concept', 'Prototype'],
    videoSrc: '/video/e-mosque-concept.webm',
    orientation: 'portrait',
  },
]
