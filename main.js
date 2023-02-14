import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

// create a scene
const scene = new THREE.Scene()

// create a geometry
const geometry = new THREE.SphereGeometry(3,64,64)
// add  a material
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.5
})
// create a mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// light
// the paramters are color, intensity and distance. The intensity is a number range from 0(no light emitted) to any positive value. An intensity of two will cause a bright object as twice as an object with an object of 1
const light = new THREE.PointLight(0xffff, 1.05, 500)
light.position.set(0, 10, 10)
scene.add(light)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
// camera....
// the 0.1 and 100 are the end points to which we can the set the positions of the camera and still see the object. Any options beyond them will make the object not be seen.

// the aspect ratio is the ratio of the  width to the height of the window display
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.setZ(20)
scene.add(camera)


// Renderer
const canvas = document.querySelector('#webgl')


const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.render(scene, camera)

// Controls: it allows users to interact with the scene using mouse or touch events
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5
// Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)

  
  
}
loop()

// animation
const tl = gsap.timeline({ duration: 1 })
tl.fromTo(mesh.scale, {z:0, y:0, x:0}, {z:1, y:1, x:1})
tl.fromTo('nav', { y:'-100%'}, { y: '0%'})
tl.fromTo('.title', {opacity: 0}, {opacity:1})

// Mouse Animation
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', () => {mouseDown=true})
window.addEventListener('mouseup', () => {mouseDown=false})

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.width)*255),
      150
    ]
    // lets animate
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,   
    })
  }
})