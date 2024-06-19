import React, { useEffect, useRef, useState } from "react";
import { PanoViewer } from "@egjs/view360";

const Viewer360 = () => {
  const viewerRef = useRef(null);
  const [hotspots, setHotspots] = useState([]);
  const [currentYaw, setCurrentYaw] = useState(0); // State to track the current yaw angle

  const loadNewImage = (imageUrl) => {
    if (viewerRef.current) {
      viewerRef.current.setImage(imageUrl, {
        projectionType: PanoViewer.PROJECTION_TYPE.CUBEMAP,
        cubemapConfig: {
          tileConfig: { flipHorizontal: true, rotation: 0 },
        },
      });
    }
  };

  // Function to add hotspots dynamically
  const addHotspot = (hotspotText, imageUrl, x, y, minAngle, maxAngle) => {
    setHotspots((currentHotspots) => [
      ...currentHotspots,
      { hotspotText, imageUrl, x, y, minAngle, maxAngle },
    ]);
  };

  useEffect(() => {
    const panoViewer = new PanoViewer(viewerRef.current, {
      image:
        "https://naver.github.io/egjs-view360/v3/examples/panoviewer/etc/img/bookcube1.jpg",
      projectionType: PanoViewer.PROJECTION_TYPE.CUBEMAP,
      cubemapConfig: {
        tileConfig: { flipHorizontal: true, rotation: 0 },
      },
      useZoom: true,
    });

    panoViewer.on("viewChange", (e) => {
      setCurrentYaw(e.yaw);
    });

    panoViewer.on("ready", () => {
      console.log("PanoViewer is ready");
      addHotspot(
        "Technology \n Science",
        "https://naver.github.io/egjs-view360/v3/examples/panoviewer/etc/img/bookcube1.jpg",
        50,
        30,
        40,
        120
      );
      // Second hotspot
      addHotspot(
        "Economy \n Culture",
        "https://naver.github.io/egjs-view360/v3/examples/panoviewer/etc/img/bookcube2.jpg",
        90,
        60,
        250,
        150
      );
    });

    return () => panoViewer.destroy();
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={viewerRef} style={{ width: "100%", height: "100%" }} />
      {hotspots.map((hotspot, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            cursor: "pointer",
            color: "white",
            fontSize: "20px",
            padding: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.75)",
            transform: "translate(-50%, -50%)",
            visibility:
              currentYaw >= hotspot.minAngle && currentYaw <= hotspot.maxAngle
                ? "visible"
                : "hidden",
          }}
          onClick={() => loadNewImage(hotspot.imageUrl)}
        >
          {hotspot.hotspotText}
        </div>
      ))}
    </div>
  );
};

export default Viewer360;
