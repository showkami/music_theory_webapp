import React from 'react';

export type PointProps = {
  isMute: boolean;
  label: string;
  handleClick: ()=> void;
}

export type DodecaPointsProps = {
  points: PointProps[];
}

/**
 * 円周上に等しく並べられた12点。Jetbrains Aiを使ってコード作成
 * @constructor
 */
const DodecaPoints = (props: DodecaPointsProps) => {
  const large_radius = 100;
  const small_radius = large_radius / 20;
  const padding = 2 * (large_radius + small_radius); // 点のサイズを考慮した大きさ

  console.log("DodecaPoints is rendered! props:", props);

  return (
    <svg height={padding} width={padding}>
      <circle
        cx={large_radius + small_radius}
        cy={large_radius + small_radius}
        r={large_radius}
        stroke="black"
        fill="none"
      />

      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const cx = (large_radius + small_radius) + large_radius * Math.sin(angle);
        const cy = (large_radius + small_radius) - large_radius * Math.cos(angle);
        const textcx = cx - (small_radius * 3) * Math.sin(angle)
        const textcy = cy + (small_radius * 3) * Math.cos(angle)

        return (
          <g
            key={i}
            onClick={ props.points[i].handleClick }
          >

            {/* 12個の点のうちの i 番目 */}
            <circle
              cx={cx}
              cy={cy}
              r={small_radius}
              fill={props.points[i].isMute ? "black" : "red"}
            />

            {/* 12個の点のうちの i 番目のテキストラベル */}
            <text
              x={textcx}
              y={textcy}
              transform={"rotate(" + (angle * 180 / Math.PI) + " " + textcx + " " + textcy + ")"} // (textcx, textcy) を中心にangleだけ回転 (see https://developer.mozilla.org/ja/docs/Web/SVG/Attribute/transform#rotate)
              textAnchor="middle"
              fill="black"
              fontSize="10px"
            >
              {props.points[i].label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default DodecaPoints;
