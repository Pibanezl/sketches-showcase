"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";
export const dynamic = "force-dynamic";

export default function Sketch1() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    // Evita doble inicialización por React Strict Mode
    if (p5Instance.current) return;

    const sketch = (p: p5) => {
      let distMouse = 15;
      let cols: number;
      let rows: number;
      let size = 10;
      let offset = 4;
      let blocks: Block[][] = [];

      class Block {
        x: number;
        y: number;
        angle: number;
        c: number;

        constructor(x: number, y: number) {
          this.x = x;
          this.y = y;
          this.angle = 0;
          this.c = 70;
        }

        display() {
          p.noFill();
          p.stroke(this.c);
          p.push();
          p.translate(this.x, this.y);
          p.rotate(this.angle);

          if (this.angle > 0 && this.angle < 45) {
            this.drawRect();
          } else {
            this.drawX();
          }

          p.pop();
        }

        move() {
          let distance;

          // Detecta movimiento del mouse
          if (p.pmouseX - p.mouseX !== 0 || p.pmouseY - p.mouseY !== 0) {
            distance = p.dist(p.mouseX, p.mouseY, this.x, this.y);

            if (distance < distMouse) {
              this.angle += 1;
              this.c = 255;
            }
          }

          // Rotación continua hasta 90°
          if (this.angle > 0 && this.angle < 90) {
            this.angle += 1;
            if (this.c > 70) {
              this.c -= 3;
            }
          } else {
            this.angle = 0;
            this.c = 70;
          }
        }

        drawRect() {
          p.rect(0, 0, size - offset, size - offset);
        }

        drawX() {
          let margin = -size / 2;
          p.line(
            margin + offset / 2,
            margin + offset / 2,
            margin + size - offset / 2,
            margin + size - offset / 2
          );
          p.line(
            margin + size - offset / 2,
            margin + offset / 2,
            margin + offset / 2,
            margin + size - offset / 2
          );
        }
      }

      p.setup = () => {
        p.createCanvas(400, 400);
        p.rectMode(p.CENTER);
        p.angleMode(p.DEGREES);

        cols = p.width / size;
        rows = p.height / size;

        for (let i = 0; i < cols; i++) {
          blocks[i] = [];
          for (let j = 0; j < rows; j++) {
            blocks[i][j] = new Block(size / 2 + i * size, size / 2 + j * size);
          }
        }
      };

      p.draw = () => {
        p.background(0);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            blocks[i][j].move();
            blocks[i][j].display();
          }
        }
      };
    };

    if (sketchRef.current) {
      p5Instance.current = new p5(sketch, sketchRef.current);
    }

    return () => {
      p5Instance.current?.remove();
      p5Instance.current = null;
    };
  }, []);

  return <div ref={sketchRef} />;
}