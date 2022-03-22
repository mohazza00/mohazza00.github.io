
/*=============== PORTFOLIO ITEM FILTER ===============*/
const filterContainer = document.querySelector(".portfolio-filter-inner");
const filterBtns = filterContainer.children;
const totalFilterBtns = filterBtns.length;
const tabs = document.querySelectorAll(".tab-content")
const container = document.querySelector(".scene");
const portfolioItems = document.querySelectorAll(".project")

console.log(tabs)

for(let i=0; i<totalFilterBtns; i++)
{
    filterBtns[i].addEventListener("click", function(){
        const filterValue = this.getAttribute("data-filter");
        console.log(filterValue)
        filterContainer.querySelector(".active").classList.remove("active")
        this.classList.add("active");
        tabs.forEach((tab) => {
            tab.classList.remove("active");
        })
        tabs[i].classList.add("active")
        for(let j=0; j<portfolioItems.length; j++)
        {
            if(filterValue == portfolioItems[j].getAttribute("data-category"))
            {
                portfolioItems[j].classList.add("show");
            }
        }

        if(i == 2){
            container.classList.add("active")
            init(0)
        }
        else{
            container.classList.remove("active")
            container.removeChild(container.firstChild);

        }
        
    })
}


// 3D models
const modelsContainer = document.querySelectorAll(".model-item");
for(let k=0; k < modelsContainer.length; k++)
{
  modelsContainer[k].addEventListener("click", function() {
    if(k > models.length -1)
      return;
    container.removeChild(container.firstChild);
    loadModel(k)
  })
}
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

let models = [
  "/3D/models/MegaMan_Texture.gltf",
  "/3D/models/GoldenWheelSpider_Unity.gltf"
]


function init() {
    let camera;
    let renderer;
    let scene;
    let model;
  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-7, 5, 8);
  camera.lookAt(0, 0, 0);

  //Lights
  const ambient = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1.1);
  light.position.set(10, 10, 400);
  scene.add(light);

  //Helpers
  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //controls
  let controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 2.5, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  //   controls.enablePan = false;

  
  animate();

  function animate() {
    controls.update();
    //model.rotation.y += 0;
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }
}

function setMaterialsOnGLTF(object3D) {
  if (object3D.material) {
    const newMaterial = new THREE.MeshToonMaterial({
      map: object3D.material.map,
    });
    object3D.material = newMaterial;
  }
  if (!object3D.children) {
    return;
  }
  for (let i = 0; i < object3D.children.length; i++) {
    setMaterialsOnGLTF(object3D.children[i]);
  }
}

function loadModel(index) {
  let camera;
  let renderer;
  let scene;
  let model;
//Create scene
scene = new THREE.Scene();

const fov = 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 1000;

//Camera setup
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-7, 5, 8);
camera.lookAt(0, 0, 0);

//Lights
const ambient = new THREE.AmbientLight(0x404040, 1);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff, 1.1);
light.position.set(10, 10, 400);
scene.add(light);

//Helpers
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

//Renderer
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

//controls
let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2.5, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

//   controls.enablePan = false;

//Load model
let loader = new THREE.GLTFLoader();
loader.load(models[index], function (gltf) {
  scene.add(gltf.scene);
  model = gltf.scene.children[0];
  setMaterialsOnGLTF(gltf.scene);
});
animate();

function animate() {
  controls.update();
  //model.rotation.y += 0;
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
}





