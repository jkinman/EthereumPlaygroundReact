import * as THREE from "three";
import * as AFRAME from "aframe";
import ThreeForceGraph from "three-forcegraph";

AFRAME.registerComponent("forcegraph", {
  schema: {
    nodes: { default: [] },
    links: { default: [] }
  },
  init: function() {
    let geometry = new THREE.BoxGeometry(10, 10, 10);
    let material = new THREE.MeshBasicMaterial({ color: 0x2222dd });
    let cube = new THREE.Mesh(geometry, material);

    this.graph = new ThreeForceGraph()
      .numDimensions(3)
      .nodeRelSize(4)
      .linkWidth(0.1)
      .linkOpacity(1)
      .linkResolution(6)
      .linkDirectionalParticles(1)
      .cooldownTicks(300)
      .cooldownTime(20000)
      .nodeThreeObject(cube)
      .nodeRelSize(0.5)
      .nodeOpacity(1)
      .graphData({ ...this.data });

    this.el.object3D.add(this.graph);
  },

  update: function(oldData) {
    this.graph.graphData({ ...this.data });
  },

  tick: function() {
    this.graph.tickFrame();
  }
});
