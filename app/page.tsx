"use client";

import CircularLayout from "@/components/CircularLayout";
import Texture from "@/components/Texture/Texture";
import { Box, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import typescriptLogo from "../public/typescript-logo.png";
import supabaseLogo from "../public/supabase-logo.png";
import reactLogo from "../public/react-logo.svg";
import htmlLogo from "../public/html-logo.svg";
import tailwindLogo from "../public/tailwind-logo.png";

const Scene = () => {
  const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
  const objectSize: [number, number, number] = [1, 1, 1];

  const handleNextObject = () => {
    setCurrentObjectIndex((prevIndex) => (prevIndex + 1) % 5);
  };

  const objects: { component: JSX.Element; description: string }[] = useMemo(
    () => [
      {
        component: <Texture args={objectSize} url={typescriptLogo.src} />,
        description: "TypeScript",
      },
      {
        component: <Texture args={objectSize} url={supabaseLogo.src} />,
        description: "Supabase",
      },
      {
        component: <Texture args={objectSize} url={reactLogo.src} />,
        description: "React",
      },
      {
        component: <Texture args={objectSize} url={htmlLogo.src} />,
        description: "HTML",
      },
      {
        component: <Texture args={objectSize} url={tailwindLogo.src} />,
        description: "Tailwind",
      },
    ],
    [objectSize]
  );

  return (
    <>
      <button onClick={handleNextObject} style={{ position: "absolute", zIndex: 1 }}>
        Next Object
      </button>
      <Canvas style={{ height: "100vh", width: "100%" }}>
        <OrbitControls />
        <CircularLayout currentObjectIndex={currentObjectIndex} observerRadius={10} radius={5}>
          {objects.map(({ component, description }, index) => {
            const text = (
              <Text
                color="white"
                fontSize={0.2}
                position={[0, -1, 0]}
                rotation={[0, Math.PI / 2, 0]}
              >
                {description}
              </Text>
            );
            return (
              <>
                {component}
                {text}
              </>
            );
          })}
        </CircularLayout>
      </Canvas>
    </>
  );
};

export default Scene;
