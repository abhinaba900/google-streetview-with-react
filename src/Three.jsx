import React, { useEffect, useRef } from "react";
import * as PANOLENS from "panolens";
import * as THREE from "three";
import Image1 from "./images/panel1.jpeg";
import Image2 from "./images/pano5.jpg";

// Define window.process if it's not already defined
if (typeof window !== "undefined" && !window.process) {
  window.process = {
    env: { NODE_ENV: "development" },
  };
}

const PanolensViewer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Define positions for lookAt and infospots
    const lookAtPositions = [
      new THREE.Vector3(4871.39, 1088.07, -118.41),
      new THREE.Vector3(1278.27, 732.65, 4769.19),
    ];

    const infospotPositions = [
      new THREE.Vector3(3136.06, 1216.3, -3690.14),
      new THREE.Vector3(3258.81, -295.5, 3771.13),
    ];

    // Create panoramas
    const panorama = new PANOLENS.ImagePanorama(Image1);
    const panorama2 = new PANOLENS.ImagePanorama(Image2);

    // Set up event listeners for panoramas
    panorama.addEventListener("enter-fade-start", () => {
      viewer.tweenControlCenter(lookAtPositions[0], 0);
    });
    panorama2.addEventListener("enter", () => {
      viewer.tweenControlCenter(lookAtPositions[1], 0);
    });

    // Link panoramas
    panorama.link(panorama2, infospotPositions[0]);
    panorama2.link(panorama, infospotPositions[1]);

    // Infospot
    const infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
    infospot.position.set(0, -2000, -5000);
    panorama.add(infospot);

    // Initialize viewer
    const viewer = new PANOLENS.Viewer({
      output: "console",
      container: container,
    });
    viewer.add(panorama, panorama2);

    // Cleanup function to destroy viewer when component unmounts
    return () => {
      viewer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default PanolensViewer;
