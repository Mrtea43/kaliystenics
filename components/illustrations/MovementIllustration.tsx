import React from 'react';
import Svg, { Circle, Line, G } from 'react-native-svg';
import { Poses, Part } from './poses';
import { IlloStyle } from '../../data/movements';
import { useTheme } from '../../theme';

const HEAD_R = 14;
const STROKE_W = 14;
const ACC_W = 6;

interface Props {
  id: string;
  style?: IlloStyle;
}

export function MovementIllustration({ id, style = 'twotone' }: Props) {
  const theme = useTheme();
  const pose = Poses[id]?.();

  if (!pose) return null;

  if (style === 'line') {
    return (
      <Svg viewBox="0 0 200 240" width="100%" height="100%">
        <Line x1="20" y1="225" x2="180" y2="225" stroke={theme.fg} strokeWidth="1" strokeDasharray="3 4" opacity="0.25" />
        {pose.parts.map((p, i) => renderLinePart(p, i, theme.fg))}
      </Svg>
    );
  }

  if (style === 'twotone') {
    return (
      <Svg viewBox="0 0 200 240" width="100%" height="100%">
        <Line x1="20" y1="225" x2="180" y2="225" stroke={theme.fg} strokeWidth="1" strokeDasharray="3 4" opacity="0.25" />
        {/* fill pass */}
        {pose.parts.map((p, i) => renderFillPart(p, i, theme.soft, theme.fg))}
        {/* outline pass */}
        {pose.parts.map((p, i) => renderOutlinePart(p, i, theme.fg))}
        {/* accent highlights */}
        {pose.parts.map((p, i) =>
          pose.highlight.includes(i) ? renderAccentPart(p, i, theme.accent) : null
        )}
      </Svg>
    );
  }

  // stick style
  return (
    <Svg viewBox="0 0 200 240" width="100%" height="100%">
      <Line x1="20" y1="225" x2="180" y2="225" stroke={theme.fg} strokeWidth="1" strokeDasharray="3 4" opacity="0.25" />
      {pose.parts.map((p, i) => renderStickPart(p, i, theme.fg))}
    </Svg>
  );
}

function renderStickPart(p: Part, i: number, color: string) {
  if (p.t === 'head') {
    return <Circle key={i} cx={p.cx} cy={p.cy} r={HEAD_R} stroke={color} strokeWidth="2.4" fill={color} />;
  }
  return <Line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={color} strokeWidth="2.4" strokeLinecap="round" />;
}

function renderLinePart(p: Part, i: number, color: string) {
  if (p.t === 'head') {
    return <Circle key={i} cx={p.cx} cy={p.cy} r={HEAD_R} stroke={color} strokeWidth="3" fill="none" />;
  }
  return <Line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={color} strokeWidth="3" strokeLinecap="round" />;
}

function renderFillPart(p: Part, i: number, fill: string, stroke: string) {
  if (p.t === 'head') {
    return <Circle key={`f-${i}`} cx={p.cx} cy={p.cy} r={HEAD_R} fill={fill} stroke={stroke} strokeWidth="2" />;
  }
  return <Line key={`f-${i}`} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={fill} strokeWidth={STROKE_W} strokeLinecap="round" />;
}

function renderOutlinePart(p: Part, i: number, stroke: string) {
  if (p.t === 'head') return null;
  return <Line key={`o-${i}`} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />;
}

function renderAccentPart(p: Part, i: number, accent: string) {
  if (p.t === 'head') return null;
  return <Line key={`a-${i}`} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={accent} strokeWidth={ACC_W} strokeLinecap="round" />;
}
