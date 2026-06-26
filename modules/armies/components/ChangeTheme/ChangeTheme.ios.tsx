import { useCallback, useMemo, useState, type PropsWithChildren } from 'react'
import {
  ChangeThemeContext,
  type ChangeThemeContextType
} from './ChangeThemeContext'
import {
  Easing,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { StyleSheet, View, PixelRatio, useWindowDimensions } from 'react-native'
import {
  Canvas,
  Fill,
  ImageShader,
  makeImageFromView,
  Shader,
  Skia,
  type SkImage
} from '@shopify/react-native-skia'
import { scheduleOnRN } from 'react-native-worklets'

const pd = PixelRatio.get()

const wait = async (ms: number) => {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const thanosSnapShaderSource = Skia.RuntimeEffect.Make(`
    uniform shader image;
    uniform float progress;
    uniform vec2 resolution;
    uniform float seed;
    uniform vec2 wind;
    uniform vec2 waveDir;

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    half4 main(vec2 xy) {
        float cellSize = 1.0;
        vec2 cell = floor(xy / cellSize);
        vec2 gridSize = max(resolution / cellSize, vec2(1.0));

        vec2 ncell = cell / gridSize;
        float id = hash(ncell + seed);
        float angle = id * 6.28318;
        vec2 dir = vec2(cos(angle), sin(angle));
        float angle2 = hash(ncell + seed + 7.13) * 6.28318;
        vec2 noiseDir = vec2(cos(angle2), sin(angle2));

        float proj = dot(cell, waveDir);
        float projMin = min(0.0, gridSize.x * waveDir.x) + min(0.0, gridSize.y * waveDir.y);
        float projMax = max(0.0, gridSize.x * waveDir.x) + max(0.0, gridSize.y * waveDir.y);
        float wave = (proj - projMin) / max(projMax - projMin, 1.0);

        float duration = 0.35;
        float startDelay = wave * 0.45 + id * 0.2;
        float localProgress = clamp((progress - startDelay) / duration, 0.0, 1.0);

        vec2 base = dir * localProgress * 120.0;
        vec2 wanderDir = vec2(cos(angle2 + 1.7), sin(angle2 + 1.7));
        vec2 turbulence = localProgress * (
            noiseDir * sin(localProgress * 14.0 + id * 6.28318) * 26.0 +
            wanderDir * sin(localProgress * 5.0 + id * 3.14159) * 18.0);
        vec2 offset = base + turbulence;

        offset += wind * localProgress * 160.0;
        half4 color = image.eval(xy - offset);

        vec2 cellUV = fract(xy / cellSize) - 0.5;
        float r = length(cellUV) * 2.0;
        float radius = mix(1.8, 0.0, localProgress);
        float roundMask = smoothstep(radius, radius - 0.3, r);

        float finish = 1.0 - smoothstep(0.9, 1.0, progress);

        color.a *= (1.0 - localProgress) * roundMask * finish;
        return color;
    }
`)

const ChangeTheme = ({ children }: PropsWithChildren) => {
  const wrapperRef = useAnimatedRef<View>()
  const progress = useSharedValue(0)
  const seed = useSharedValue(0)
  const wind = useSharedValue<[number, number]>([0, -1])
  const waveDir = useSharedValue<[number, number]>([1, 0])

  const [image, setImage] = useState<SkImage | null>(null)
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()

  const changeTheme = useCallback<ChangeThemeContextType['changeTheme']>(
    async (applyTheme) => {
      const img = await makeImageFromView(wrapperRef)
      if (!img) {
        return
      }
      progress.value = 0
      seed.value = Math.random() * 10
      const waveAngle = Math.random() * Math.PI * 2
      waveDir.value = [Math.cos(waveAngle), Math.sin(waveAngle)]
      const windAngle = Math.random() * Math.PI * 2
      wind.value = [Math.cos(windAngle) * 0.7, Math.sin(windAngle) * 0.7 - 0.6]
      setImage(img)
      await wait(16)
      applyTheme()
      progress.value = withTiming(
        1,
        { duration: 700, easing: Easing.bezier(0.2, 0.2, 0.8, 0.8) },
        () => {
          scheduleOnRN(setImage, null)
        }
      )
    },
    [progress, seed, waveDir, wind, setImage, wrapperRef]
  )

  const value = useMemo<ChangeThemeContextType>(
    () => ({ changeTheme }),
    [changeTheme]
  )

  const uniforms = useDerivedValue(() => ({
    progress: progress.value,
    resolution: [(image?.width() ?? 1) / pd, (image?.height() ?? 1) / pd],
    seed: seed.value,
    wind: wind.value,
    waveDir: waveDir.value
  }))

  return (
    <ChangeThemeContext.Provider value={value}>
      {thanosSnapShaderSource !== null && image && (
        <Canvas
          style={[styles.canvas, { width: screenWidth, height: screenHeight }]}
        >
          <Fill>
            <Shader
              source={thanosSnapShaderSource}
              uniforms={uniforms}
            >
              <ImageShader
                image={image}
                fit='cover'
                x={0}
                y={0}
                width={image.width() / pd}
                height={image.height() / pd}
              />
            </Shader>
          </Fill>
        </Canvas>
      )}
      <View
        className='flex-1'
        collapsable={false}
        ref={wrapperRef}
      >
        {children}
      </View>
    </ChangeThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  canvas: { position: 'absolute', top: 0, left: 0, zIndex: 10 }
})

export default ChangeTheme
