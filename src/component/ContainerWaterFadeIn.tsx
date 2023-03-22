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
  const shockwaveFilter = new ShockwaveFilter([400, 400]);
  const filterTexture = PIXI.Texture.from(
    "https://picsum.photos/id/404/800/600"
  );
  const displacementFilter = new PIXI.filters.DisplacementFilter(
    new PIXI.Sprite(filterTexture),
    0
  );

  useTick((delta, ticker) => {
    shockwaveFilter.time += 0.02 * delta;
    if (shockwaveFilter.time > 3) shockwaveFilter.time = 0;
    displacementFilter.scale.x = 50 * Math.sin(0.001 * ticker.lastTime);
    displacementFilter.scale.y = 50 * Math.cos(0.001 * ticker.lastTime);
  })

  return (
    <Container width={width + 40} filters={[shockwaveFilter, displacementFilter] as Filter[]}>
      <Sprite texture={PIXI.Texture.WHITE} position={{ x: 20, y: 20 }} width={width - 40} height={height - 40} alpha={0} />
      <Sprite image="https://picsum.photos/id/439/812/600" x={40} y={40} width={width - 80} height={height - 80} />
    </Container>
  );
};
