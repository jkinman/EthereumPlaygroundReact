import * as BABYLON from "babylonjs";

let scene;
let engine;
let camera;

class BabylonEthereum {
  constructor(props) {
    this.actions = props.actions;
    this.ethereum = props.ethereum;
    this.ethService = props.ethereumService;
    let params = new URLSearchParams(document.location.search.substring(1));
    this.cameraTypeParam = params.get("camera") || "universal";
  }

  mount(opts) {
    this.canvasId = opts.canvasId;
    // Get the canvas DOM element
    this.canvas = document.getElementById(this.canvasId);
    // Load the 3D engine
    engine = new BABYLON.Engine(this.canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    });
    scene = this.createScene(engine, this.canvas);
    window.addEventListener("resize", engine.resize.bind(this));

    engine.runRenderLoop(() => scene.render());

    window.setInterval(this.createBlock.bind(this), 4000);
  }

  createBlock() {
    let block = BABYLON.Mesh.CreateBox(
      "box",
      4,
      scene,
      false,
      BABYLON.Mesh.DOUBLESIDE
    );
    let x = Math.round(Math.random() * 20);
    let y = Math.round(Math.random() * 20);
    let z = Math.round(Math.random() * 20);
    block.position = new BABYLON.Vector3(x, y, z);
  }

  createScene(engine, canvas) {
    scene = new BABYLON.Scene(engine);

    switch (this.cameraTypeParam) {
      case "vr":
        camera = new BABYLON.VRDeviceOrientationFreeCamera(
          "Camera",
          new BABYLON.Vector3(0, 30, -60),
          scene
        );
        break;
      case "universal":
      default:
        camera = new BABYLON.UniversalCamera(
          "UniversalCamera",
          new BABYLON.Vector3(0, 30, -60),
          scene
        );
        break;
    }
    //  camera = new BABYLON.ArcRotateCamera("camera1", 0, 10, -30, BABYLON.Vector3.Zero(), scene);

    // camera = new BABYLON.DeviceOrientationCamera(
    //   "DevOr_camera",
    //   new BABYLON.Vector3(0, 30, -60),
    //   scene
    // );
    // Sets the sensitivity of the camera to movement and rotation
    // camera.angularSensibility = 10;
    // camera.moveSensibility = 10;
    // let camera = new BABYLON.FreeCamera(
    //   "camera1",
    //   new BABYLON.Vector3(0, 20, -60),
    //   scene
    // );
    // Target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    let light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    let sphere = BABYLON.Mesh.CreateSphere(
      "sphere1",
      16,
      2,
      scene,
      false,
      BABYLON.Mesh.FRONTSIDE
    );
    // Move the sphere upward 1/2 of its height
    sphere.position.y = 1;
    // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
    let ground = BABYLON.Mesh.CreateGround("ground1", 10, 10, 2, scene, false);
    // Return the created scene
    return scene;
  }
}

export default BabylonEthereum;
