import React, { useRef, useEffect, useMemo, Suspense } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import { Canvas, useThree, useFrame } from '@react-three/fiber'

import brush from 'images/brush.png'

const Ripples = ({ image }) => {
  const { gl, camera, scene, viewport } = useThree();

  // BRUSH
  let brushGeometry = useMemo(() => new THREE.PlaneGeometry(100, 100, 1, 1), [])
  let brushMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(brush),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false
  }), [])
  // END BRUSH

  // MESH LOGIC
  let max = 250;
  let meshes = []
  const meshesRef = useRef(<group></group>)
  const currentMesh = useRef(0)

  useEffect(() => {
    for(let i = 0; i < max; i++) {
      let mesh = new THREE.Mesh(brushGeometry, brushMaterial.clone())
      mesh.rotation.z = Math.PI * 2 * Math.random()
      mesh.visible = false
      // @ts-ignore
      meshesRef.current.add(mesh)
    }
  }, [brushGeometry, brushMaterial, max])

  // END MESH LOGIC

  // MOUSE LOGIC
  const prevMouse = useRef(new THREE.Vector2(0, 0))
  const currMouse = useRef(new THREE.Vector2(0, 0))

  const maxWidthOffset = window.innerWidth > 1440 ? (window.innerWidth - 1440) / 2 : 0
  

  const mouseMove = (e) => {
    currMouse.current.x = e.clientX - (image.width / 2) - 260 - maxWidthOffset
    currMouse.current.y = -e.clientY + (image.height / 2) + 120
  }

  const touchMove = (e) => {

  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('touchmove', touchMove)
    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('touchmove', touchMove)
    }
  })
  // END MOUSE LOGIC

  // SHADER LOGIC
    let scene1 = new THREE.Scene()

    const imagePos = {
      x: 0,
      y: 0,
      z: 0
    }
  
    const imageSize = {
      x: viewport.width,
      y: viewport.height
    }

    let imageGeometry = new THREE.PlaneGeometry(imageSize.x, imageSize.y, 1, 1)    

    let imageMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uDisplacement: { value: null },
        uTexture: { value: new THREE.TextureLoader().load(image.src) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uDisplacement;
        uniform sampler2D uTexture;
        uniform vec4 resolution;
        varying vec2 vUv;
        #define PI 3.14159265
        void main() {
          vec4 displacement = texture2D(uDisplacement, vUv);
          float theta = displacement.r*2.*PI;
          vec2 dir = vec2(sin(theta), cos(theta));
          vec2 newUV = vUv + dir*displacement.r*0.1;
          gl_FragColor = texture2D(uTexture, newUV);
        }
      `
    })
    
    let imageMesh = new THREE.Mesh(imageGeometry, imageMaterial)
    imageMesh.position.x = -imagePos.x
    imageMesh.position.y = imagePos.y
    scene1.add(imageMesh)

    let baseTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat
    })

  // END SHADER LOGIC

  // ANIMATION
  
  useFrame(() => {
    let delta = prevMouse.current.distanceTo(currMouse.current)
    // @ts-ignore
    let children = meshesRef.current.children

    // CREATE RIPPLE (takes oldest one and resets it)
    if (Math.abs(delta) > 2) {
      let nextMesh = children[currentMesh.current]
      nextMesh.position.x = currMouse.current.x
      nextMesh.position.y = currMouse.current.y
      nextMesh.visible = true
      nextMesh.material.opacity = 1
      nextMesh.scale.x=nextMesh.scale.y = 1
      currentMesh.current = (currentMesh.current + 1) % max
    }
    // END CREATE RIPPLE

    // RIPPLE ANIMATION
    children.forEach((mesh) => {
      if (mesh.visible) {
        mesh.rotation.z += 0.02
        mesh.material.opacity *= 0.98
        mesh.scale.x=mesh.scale.y=0.982*mesh.scale.x + 0.107
      }
      if (mesh.material.opacity <= 0.001) mesh.visible = false
    })
    // END RIPPLE ANIMATION

    prevMouse.current.x = currMouse.current.x
    prevMouse.current.y = currMouse.current.y

    // RENDER LOGIC
    gl.setRenderTarget(baseTexture)
    gl.render(scene, camera)
    imageMaterial.uniforms.uDisplacement.value = baseTexture.texture
    gl.setRenderTarget(null)
    gl.clear()
    gl.render(scene1, camera)
    // END RENDER LOGIC

  }, 1)
  // END ANIMATION

  return <group ref={meshesRef}>
    {meshes}
  </group>
}

const ImageRipple = ({ image }) => {

  return (
    <StyledCanvas orthographic resize={{scroll: false}} >
      <Suspense fallback={<></>}>
        <Ripples image={image}/>
      </Suspense>
    </StyledCanvas>
  )
}

export default ImageRipple

const StyledCanvas = styled(Canvas)`
  position: absolute !important;
  overflow: hidden;
  height: 100%;
  width: 100%;
  z-index: 0;
`
