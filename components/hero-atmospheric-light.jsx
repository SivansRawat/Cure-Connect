"use client";

import React, { useEffect, useRef } from "react";

/**
 * HeroAtmosphericLight
 * Native WebGL multi-frequency fluid atmospheric shader with Canvas 2D fallback.
 * Keeps the left 35-40% deep, dark, and high-contrast for crystal-clear typography,
 * while creating vibrant, luminous colored fluid waves on the right side behind the video.
 */
export default function HeroAtmosphericLight() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;
    let gl = null;

    try {
      gl =
        canvas.getContext("webgl", { alpha: false, antialias: true }) ||
        canvas.getContext("experimental-webgl");
    } catch (e) {
      gl = null;
    }

    if (gl) {
      // --- WebGL Shader Implementation ---
      const vertexShaderSource = `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fragmentShaderSource = `
        precision highp float;
        uniform float u_time;
        uniform vec2 u_resolution;

        // Simplex 2D noise implementation
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                            -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          float t = u_time * 0.32;

          // Multi-layer organic fluid coordinates
          vec2 p1 = uv * 1.5 + vec2(sin(t * 0.45) * 0.35, cos(t * 0.35) * 0.35);
          vec2 p2 = uv * 2.0 + vec2(cos(t * 0.38) * 0.45, sin(t * 0.48) * 0.3);
          vec2 p3 = uv * 1.2 + vec2(sin(t * 0.25) * 0.3, -cos(t * 0.4) * 0.35);
          vec2 p4 = uv * 1.8 + vec2(-cos(t * 0.3) * 0.4, sin(t * 0.35) * 0.4);

          float n1 = snoise(p1) * 0.5 + 0.5;
          float n2 = snoise(p2) * 0.5 + 0.5;
          float n3 = snoise(p3) * 0.5 + 0.5;
          float n4 = snoise(p4) * 0.5 + 0.5;

          // CureConnect Healthcare Palette
          vec3 bgDark    = vec3(0.016, 0.024, 0.055); // Deep Obsidian Foundation (#04060e)
          vec3 colBlue   = vec3(0.10, 0.42, 0.98);   // Royal Sapphire Blue
          vec3 colCyan   = vec3(0.04, 0.85, 0.98);   // Electric Radiant Cyan
          vec3 colViolet = vec3(0.55, 0.30, 0.98);   // Twilight Violet
          vec3 colTeal   = vec3(0.06, 0.85, 0.68);   // Emerald Turquoise

          // Dynamic multi-color blending
          vec3 light = mix(colBlue, colCyan, smoothstep(0.2, 0.8, n1));
          light = mix(light, colViolet, smoothstep(0.3, 0.75, n2 * 0.88));
          light = mix(light, colTeal, smoothstep(0.35, 0.85, n3 * 0.7));

          // STRICT LEFT DARK MASK: Keeps left side (0% - 38%) dark and high-contrast for text,
          // smoothly illuminating from 40% all the way to 100% on the right!
          float rightGlowMask = smoothstep(0.32, 0.65, uv.x);
          float intensity = (n1 * 0.45 + n2 * 0.35 + n3 * 0.2) * rightGlowMask * 1.6;

          // Composite light over dark obsidian foundation
          vec3 finalColor = mix(bgDark, light, clamp(intensity, 0.0, 0.95));

          // Right-side volumetric highlights (around video)
          float rightHighlight = exp(-distance(uv, vec2(0.85, 0.65)) * 1.6) * 0.45 * rightGlowMask;
          finalColor += colCyan * rightHighlight;

          float violetHighlight = exp(-distance(uv, vec2(0.78, 0.25)) * 1.8) * 0.35 * rightGlowMask;
          finalColor += colViolet * violetHighlight;

          gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
        }
      `;

      const createShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

      if (vs && fs) {
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
          gl.STATIC_DRAW
        );

        const positionLocation = gl.getAttribLocation(program, "position");
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const resolutionLocation = gl.getUniformLocation(
          program,
          "u_resolution"
        );

        const handleResize = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const width = canvas.parentElement.clientWidth;
          const height = canvas.parentElement.clientHeight;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          gl.viewport(0, 0, canvas.width, canvas.height);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        let startTime = performance.now();

        const render = (now) => {
          const time = (now - startTime) * 0.001;
          gl.useProgram(program);

          gl.enableVertexAttribArray(positionLocation);
          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

          gl.uniform1f(timeLocation, time);
          gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

          gl.drawArrays(gl.TRIANGLES, 0, 6);
          animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
          window.removeEventListener("resize", handleResize);
          cancelAnimationFrame(animationFrameId);
        };
      }
    }

    // --- Canvas 2D Fallback ---
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const onResize = () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    let angle = 0;
    const render2D = () => {
      angle += 0.015;
      ctx.fillStyle = "#04060e";
      ctx.fillRect(0, 0, width, height);

      // Light 1: Sapphire Blue
      const x1 = width * 0.75 + Math.sin(angle * 0.7) * (width * 0.1);
      const y1 = height * 0.4 + Math.cos(angle * 0.5) * (height * 0.15);
      const g1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, width * 0.45);
      g1.addColorStop(0, "rgba(37, 99, 235, 0.85)");
      g1.addColorStop(0.5, "rgba(29, 78, 216, 0.45)");
      g1.addColorStop(1, "rgba(4, 6, 14, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Light 2: Radiant Cyan
      const x2 = width * 0.82 + Math.cos(angle * 0.8) * (width * 0.1);
      const y2 = height * 0.65 + Math.sin(angle * 0.6) * (height * 0.18);
      const g2 = ctx.createRadialGradient(x2, y2, 10, x2, y2, width * 0.4);
      g2.addColorStop(0, "rgba(6, 182, 212, 0.85)");
      g2.addColorStop(0.5, "rgba(8, 145, 178, 0.4)");
      g2.addColorStop(1, "rgba(4, 6, 14, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Left Shadow Mask
      const leftGrad = ctx.createLinearGradient(0, 0, width * 0.5, 0);
      leftGrad.addColorStop(0, "#04060e");
      leftGrad.addColorStop(0.65, "rgba(4, 6, 14, 0.95)");
      leftGrad.addColorStop(1, "rgba(4, 6, 14, 0)");
      ctx.fillStyle = leftGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render2D);
    };

    animationFrameId = requestAnimationFrame(render2D);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none z-0"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover block"
      />
      {/* Subtle top & bottom blend */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-[#050811]/40 pointer-events-none" />
    </div>
  );
}
