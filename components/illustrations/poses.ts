// Pose data for line and twotone illustration styles.
// Each pose: array of parts ({ t: 'head'|'limb', ... }) + highlight indices.

export interface HeadPart {
  t: 'head';
  cx: number;
  cy: number;
}

export interface LimbPart {
  t: 'limb';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type Part = HeadPart | LimbPart;

export interface PoseSpec {
  parts: Part[];
  highlight: number[];
}

export const Poses: Record<string, () => PoseSpec> = {
  pike: () => ({
    parts: [
      { t: 'limb', x1: 60, y1: 218, x2: 92, y2: 158 },
      { t: 'limb', x1: 80, y1: 220, x2: 100, y2: 162 },
      { t: 'head', cx: 105, cy: 158 },
      { t: 'limb', x1: 110, y1: 165, x2: 138, y2: 110 },
      { t: 'limb', x1: 138, y1: 110, x2: 175, y2: 220 },
      { t: 'limb', x1: 138, y1: 110, x2: 158, y2: 220 },
    ],
    highlight: [0, 1],
  }),
  taps: () => ({
    parts: [
      { t: 'head', cx: 60, cy: 130 },
      { t: 'limb', x1: 73, y1: 132, x2: 175, y2: 152 },
      { t: 'limb', x1: 85, y1: 140, x2: 90, y2: 198 },
      { t: 'limb', x1: 105, y1: 140, x2: 80, y2: 118 },
      { t: 'limb', x1: 80, y1: 118, x2: 70, y2: 138 },
      { t: 'limb', x1: 175, y1: 152, x2: 182, y2: 200 },
      { t: 'limb', x1: 165, y1: 154, x2: 172, y2: 200 },
    ],
    highlight: [3, 4],
  }),
  circles: () => ({
    parts: [
      { t: 'head', cx: 100, cy: 60 },
      { t: 'limb', x1: 100, y1: 74, x2: 100, y2: 160 },
      { t: 'limb', x1: 100, y1: 92, x2: 40, y2: 92 },
      { t: 'limb', x1: 100, y1: 92, x2: 160, y2: 92 },
      { t: 'limb', x1: 100, y1: 160, x2: 78, y2: 220 },
      { t: 'limb', x1: 100, y1: 160, x2: 122, y2: 220 },
    ],
    highlight: [2, 3],
  }),
  push: () => ({
    parts: [
      { t: 'head', cx: 55, cy: 120 },
      { t: 'limb', x1: 68, y1: 122, x2: 175, y2: 140 },
      { t: 'limb', x1: 78, y1: 130, x2: 82, y2: 185 },
      { t: 'limb', x1: 95, y1: 132, x2: 100, y2: 185 },
      { t: 'limb', x1: 175, y1: 140, x2: 182, y2: 188 },
      { t: 'limb', x1: 165, y1: 142, x2: 172, y2: 188 },
    ],
    highlight: [1],
  }),
  knee: () => ({
    parts: [
      { t: 'head', cx: 55, cy: 120 },
      { t: 'limb', x1: 68, y1: 122, x2: 138, y2: 152 },
      { t: 'limb', x1: 80, y1: 130, x2: 88, y2: 185 },
      { t: 'limb', x1: 95, y1: 132, x2: 102, y2: 185 },
      { t: 'limb', x1: 138, y1: 152, x2: 158, y2: 185 },
      { t: 'limb', x1: 158, y1: 185, x2: 185, y2: 175 },
    ],
    highlight: [1],
  }),
  incline: () => ({
    parts: [
      { t: 'head', cx: 80, cy: 120 },
      { t: 'limb', x1: 92, y1: 125, x2: 175, y2: 180 },
      { t: 'limb', x1: 50, y1: 158, x2: 95, y2: 138 },
      { t: 'limb', x1: 175, y1: 180, x2: 158, y2: 220 },
      { t: 'limb', x1: 168, y1: 180, x2: 148, y2: 220 },
    ],
    highlight: [1],
  }),
  super: () => ({
    parts: [
      { t: 'head', cx: 55, cy: 120 },
      { t: 'limb', x1: 68, y1: 124, x2: 158, y2: 148 },
      { t: 'limb', x1: 60, y1: 112, x2: 22, y2: 92 },
      { t: 'limb', x1: 65, y1: 116, x2: 26, y2: 100 },
      { t: 'limb', x1: 158, y1: 148, x2: 195, y2: 115 },
      { t: 'limb', x1: 150, y1: 152, x2: 188, y2: 120 },
    ],
    highlight: [1],
  }),
  angel: () => ({
    parts: [
      { t: 'head', cx: 100, cy: 80 },
      { t: 'limb', x1: 100, y1: 94, x2: 100, y2: 180 },
      { t: 'limb', x1: 100, y1: 110, x2: 35, y2: 80 },
      { t: 'limb', x1: 100, y1: 110, x2: 165, y2: 80 },
      { t: 'limb', x1: 100, y1: 180, x2: 78, y2: 222 },
      { t: 'limb', x1: 100, y1: 180, x2: 122, y2: 222 },
    ],
    highlight: [1, 2, 3],
  }),
  gm: () => ({
    parts: [
      { t: 'head', cx: 60, cy: 80 },
      { t: 'limb', x1: 72, y1: 85, x2: 140, y2: 115 },
      { t: 'limb', x1: 80, y1: 92, x2: 70, y2: 138 },
      { t: 'limb', x1: 140, y1: 115, x2: 152, y2: 220 },
      { t: 'limb', x1: 140, y1: 115, x2: 132, y2: 220 },
    ],
    highlight: [1],
  }),
  squat: () => ({
    parts: [
      { t: 'head', cx: 100, cy: 70 },
      { t: 'limb', x1: 100, y1: 84, x2: 100, y2: 142 },
      { t: 'limb', x1: 100, y1: 100, x2: 138, y2: 115 },
      { t: 'limb', x1: 100, y1: 100, x2: 62, y2: 115 },
      { t: 'limb', x1: 100, y1: 142, x2: 138, y2: 170 },
      { t: 'limb', x1: 138, y1: 170, x2: 138, y2: 220 },
      { t: 'limb', x1: 100, y1: 142, x2: 62, y2: 170 },
      { t: 'limb', x1: 62, y1: 170, x2: 62, y2: 220 },
    ],
    highlight: [4, 5, 6, 7],
  }),
  lunge: () => ({
    parts: [
      { t: 'head', cx: 100, cy: 70 },
      { t: 'limb', x1: 100, y1: 84, x2: 100, y2: 140 },
      { t: 'limb', x1: 100, y1: 140, x2: 152, y2: 168 },
      { t: 'limb', x1: 152, y1: 168, x2: 152, y2: 220 },
      { t: 'limb', x1: 100, y1: 140, x2: 60, y2: 178 },
      { t: 'limb', x1: 60, y1: 178, x2: 38, y2: 220 },
      { t: 'limb', x1: 100, y1: 100, x2: 122, y2: 122 },
    ],
    highlight: [2, 3, 4, 5],
  }),
  bridge: () => ({
    parts: [
      { t: 'head', cx: 40, cy: 170 },
      { t: 'limb', x1: 53, y1: 168, x2: 118, y2: 132 },
      { t: 'limb', x1: 118, y1: 132, x2: 148, y2: 168 },
      { t: 'limb', x1: 148, y1: 168, x2: 148, y2: 210 },
      { t: 'limb', x1: 118, y1: 138, x2: 128, y2: 168 },
      { t: 'limb', x1: 128, y1: 168, x2: 128, y2: 210 },
    ],
    highlight: [1],
  }),
  plank: () => ({
    parts: [
      { t: 'head', cx: 50, cy: 130 },
      { t: 'limb', x1: 63, y1: 132, x2: 172, y2: 155 },
      { t: 'limb', x1: 65, y1: 140, x2: 65, y2: 188 },
      { t: 'limb', x1: 172, y1: 155, x2: 182, y2: 198 },
      { t: 'limb', x1: 162, y1: 158, x2: 172, y2: 198 },
    ],
    highlight: [1],
  }),
  situp: () => ({
    parts: [
      { t: 'head', cx: 80, cy: 115 },
      { t: 'limb', x1: 90, y1: 125, x2: 125, y2: 170 },
      { t: 'limb', x1: 125, y1: 170, x2: 158, y2: 158 },
      { t: 'limb', x1: 158, y1: 158, x2: 182, y2: 192 },
      { t: 'limb', x1: 78, y1: 102, x2: 60, y2: 88 },
      { t: 'limb', x1: 82, y1: 102, x2: 100, y2: 88 },
    ],
    highlight: [1],
  }),
  deadbug: () => ({
    parts: [
      { t: 'head', cx: 50, cy: 160 },
      { t: 'limb', x1: 63, y1: 160, x2: 158, y2: 160 },
      { t: 'limb', x1: 80, y1: 158, x2: 65, y2: 100 },
      { t: 'limb', x1: 100, y1: 160, x2: 115, y2: 192 },
      { t: 'limb', x1: 158, y1: 160, x2: 140, y2: 115 },
      { t: 'limb', x1: 140, y1: 115, x2: 155, y2: 100 },
      { t: 'limb', x1: 158, y1: 160, x2: 195, y2: 192 },
    ],
    highlight: [1],
  }),
  dip: () => ({
    parts: [
      { t: 'head', cx: 80, cy: 100 },
      { t: 'limb', x1: 80, y1: 113, x2: 80, y2: 168 },
      { t: 'limb', x1: 85, y1: 120, x2: 132, y2: 168 },
      { t: 'limb', x1: 80, y1: 168, x2: 122, y2: 195 },
      { t: 'limb', x1: 122, y1: 195, x2: 50, y2: 220 },
    ],
    highlight: [2],
  }),
  diamond: () => ({
    parts: [
      { t: 'head', cx: 50, cy: 120 },
      { t: 'limb', x1: 63, y1: 122, x2: 172, y2: 148 },
      { t: 'limb', x1: 80, y1: 130, x2: 90, y2: 188 },
      { t: 'limb', x1: 88, y1: 132, x2: 95, y2: 188 },
      { t: 'limb', x1: 172, y1: 148, x2: 182, y2: 196 },
      { t: 'limb', x1: 162, y1: 150, x2: 172, y2: 196 },
    ],
    highlight: [2, 3],
  }),
  inch: () => ({
    parts: [
      { t: 'head', cx: 135, cy: 120 },
      { t: 'limb', x1: 125, y1: 130, x2: 42, y2: 178 },
      { t: 'limb', x1: 35, y1: 178, x2: 25, y2: 218 },
      { t: 'limb', x1: 50, y1: 178, x2: 40, y2: 218 },
      { t: 'limb', x1: 42, y1: 178, x2: 135, y2: 200 },
      { t: 'limb', x1: 135, y1: 200, x2: 178, y2: 220 },
    ],
    highlight: [2, 3, 4],
  }),
};
