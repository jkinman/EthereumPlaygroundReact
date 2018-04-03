import React, { Component } from "react";
import "aframe";
import "aframe-environment-component";
import "aframe-animation-component";
import "aframe-event-set-component";
import "aframe-sprite-label";
import "aframe-effects";
import "./AframeLowpoly";

import { Entity, Scene } from "aframe-react";

const COLORS = ["#D92B6A", "#9564F2", "#FFCF59"];

class Blockchain extends Component {
  constructor(props) {
    super(props);

    // We'll use this state later on in the tutorial
    this.state = {
      colorIndex: 0,
      spherePosition: { x: 0.0, y: 4, z: -10.0 }
    };
  }

  _handleClick() {
    console.log("clicked sphere");
    this.setState({
      colorIndex: (this.state.colorIndex + 1) % COLORS.length
    });
  }
  // none, default, contact, egypt, checkerboard, forest, goaland, yavapai, goldmine, threetowers, poison, arches, tron, japan, dream, volcano, starry, osiris
  render() {
    return (
      <Scene
        effects="bloom, film, fxaa"
        fxaa
        bloom={{
          radius: 0.99
        }}
        film={{
          sIntensity: 0.15,
          nIntensity: 0.25
        }}
        // environment={{
        //   preset: "tron",
        //   dressing: "none",
        //   seed: 1,
        //   lightPosition: { x: 200.0, y: 1.0, z: -50.0 },
        //   fog: 0.8,
        //   ground: "flat",
        //   groundYScale: 5.0,
        //   groundTexture: "none",
        //   groundColor: "#755b5c",
        //   grid: "none"
        // }}
      >
        <Entity
          primitive="a-light"
          type="directional"
          color="#FFF"
          intensity={1}
          position={{ x: 2.5, y: 0.0, z: 0.0 }}
          animation__oscillate={{
            property: "position",
            dur: 2000,
            dir: "alternate",
            easing: "linear",
            loop: true,
            from: { x: 2.5, y: 0.0, z: 0.0 },
            to: { x: 3.0, y: 1.25, z: 0.0 }
          }}
        />

        <Entity
          primitive="a-light"
          type="ambient"
          color="#FFF"
          intensity={0.3}
        />

        <Entity primitive="a-camera" look-controls>
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: "white", shader: "flat", opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
            event-set__1={{
              _event: "mouseenter",
              scale: { x: 1.4, y: 1.4, z: 1.4 }
            }}
            event-set__2={{
              _event: "mouseleave",
              scale: { x: 1, y: 1, z: 1 }
            }}
            raycaster={{
              objects: ".clickable"
            }}
          />
        </Entity>

        {this.props.ethereum &&
          this.props.ethereum.blockArray.map((block, i) => {
            return (
              <Entity
                class="clickable"
                lowpoly={{
                  color: COLORS[this.state.colorIndex],
                  nodes: true,
                  opacity: 0.15,
                  wireframe: true,
                  radius:1,
                position:{ x: 4 * i, y: 0, z: -8 }
                }}
                primitive="a-octahedron"
                detail={2}
                events={{
                  click: console.log
                }}
                radius={1}
                position={{ x: 4 * i, y: 0, z: -8 }}
                color="#FAFAF1"
                animation__rotate={{
                  property: "rotation",
                  dur: 60000,
                  easing: "linear",
                  loop: true,
                  to: { x: 0, y: 360, z: 0 }
                }}
                // animation__oscillate={{
                //   property: "position",
                //   dur: 2000,
                //   dir: "alternate",
                //   easing: "linear",
                //   loop: true,
                //   from: { x: 2 * i, y: 0, z: -8 },
                //   to: {
                //     x: 2 * i,
                //     y: 0.25,
                //     z: -8
                //   }
                // }}
              />

            );
          })}
      </Scene>
    );
  }
}

export default Blockchain;
