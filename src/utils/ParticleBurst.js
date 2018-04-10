import * as $ from 'jquery'

import './ParticalBurst.css'

const SPEED_FACTOR = 0.7

class ParticleBurst {

	constructor( settings) {
		this.settings = settings
		this.things = []
	}

	burst( spawnPoint = {x:250, y:0}) {
		this.spawnRandom( spawnPoint )
		this.tick()
	}

  spawnRandom(spawnPoint) {
    let i = Math.round(Math.random() * 15);
    for (; i > 0; i--) {
      this.spawnThing(spawnPoint);
    }
  }

  spawnThing(spawnPoint) {
    let thing = $(document.createElement("span"));
    let addedEl = $("#spawnedthings").append(thing);

    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    $(thing)
      .addClass("spawnedthing")
      .text("*");

    $(thing).css({
      transform: `translate(${spawnPoint.x}px,${
        spawnPoint.y
      }px) scale(${Math.random() * 3 - 1.5})`,
      color: `rgb(${r},${g},${b})`
    });

    let thingInstance = {
      el: thing,
      speedx: Math.random() * 6 - 3,
      speedy: Math.random() * 5 - 12,
      speedz: Math.random() * 0.2 - 0.1,
      scale: 1.5,
      x: spawnPoint.x,
      y: spawnPoint.y,
      spin: Math.random() * 10 - 5,
      rotation: 0
    };
    this.things.push(thingInstance);
  }

  tick() {
    let windowHeight = $(window).height();
    this.things.forEach((e, i, a) => {
      //apply acceleration
      e.speedy += 1 * SPEED_FACTOR;
      e.scale += e.speedz * SPEED_FACTOR;
      e.y += e.speedy * SPEED_FACTOR;
      e.x += e.speedx * SPEED_FACTOR;
      e.rotation += e.spin * SPEED_FACTOR;
      e.el.css({
        transform: `translate(${Math.round(e.x)}px,${Math.round(
          e.y
        )}px) scale(${e.scale}) rotate(${e.rotation}deg)`
      });

      // off screen
      if (
        windowHeight < e.el.offset().top ||
        windowHeight < e.y - e.el.height()
      ) {
        e.el.remove();
        a.splice(i, 1);
      }
    });
		if( this.things.length )
    	window.requestAnimationFrame(this.tick.bind(this));
  }
}

export default ParticleBurst;
