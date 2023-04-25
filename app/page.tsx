"use client";

import CircularLayout from "@/components/CircularLayout";
import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

const Scene = () => {
  const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
  const boxSize: [number, number, number] = [1, 1, 1];

  const handleNextObject = () => {
    setCurrentObjectIndex((prevIndex) => (prevIndex + 1) % 6);
  };

  return (
    <>
      <button onClick={handleNextObject} style={{ position: "absolute", zIndex: 1 }}>
        Next Object
      </button>
      <Canvas style={{ height: "100vh", width: "100%" }}>
        <OrbitControls />
        <CircularLayout currentObjectIndex={currentObjectIndex} observerRadius={8} radius={6}>
          <Box material-color="red" args={boxSize} />
          <Box material-color="green" args={boxSize} />
          <Box material-color="yellow" args={boxSize} />
          <Box material-color="hotpink" args={boxSize} />
          <Box material-color="orange" args={boxSize} />
          <Box material-color="aqua" args={boxSize} />
        </CircularLayout>
      </Canvas>
    </>
  );
};

export default Scene;
