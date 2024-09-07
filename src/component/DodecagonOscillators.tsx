import OscillatorButton from "./OscillatorButton";
import {Box} from "@mui/material";
import React from "react";

/**
 * 座標
 */
type Cordinate = {x: number, y: number};

type DodecagonOscillatorsProps = {
  freqs: number[],
  isSoundOnList: boolean[],
  setIsSoundOnList: Function,
}

export default function DodecagonOscillators(props: DodecagonOscillatorsProps) {
  const idx: number[] = Array.from({ length: props.freqs.length }, (_, i) => i);

  const radius: number = 100;
  const pointRelPositions: Cordinate[] = idx.map((_, i) => {
    const angle = (2 * Math.PI / 12) * i;
    return {
      x: + (1 + 0.5 * Math.floor(i / 12)) * radius * Math.sin(angle),
      y: - (1 + 0.5 * Math.floor(i / 12)) * radius * Math.cos(angle),
    }
  });
  const width = Math.max(...pointRelPositions.map(p => p.x)) - Math.min(...pointRelPositions.map(p => p.x));
  const height = Math.max(...pointRelPositions.map(p => p.y)) - Math.min(...pointRelPositions.map(p => p.y));
  const origin: Cordinate = {x: width / 2, y: height / 2};
  const pointAbsPositions: Cordinate[] = pointRelPositions.map(relPos => {
    return {
      x: origin.x + relPos.x,
      y: origin.y + relPos.y,
    }
  });

  return (
    <>
      <Box width={width*1.2} height={height*1.2} style={{'position': 'relative'}} >
        {/* 親で position 指定をしておくことで、子要素の位置指定を、親領域内での座標でできる https://qiita.com/ikm/items/c20f0afb2e6c74fd807d */}
        {/* width, height は必要な分の1.2倍だけ余計に取っておく */}

        {
          pointAbsPositions.map((point, i) => {
            return (
              <OscillatorButton
                freq={props.freqs[i]}
                isSoundOn={props.isSoundOnList[i]}
                setIsSoundOn={(onoff: boolean) => {
                  const newIsSoundOnList = [...props.isSoundOnList];
                  newIsSoundOnList[i] = onoff;
                  props.setIsSoundOnList(newIsSoundOnList);
                }}
                buttonProps={{style: {'position': 'absolute', 'top': point.y, 'left': point.x}}}
              />
            )
          })
        }
      </Box>
    </>
  )
}