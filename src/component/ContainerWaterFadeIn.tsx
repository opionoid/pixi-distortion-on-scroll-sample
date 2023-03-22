import { Container, Sprite, useTick, _ReactPixi } from "@inlet/react-pixi";
import { ShockwaveFilter } from "@pixi/filter-shockwave";
import { FC, useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { Filter } from "pixi.js";

type ContainerWaterFadeInProps = {
  children: JSX.Element;
};

export const ContainerWaterFadeIn: FC<ContainerWaterFadeInProps> = ({
  children,
}) => {
  const width = Math.min(window.innerWidth, 800)
  const height = Math.min(window.innerWidth * 3 / 4, 600)
  const shockwaveFilter = new ShockwaveFilter([0.5, 0.5], {
    amplitude: 30,
    wavelength: 160,
    brightness: 1,
    radius: -1,
  });
  const filterTexture = PIXI.Texture.from(
    "https://picsum.photos/id/404/800/600"
  );
  const displacementFilter = new PIXI.filters.DisplacementFilter(
    new PIXI.Sprite(filterTexture),
    0
  );

  const intervalRef = useRef<any>();
  const animationTimeRef = useRef<number>(0);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      animationTimeRef.current += 0.5;
      shockwaveFilter.time += 0.1;
      if (shockwaveFilter.time > 3) shockwaveFilter.time = 0;
      displacementFilter.scale.x = 50 * Math.sin(animationTimeRef.current);
      displacementFilter.scale.y = 50 * Math.cos(animationTimeRef.current);
    }, 300);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <Container filters={[shockwaveFilter, displacementFilter] as Filter[]}>
      <Sprite texture={PIXI.Texture.WHITE} position={{ x: 20, y: 20 }} width={width - 40} height={height - 40} alpha={0} />
      <Sprite image="https://picsum.photos/id/439/812/600" x={40} y={40} width={width - 80} height={height - 80} />
    </Container>
  );
};
