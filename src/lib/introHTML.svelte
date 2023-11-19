<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { gsap } from "gsap";
  import { onMount } from "svelte";
  import { degToRad } from "three/src/math/MathUtils.js";
  import { isIntroFinished } from "../store";
  let subRef: HTMLElement;
  let htmlObj = {
    pos: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: {
      x: 0,
      y: 0,
      z: 0,
    },
  };
  let tl = gsap.timeline();
  onMount(() => {
    tl.to(htmlObj.pos, {
      x: 1,
      y: 4,
      z: 0,
      onUpdate() {
        htmlObj.pos = htmlObj.pos;
      },
      duration: 2,
    });
    tl.to(
      htmlObj.rotation,
      {
        x: 0,
        y: degToRad(45),
        z: 0,
        onUpdate() {
          htmlObj.pos = htmlObj.pos;
        },
        duration: 2,
      },
      "<"
    );
    tl.to(subRef, {
      x: 10,
      scale: 1,
      duration: 1,
      ease: "bounce",
      onComplete() {
        $isIntroFinished = true;
      },
    });
  });
</script>

<HTML
  transform
  position={[htmlObj.pos.x, htmlObj.pos.y, htmlObj.pos.z]}
  rotation={[htmlObj.rotation.x, htmlObj.rotation.y, htmlObj.rotation.z]}
>
  <div class="head">
    <h3 class="h-sub">
      <span>Hello,</span>
      <span bind:this={subRef} class="sub-h-sub">I am</span>
    </h3>
    <h1>Rabin Lamichhane</h1>
  </div>
</HTML>

<style>
  .head {
    background-color: rgb(4 8 17);
    padding-inline: 30px;
    padding-block: 5px;
    border-radius: 10px;
    color: white;
    font-family: poppins;
    pointer-events: none;
  }
  .head > * {
    margin: 5px;
  }
  .h-sub {
    color: black;
    background-image: linear-gradient(135deg, #81fbb8 10%, #28c76f 100%);
    display: inline;
    padding-inline: 5px;
    padding-block: 2px;
    border-radius: 5px;
    position: relative;
    z-index: 0;
    margin-right: 0;
  }
  .sub-h-sub {
    font-size: 0.7em;
    top: 5px;
    position: absolute;
    width: max-content;
    background-color: coral;
    padding: 1px;
    padding-inline: 4px;
    z-index: -1;
    border-radius: 2px;
    transform: translate(-100%, 0) scale(0);
  }
</style>
