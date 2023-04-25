import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

interface TextureProps {
  url: string;
  args: [number, number, number];
}

const Texture = ({ url, args }: TextureProps) => {
  const texture = useLoader(TextureLoader, url);

  return (
    <mesh>
      <boxBufferGeometry args={args} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Texture;
