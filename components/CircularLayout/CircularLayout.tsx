import { Sphere, SpotLight, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface CircularLayoutProps {
  radius: number;
  observerRadius: number;
  currentObjectIndex: number;
  children: ReactNode[];
}

const CircularLayout = ({
  radius,
  observerRadius,
  currentObjectIndex,
  children,
}: CircularLayoutProps) => {
  const { camera } = useThree();

  const [rotation, setRotation] = useState(0);

  const groupRef = useRef<THREE.Group | null>(null);

  const boxRefs = useRef<(THREE.Object3D | null)[]>([]);

  const objectPositions = useMemo(() => {
    return children.map((_, index) => {
      const angle = (2 * Math.PI * index) / children.length;
      const x = radius * Math.cos(angle);
      const y = 0;
      const z = radius * Math.sin(angle);
      return new THREE.Vector3(x, y, z);
    });
  }, [children, radius]);

  const [observerPosition, setObserverPosition] = useState<THREE.Vector3>(() => {
    const initialAngle = (2 * Math.PI * currentObjectIndex) / children.length;
    const x = observerRadius * Math.cos(initialAngle);
    const y = 0;
    const z = observerRadius * Math.sin(initialAngle);
    return new THREE.Vector3(x, y, z);
  });

  useEffect(() => {
    camera.position.copy(observerPosition);
    camera.lookAt(objectPositions[currentObjectIndex % children.length]);
  }, [camera, children.length, currentObjectIndex, objectPositions, observerPosition]);

  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = (2 * Math.PI * currentObjectIndex) / children.length;
      const delta = (targetRotation - groupRef.current.rotation.y) * 0.1;
      setRotation((prevRotation) => prevRotation + delta);
      groupRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      <group ref={groupRef} rotation={[0, rotation, 0]}>
        {children.map((child, index) => (
          <group
            key={index}
            position={objectPositions[index]}
            ref={(ref) => (boxRefs.current[index] = ref)}
            rotation={index === currentObjectIndex ? [0, -rotation, 0] : [0, 0, 0]}
          >
            {index === currentObjectIndex && (
              <SpotLight intensity={0.2} angle={0.5} position={[1, 3, 0]} />
            )}
            {child}
            <Text
              position={[0, 1, 0]}
              fontSize={0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {index}
            </Text>
          </group>
        ))}
      </group>
      <Sphere position={observerPosition} args={[0.5, 16, 16]} />
    </>
  );
};

export default CircularLayout;
