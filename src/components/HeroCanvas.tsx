"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) }
    };
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uPointer;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        void main() {
          vec2 uv = vUv;
          float wave = sin((uv.x * 5.0) + (uv.y * 3.5) + uTime * 0.45) * 0.5 + 0.5;
          float tide = sin(distance(uv, uPointer) * 14.0 - uTime * 1.2) * 0.5 + 0.5;
          float grain = hash(gl_FragCoord.xy + uTime) * 0.065;
          vec3 cream = vec3(0.955, 0.925, 0.835);
          vec3 gold = vec3(0.98, 0.70, 0.22);
          vec3 sea = vec3(0.08, 0.30, 0.25);
          vec3 color = mix(cream, gold, wave * 0.42);
          color = mix(color, sea, tide * 0.18);
          gl_FragColor = vec4(color + grain, 0.34);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };

    const move = (event: PointerEvent) => {
      uniforms.uPointer.value.set(
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight
      );
    };

    let frame = 0;
    const clock = new THREE.Clock();

    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-soft-light"
      aria-hidden="true"
    />
  );
}
