<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import { SheetObject } from "@threlte/theatre";
  import { Camera, GridHelper, PerspectiveCamera, PointLight } from "three";
  import IntroHtml from "./introHTML.svelte";
  import { isIntroFinished } from "../store";
  import gsap from "gsap";
  import { map } from "../utils";
  let cameraRef: PerspectiveCamera;
  let cameraObj = {
    pos: {
      x: 10,
      y: 10,
      z: 10,
    },
  };
  let tl = gsap.timeline();

  $: {
    // console.log($isIntroFinished);
    if ($isIntroFinished) {
      gsap.to(cameraObj.pos, {
        x: 10,
        y: 4,
        z: 10,
        duration: 2,
        ease: "easeInOut",
        onUpdate() {
          cameraObj.pos = cameraObj.pos;
          cameraRef.lookAt(0, map(cameraObj.pos.y, 0, 10, 0, 4), 0);
        },
      });
    }
  }
</script>

<!-- <T.PerspectiveCamera
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0);
  }}
/> -->
<!-- <T.Mesh>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.Me shBasicMaterial color="red" />
</T.Mesh> -->

<T.Group position={[cameraObj.pos.x, cameraObj.pos.y, cameraObj.pos.z]}>
  <T.PerspectiveCamera
    makeDefault
    on:create={({ ref }) => {
      ref.lookAt(0, 0, 0);
      cameraRef = ref;
    }}
  >
    <OrbitControls />
  </T.PerspectiveCamera>
</T.Group>

<T.GridHelper args={[5, 5]} />

<T.SpotLight position.y={5} intensity={10} angle={[2]} penumbra={[0.8]} />

<T.Mesh>
  <T.BoxGeometry args={[100, 1, 100]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh>

<IntroHtml />
