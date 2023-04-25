// Bob.tsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D } from "three";

interface BobAnimationProps {
  children: React.ReactNode;
}

const Bob: React.FC<BobAnimationProps> = ({ children }) => {
  const ref = useRef<Object3D>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      ref.current.position.y = Math.sin(time * 2) * 0.05;
      ref.current.position.x = Math.sin(time) * 0.05;
    }
  });

  return <object3D ref={ref}>{children}</object3D>;
};

export default Bob;
