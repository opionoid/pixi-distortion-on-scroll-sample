import Head from "next/head";
import styles from "@/styles/Home.module.css";
import * as PIXI from "pixi.js";
import { ShockwaveFilter } from "@pixi/filter-shockwave";
import { Filter } from "pixi.js";

const SAMPLE_DATA_LIST = [
  {
    id: 1,
    name: "sample1",
    src: "https://picsum.photos/id/737/600/420",
  },
  /*
  {
    id: 2,
    name: "sample2",
    src: "https://picsum.photos/id/837/600/420",
  },
  {
    id: 3,
    name: "sample3",
    src: "https://picsum.photos/id/547/600/420",
  },
  */
];

export default function Home() {
  const onLoad = (element: HTMLElement) => {
    if (!element) return;

    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight * 2,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      antialias: true,
      backgroundAlpha: 0,
      resizeTo: window,
      view: document.querySelector("canvas") as HTMLCanvasElement
    });

    app.renderer.plugins.interaction.autoPreventDefault = false;

    const containers = SAMPLE_DATA_LIST.map((data, i) => {
      const container = new PIXI.Container();

      const imageSprite = PIXI.Sprite.from(data.src);
      imageSprite.width = 560 / 2;
      imageSprite.height = 400 / 2;
      imageSprite.tint = 0xffffff;

      imageSprite.position.x = (i % 2) * 200;
      imageSprite.position.y = i * 600;

      // Spriteαの余白を20px設定
      const padding = 20 as const;
      imageSprite.position.set(padding, padding);

      // 透明な余白を追加
      const borderPadding = 50;
      const borderTexture = PIXI.Texture.WHITE;
      const borderSprite = new PIXI.Sprite(borderTexture);
      borderSprite.width = imageSprite.width + borderPadding * 2;
      borderSprite.height = imageSprite.height + borderPadding * 2;
      borderSprite.position.set(
        imageSprite.x - borderPadding,
        imageSprite.y - borderPadding
      );
      borderSprite.alpha = 0;

      const filterTexture = PIXI.Texture.from(
        "https://picsum.photos/id/404/812/600"
      );
      const displacementFilter = new PIXI.filters.DisplacementFilter(
        new PIXI.Sprite(filterTexture),
        0
      );

      const shockwaveFilter = new ShockwaveFilter([0.5, 0.5], {
        amplitude: 30,
        wavelength: 160,
        brightness: 1,
        radius: -1,
      });
      app.ticker.add(() => {
        if (container.alpha > 0 && container.alpha < 0.5) {
          displacementFilter.scale.x += 2;
          displacementFilter.scale.y += 1.6;
          shockwaveFilter.time += 0.013;
        } else if (container.alpha >= 0.5 && container.alpha < 1) {
          displacementFilter.scale.x < 0 ? displacementFilter.scale.x = 0 : displacementFilter.scale.x -= 1;
          displacementFilter.scale.y < 0 ? displacementFilter.scale.y = 0 : displacementFilter.scale.y -= 0.8;
          shockwaveFilter.time += 0.013;
        } else {
          // if (imageSprite.alpha === 1) {
          //   imageSprite.filters = [];
          // }
          displacementFilter.scale.x = 0;
          displacementFilter.scale.y = 0;
          shockwaveFilter.time = 0;
        }
      });

      container.addChild(imageSprite);
      container.addChild(borderSprite);
      container.filters = [shockwaveFilter, displacementFilter] as Filter[];
      app.stage.addChild(container);

      return container;
    });

    const calculateAlpha = (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) {
        return 0;
      } else if (scrollTop > end) {
        return 1;
      } else {
        return (scrollTop - start) / (end - start);
      }
    };
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      containers[0].alpha = calculateAlpha(scrollTop, 0, 600);
      // containers[1].alpha = calculateAlpha(scrollTop, 400, 1200);
      // containers[2].alpha = calculateAlpha(scrollTop, 800, 1800);
    };

    window.addEventListener("scroll", handleScroll);

    element.appendChild(app.view);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section style={{ height: "90vh" }}>
          <h2>Main Visual</h2>
          <p>scroll down to fade in images</p>
        </section>
        <section className={styles.section} ref={onLoad} />
      </main>
    </>
  );
}
