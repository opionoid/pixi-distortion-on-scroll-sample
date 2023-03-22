import style from './index.module.css'
import { Stage, Sprite } from '@inlet/react-pixi'
import { ContainerWaterFadeIn } from '@/component/ContainerWaterFadeIn'

export default function SamplePage() {
    return (
        <article className={style.article}>
        <h1>Sample Page</h1>
        <Stage>
            <ContainerWaterFadeIn>
                <Sprite image="https://picsum.photos/id/904/812/600" />
            </ContainerWaterFadeIn>
        </Stage>
        </article>
    )
}