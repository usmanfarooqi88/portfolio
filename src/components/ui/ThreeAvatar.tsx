/**
 * ThreeAvatar — 3D rigged bust.
 *
 * Intro: camera sweeps from above the head down to face-level on first load.
 * Cursor: head rotates to follow (no mesh translation — avoids stretching).
 * Wind:   compound sine drift on the head yaw.
 */

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const MODEL_URL = '/3d/usman-rigged-eyes.glb'
useGLTF.preload(MODEL_URL)

const DEG = Math.PI / 180

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// Ease-out cubic
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

// ── Canvas-based eye iris texture ────────────────────────
function makeEyeTexture(): THREE.CanvasTexture {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const cx = size / 2, cy = size / 2

  // Sclera
  ctx.fillStyle = '#f0ece8'
  ctx.beginPath(); ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2); ctx.fill()
  // Iris (dark brown gradient)
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.3)
  grad.addColorStop(0,   '#2a1a0a')
  grad.addColorStop(0.4, '#5c3a1a')
  grad.addColorStop(1,   '#3d2410')
  ctx.fillStyle = grad
  ctx.beginPath(); ctx.arc(cx, cy, size * 0.3, 0, Math.PI * 2); ctx.fill()
  // Pupil
  ctx.fillStyle = '#0a0604'
  ctx.beginPath(); ctx.arc(cx, cy, size * 0.15, 0, Math.PI * 2); ctx.fill()
  // Specular highlight
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.beginPath(); ctx.arc(cx - size * 0.08, cy - size * 0.1, size * 0.06, 0, Math.PI * 2); ctx.fill()
  // Limbal ring
  ctx.strokeStyle = 'rgba(30,15,5,0.4)'
  ctx.lineWidth = size * 0.04
  ctx.beginPath(); ctx.arc(cx, cy, size * 0.3, 0, Math.PI * 2); ctx.stroke()

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

// Camera start (above, close — looking down at top of head)
const CAM_START = new THREE.Vector3(0, 2.4, 1.0)
// Camera end (normal front-facing position)
const CAM_END   = new THREE.Vector3(0, 0.5, 3.0)
// What the camera always looks at
const CAM_TARGET = new THREE.Vector3(0, 0.45, 0)

export function ThreeAvatarScene() {
  const { scene }  = useGLTF(MODEL_URL)
  const { camera } = useThree()
  const reduced    = usePrefersReducedMotion()
  const groupRef   = useRef<THREE.Group>(null)
  const headRef     = useRef<THREE.Bone | null>(null)
  const neckRef     = useRef<THREE.Bone | null>(null)
  const leftEyeRef  = useRef<THREE.Bone | null>(null)
  const rightEyeRef = useRef<THREE.Bone | null>(null)
  const mouse      = useRef({ x: 0, y: 0 })
  const introT     = useRef(0)          // 0 → 1 over ~1.8 s

  // Set camera to start position immediately
  useEffect(() => {
    camera.position.copy(CAM_START)
    ;(camera as THREE.PerspectiveCamera).fov = 47
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    camera.lookAt(CAM_TARGET)
  }, [camera])

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Bone) {
        if (obj.name === 'Head')     headRef.current     = obj
        if (obj.name === 'Neck')     neckRef.current     = obj
        if (obj.name === 'LeftEye')  leftEyeRef.current  = obj
        if (obj.name === 'RightEye') rightEyeRef.current = obj
      }
      // Eye spheres — replace material with canvas iris texture
      if (obj instanceof THREE.Mesh &&
          (obj.name === 'Sphere' || obj.name === 'Sphere.001')) {
        obj.renderOrder = 2
        const eyeTex = makeEyeTexture()
        const eyeMat = new THREE.MeshStandardMaterial({
          map: eyeTex,
          roughness: 0.25,
          metalness: 0.0,
          depthTest: false,
          depthWrite: false,
        })
        obj.material = eyeMat
      }
    })
  }, [scene])

  useEffect(() => {
    if (reduced) return
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced])

  useFrame((_, delta) => {
    // ── Intro camera sweep (top of head → face) ─────────────
    if (introT.current < 1) {
      introT.current = Math.min(introT.current + delta * 0.55, 1)
      const t = easeOut(introT.current)
      camera.position.lerpVectors(CAM_START, CAM_END, t)
      camera.lookAt(CAM_TARGET)
    }

    if (reduced) return

    const t    = performance.now() / 1000
    const head = headRef.current
    const neck = neckRef.current

    // Wind drift (compound sine — never mechanical)
    const wind = Math.sin(t * 0.38) * 0.6 * DEG
               + Math.sin(t * 0.71 + 1.3) * 0.25 * DEG

    // Head follows cursor — rotate only, no translation
    const targetYaw   = mouse.current.x * 5 * DEG + wind
    const targetPitch = -mouse.current.y * 2.5 * DEG

    if (head) {
      head.rotation.y = lerp(head.rotation.y, targetYaw,   0.06)
      head.rotation.x = lerp(head.rotation.x, targetPitch, 0.06)
    }
    if (neck) {
      neck.rotation.y = lerp(neck.rotation.y, targetYaw * 0.4, 0.06)
    }
    // Eyes track cursor with slightly more range than head
    const eyeYaw   = mouse.current.x * 8 * DEG
    const eyePitch = -mouse.current.y * 4 * DEG
    if (leftEyeRef.current) {
      leftEyeRef.current.rotation.y  = lerp(leftEyeRef.current.rotation.y,  eyeYaw,   0.10)
      leftEyeRef.current.rotation.x  = lerp(leftEyeRef.current.rotation.x,  eyePitch, 0.10)
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.rotation.y = lerp(rightEyeRef.current.rotation.y, eyeYaw,   0.10)
      rightEyeRef.current.rotation.x = lerp(rightEyeRef.current.rotation.x, eyePitch, 0.10)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.18, 0]}>
      <primitive object={scene} scale={1} />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────

export function ThreeAvatar() {
  return (
    <div
      className="v2-three-avatar"
      aria-hidden="true"
      style={{ width: '100%', aspectRatio: '4/5' }}
    >
      <Canvas
        camera={{ position: [0, 2.4, 1.0], fov: 47 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
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
