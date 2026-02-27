import { radToDeg } from '@maw/utils/math';
import Color from 'color';
import type { ReactNode } from 'react';

export type Item = {
  color: string;
  text: string;
};

type DynamicWheelSvgProps = {
  height: number;
  highlightIndex?: number;
  items: Item[];
  title: string;
  width: number;
};

export function DynamicWheelSvg({
  height,
  highlightIndex,
  items,
  title,
  width,
}: DynamicWheelSvgProps) {
  const radius = Math.min(width, height) / 2;
  const center = { x: width / 2, y: height / 2 };
  let startAngleRadians = 0;
  const sweepAngleRadians = (Math.PI / items.length) * 2;
  const svgSlices: ReactNode[] = [];

  items.forEach((item, index) => {
    const aPoint = {
      x: center.x + radius * Math.cos(startAngleRadians),
      y: center.y + radius * Math.sin(startAngleRadians),
    };
    const bPoint = {
      x: center.x + radius * Math.cos(startAngleRadians + sweepAngleRadians),
      y: center.y + radius * Math.sin(startAngleRadians + sweepAngleRadians),
    };
    const abMidpoint = {
      x:
        center.x +
        radius * 0.85 * Math.cos(startAngleRadians + sweepAngleRadians / 2),
      y:
        center.y +
        radius * 0.85 * Math.sin(startAngleRadians + sweepAngleRadians / 2),
    };

    let d = '';
    d += `M${center.x},${center.y} `;
    d += `L${aPoint.x},${aPoint.y} `;
    d += `A${radius},${radius} 0 0,1 ${bPoint.x},${bPoint.y} `;
    d += 'Z';

    // TODO: Slightly move the label toward the middle
    const labelAngle = radToDeg(startAngleRadians + sweepAngleRadians / 2);
    const labelColor = Color(item.color).isDark() ? '#fff' : '#000';

    svgSlices.push(
      <g key={index}>
        <path
          d={d}
          fill={item.color}
          data-highlight-index={(highlightIndex === index).toString()}
          className="data-[highlight-index=true]:animate-flashing-invert-half"
        />
        <text
          textAnchor="end"
          x={abMidpoint.x}
          y={abMidpoint.y}
          transform={`rotate(${labelAngle}, ${abMidpoint.x}, ${abMidpoint.y})`}
          fill={labelColor}
        >
          {item.text}
        </text>
      </g>,
    );

    startAngleRadians += sweepAngleRadians;
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <title>{title}</title>
      {svgSlices}
    </svg>
  );
}
