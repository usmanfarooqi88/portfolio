/**
 * ThreeAvatar — 3D rigged bust with cursor-follow head rotation.
 *
 * Bone hierarchy in usman-rigged.glb:
 *   Root → Spine → Neck → Head
 *
 * Cursor behaviour:
 *   Head  rotates ±15° yaw (Y) / ±8° pitch (X)
 *   Neck  rotates ±5°  yaw          (subtle)
 *   Both lerped each frame for smooth easing
 */

import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const MODEL_URL = '/3d/usman-rigged.glb'

// Preload so there's no pop on mount
useGLTF.preload(MODEL_URL)

const DEG = Math.PI / 180

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function ThreeAvatarScene() {
  const { scene } = useGLTF(MODEL_URL)
  const reduced = usePrefersReducedMotion()

  // Bone refs
  const headRef  = useRef<THREE.Bone | null>(null)
  const neckRef  = useRef<THREE.Bone | null>(null)

  // Current mouse target (normalised -1..1)
  const mouse = useRef({ x: 0, y: 0 })

  // Find bones once scene loads
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Bone) {
        if (obj.name === 'Head')  headRef.current = obj
        if (obj.name === 'Neck')  neckRef.current = obj
      }
    })
  }, [scene])

  // Track mouse over the document
  useEffect(() => {
    if (reduced) return
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1   // -1 left → +1 right
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1   // -1 top  → +1 bottom
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced])

  // Animate every frame
  useFrame(() => {
    if (reduced) return

    const head = headRef.current
    const neck = neckRef.current

    // Target rotations (radians)
    // mouse.x positive → look right → negative Y rotation in Blender/three Y-up
    const targetHeadYaw   = -mouse.current.x * 15 * DEG
    const targetHeadPitch =  mouse.current.y *  8 * DEG  // positive Y = look down
    const targetNeckYaw   = -mouse.current.x *  5 * DEG

    const speed = 0.07  // lerp factor — lower = smoother/slower

    if (head) {
      head.rotation.y = lerp(head.rotation.y, targetHeadYaw,   speed)
      head.rotation.x = lerp(head.rotation.x, targetHeadPitch, speed)
    }
    if (neck) {
      neck.rotation.y = lerp(neck.rotation.y, targetNeckYaw, speed * 0.6)
    }
  })

  return (
    <primitive
      object={scene}
      // Centre the bust: model is ~1.9 units tall, centred at origin
      position={[0, -0.45, 0]}
      scale={1}
    />
  )
}

/**
 * Full Canvas wrapper — drop-in replacement for <FaceIllustration />.
 * Matches the same slot in v2-hero__illustration.
 */
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export function ThreeAvatar() {
  return (
    <div
      className="v2-three-avatar"
      aria-hidden="true"
      style={{ width: '100%', aspectRatio: '3/4' }}
    >
      <Canvas
        camera={{ position: [0, 0.15, 2.8], fov: 28 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        {/* Lighting — soft fill matching the editorial white background */}
        <ambientLight intensity={1.6} />
        <directionalLight position={[1.5, 3, 2.5]} intensity={1.2} />
        <directionalLight position={[-1, 1, -1]} intensity={0.4} />
        <pointLight position={[0, 2, 3]} intensity={0.6} />

        <Suspense fallback={null}>
          <ThreeAvatarScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
