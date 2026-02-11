'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function createCrystalGeometry(type) {
  const group = new THREE.Group()

  if (type === 'quartz') {
    const shaftGeo = new THREE.CylinderGeometry(0.4, 0.5, 2.0, 6, 1)
    const tipGeo = new THREE.ConeGeometry(0.4, 0.8, 6, 1)
    tipGeo.translate(0, 1.4, 0)
    const merged = mergeGeometries(shaftGeo, tipGeo)
    return merged
  }

  if (type === 'cluster') {
    const geo = new THREE.BufferGeometry()
    const positions = []
    const normals = []

    const addShard = (ox, oy, oz, scale, tiltX, tiltZ) => {
      const baseR = 0.3 * scale
      const height = 1.5 * scale
      const tipY = oy + height
      const sides = 6
      const basePoints = []
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2
        basePoints.push(new THREE.Vector3(
          ox + Math.cos(angle) * baseR + Math.sin(tiltX) * 0.1,
          oy,
          oz + Math.sin(angle) * baseR + Math.sin(tiltZ) * 0.1
        ))
      }
      const tip = new THREE.Vector3(ox + Math.sin(tiltX) * 0.3, tipY, oz + Math.sin(tiltZ) * 0.3)

      for (let i = 0; i < sides; i++) {
        const a = basePoints[i]
        const b = basePoints[(i + 1) % sides]
        const normal = new THREE.Vector3()
        const edge1 = new THREE.Vector3().subVectors(b, a)
        const edge2 = new THREE.Vector3().subVectors(tip, a)
        normal.crossVectors(edge1, edge2).normalize()

        positions.push(a.x, a.y, a.z, b.x, b.y, b.z, tip.x, tip.y, tip.z)
        normals.push(normal.x, normal.y, normal.z, normal.x, normal.y, normal.z, normal.x, normal.y, normal.z)
      }
    }

    addShard(0, -0.5, 0, 1.0, 0, 0)
    addShard(-0.5, -0.3, 0.3, 0.7, -0.3, 0.2)
    addShard(0.4, -0.4, -0.2, 0.8, 0.2, -0.3)
    addShard(-0.3, -0.2, -0.4, 0.6, -0.1, -0.4)
    addShard(0.2, -0.3, 0.5, 0.5, 0.4, 0.3)

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    return geo
  }

  if (type === 'prism') {
    const geo = new THREE.BufferGeometry()
    const positions = []
    const normals = []
    const sides = 6
    const topR = 0.15
    const botR = 0.45
    const height = 2.2
    const topY = height / 2
    const botY = -height / 2

    const topPoints = []
    const botPoints = []
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2
      topPoints.push(new THREE.Vector3(Math.cos(angle) * topR, topY, Math.sin(angle) * topR))
      botPoints.push(new THREE.Vector3(Math.cos(angle) * botR, botY, Math.sin(angle) * botR))
    }

    for (let i = 0; i < sides; i++) {
      const next = (i + 1) % sides
      const a = botPoints[i], b = botPoints[next], c = topPoints[next], d = topPoints[i]
      const normal = new THREE.Vector3()
      normal.crossVectors(
        new THREE.Vector3().subVectors(b, a),
        new THREE.Vector3().subVectors(d, a)
      ).normalize()

      positions.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z)
      normals.push(normal.x, normal.y, normal.z, normal.x, normal.y, normal.z, normal.x, normal.y, normal.z)
      positions.push(a.x, a.y, a.z, c.x, c.y, c.z, d.x, d.y, d.z)
      normals.push(normal.x, normal.y, normal.z, normal.x, normal.y, normal.z, normal.x, normal.y, normal.z)
    }

    const topCenter = new THREE.Vector3(0, topY + 0.3, 0)
    const botCenter = new THREE.Vector3(0, botY - 0.3, 0)
    for (let i = 0; i < sides; i++) {
      const next = (i + 1) % sides
      positions.push(topPoints[i].x, topPoints[i].y, topPoints[i].z, topPoints[next].x, topPoints[next].y, topPoints[next].z, topCenter.x, topCenter.y, topCenter.z)
      normals.push(0, 1, 0, 0, 1, 0, 0, 1, 0)
      positions.push(botPoints[next].x, botPoints[next].y, botPoints[next].z, botPoints[i].x, botPoints[i].y, botPoints[i].z, botCenter.x, botCenter.y, botCenter.z)
      normals.push(0, -1, 0, 0, -1, 0, 0, -1, 0)
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    return geo
  }

  const geo = new THREE.OctahedronGeometry(1, 0)
  geo.scale(0.6, 1.2, 0.6)
  return geo
}

function mergeGeometries(geo1, geo2) {
  const positions1 = geo1.attributes.position.array
  const normals1 = geo1.attributes.normal ? geo1.attributes.normal.array : new Float32Array(positions1.length)
  const positions2 = geo2.attributes.position.array
  const normals2 = geo2.attributes.normal ? geo2.attributes.normal.array : new Float32Array(positions2.length)

  const mergedPositions = new Float32Array(positions1.length + positions2.length)
  mergedPositions.set(positions1)
  mergedPositions.set(positions2, positions1.length)

  const mergedNormals = new Float32Array(normals1.length + normals2.length)
  mergedNormals.set(normals1)
  mergedNormals.set(normals2, normals1.length)

  const idx1 = geo1.index ? Array.from(geo1.index.array) : Array.from({ length: positions1.length / 3 }, (_, i) => i)
  const idx2 = geo2.index ? Array.from(geo2.index.array).map(i => i + positions1.length / 3) : Array.from({ length: positions2.length / 3 }, (_, i) => i + positions1.length / 3)

  const merged = new THREE.BufferGeometry()
  merged.setAttribute('position', new THREE.Float32BufferAttribute(mergedPositions, 3))
  merged.setAttribute('normal', new THREE.Float32BufferAttribute(mergedNormals, 3))
  merged.setIndex([...idx1, ...idx2])
  merged.computeVertexNormals()
  return merged
}

const crystalTypes = ['cluster', 'prism', 'quartz', 'gem', 'cluster']

export default function CrystalView3D({ crystals, onCrystalClick }) {
  const containerRef = useRef(null)
  const crystalMeshesRef = useRef([])
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    if (!containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050510)
    scene.fog = new THREE.FogExp2(0x050510, 0.03)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 2, 14)
    camera.lookAt(0, 0, 0)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch (e) {
      containerRef.current.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#a855f7;font-size:18px;text-align:center;padding:20px;">3D crystals require WebGL support. Please use a modern browser.</div>'
      return
    }
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0x1a1a3a, 0.8)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xeeeeff, 2.0)
    mainLight.position.set(5, 8, 5)
    mainLight.castShadow = true
    scene.add(mainLight)

    const rimLight = new THREE.DirectionalLight(0x6633ff, 1.0)
    rimLight.position.set(-5, 3, -5)
    scene.add(rimLight)

    const topLight = new THREE.PointLight(0xff44cc, 1.5, 25)
    topLight.position.set(0, 8, 0)
    scene.add(topLight)

    const bottomLight = new THREE.PointLight(0x3344ff, 0.8, 20)
    bottomLight.position.set(0, -5, 3)
    scene.add(bottomLight)

    const floorGeo = new THREE.PlaneGeometry(40, 20)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x080818,
      roughness: 0.3,
      metalness: 0.8
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -2
    floor.receiveShadow = true
    scene.add(floor)

    crystalMeshesRef.current = []
    crystals.forEach((crystal, index) => {
      const crystalGroup = new THREE.Group()
      const type = crystalTypes[index % crystalTypes.length]
      const geometry = createCrystalGeometry(type)

      const baseColor = new THREE.Color(crystal.color)
      const material = new THREE.MeshPhysicalMaterial({
        color: baseColor,
        metalness: 0.05,
        roughness: 0.05,
        transparent: true,
        opacity: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transmission: 0.6,
        thickness: 2.0,
        ior: 2.42,
        reflectivity: 1.0,
        envMapIntensity: 1.5,
        sheen: 0.5,
        sheenRoughness: 0.2,
        sheenColor: baseColor.clone().offsetHSL(0.1, 0, 0.2),
        side: THREE.DoubleSide
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = true
      mesh.receiveShadow = true
      crystalGroup.add(mesh)

      const glowColor = baseColor.clone().offsetHSL(0, 0.2, 0.3)
      const innerGlowGeo = geometry.clone()
      innerGlowGeo.scale(1.08, 1.08, 1.08)
      const innerGlowMat = new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      })
      const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat)
      crystalGroup.add(innerGlow)

      const outerGlowGeo = geometry.clone()
      outerGlowGeo.scale(1.25, 1.25, 1.25)
      const outerGlowMat = new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide
      })
      const outerGlow = new THREE.Mesh(outerGlowGeo, outerGlowMat)
      crystalGroup.add(outerGlow)

      const spacing = 3.2
      crystalGroup.position.x = (index * spacing) - ((crystals.length - 1) * spacing) / 2
      const sizeScale = crystal.size === 'large' ? 1.3 : crystal.size === 'medium' ? 1.0 : 0.8
      crystalGroup.scale.setScalar(sizeScale)
      crystalGroup.userData = { crystal, originalScale: sizeScale }
      scene.add(crystalGroup)
      crystalMeshesRef.current.push(crystalGroup)
    })

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let currentHovered = null

    const onMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const allMeshes = []
      crystalMeshesRef.current.forEach(g => g.traverse(c => { if (c.isMesh) allMeshes.push(c) }))
      const intersects = raycaster.intersectObjects(allMeshes)

      if (intersects.length > 0) {
        let parent = intersects[0].object
        while (parent.parent && !parent.userData.crystal) parent = parent.parent
        if (parent.userData.crystal) {
          renderer.domElement.style.cursor = 'pointer'
          currentHovered = parent.userData.crystal.id
          setHoveredId(parent.userData.crystal.id)
          return
        }
      }
      renderer.domElement.style.cursor = 'default'
      currentHovered = null
      setHoveredId(null)
    }

    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const allMeshes = []
      crystalMeshesRef.current.forEach(g => g.traverse(c => { if (c.isMesh) allMeshes.push(c) }))
      const intersects = raycaster.intersectObjects(allMeshes)
      if (intersects.length > 0) {
        let parent = intersects[0].object
        while (parent.parent && !parent.userData.crystal) parent = parent.parent
        if (parent.userData.crystal) onCrystalClick(parent.userData.crystal)
      }
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('click', onClick)

    let mouseX = 0
    const onDocMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
    }
    window.addEventListener('mousemove', onDocMouseMove)

    let frame
    const animate = () => {
      frame = requestAnimationFrame(animate)
      const time = Date.now() * 0.001

      crystalMeshesRef.current.forEach((group, i) => {
        const baseScale = group.userData.originalScale
        const isHovered = group.userData.crystal.id === currentHovered

        group.rotation.y += isHovered ? 0.02 : 0.003
        group.position.y = Math.sin(time * 0.4 + i * 1.2) * 0.3

        const targetScale = isHovered ? baseScale * 1.15 : baseScale
        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)

        group.children.forEach(child => {
          if (child.material && child.material.opacity !== undefined) {
            if (child.material.type === 'MeshPhysicalMaterial') {
              child.material.opacity = 0.8 + Math.sin(time * 1.5 + i * 0.7) * 0.1
            } else if (child.material.type === 'MeshBasicMaterial') {
              const baseOp = child.geometry.parameters ? 0.15 : 0.06
              child.material.opacity = baseOp + Math.sin(time * 2 + i) * baseOp * 0.5
            }
          }
        })
      })

      camera.position.x = mouseX * 1.5
      camera.lookAt(0, 0, 0)

      topLight.position.x = Math.sin(time * 0.3) * 5
      topLight.position.z = Math.cos(time * 0.3) * 5
      topLight.intensity = 1.2 + Math.sin(time * 0.8) * 0.3

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      renderer.domElement.removeEventListener('mousemove', onMouseMove)
      renderer.domElement.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', onDocMouseMove)
      window.removeEventListener('resize', onResize)
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [crystals, onCrystalClick])

  return (
    <div className="relative">
      <div ref={containerRef} className="w-full h-[500px] rounded-xl overflow-hidden shadow-2xl border border-purple-500/20" />
      {hoveredId && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/30 text-purple-300 text-sm pointer-events-none">
          Click to view details
        </div>
      )}
    </div>
  )
}
