import OscillatorButton from "./OscillatorButton.tsx";
import {Box} from "@mui/material";
import React, {useState} from "react";

type DodecagonOscillatorsProps = {
  freqs: number[],
  isSoundOnList: boolean[],
  setIsSoundOnList: Function,
  isEmphMajorScale?: boolean,
  isEmphMinorScale?: boolean,
}

export default function DodecagonOscillators(props: DodecagonOscillatorsProps) {
  const isEmphMajorScale: boolean = props.isEmphMajorScale ? props.isEmphMajorScale : false;
  const isEmphMinorScale: boolean = props.isEmphMinorScale ? props.isEmphMinorScale : false;

  const idx: number[] = Array.from({ length: 12 }, (_, i) => i);

  const radius: number = 100;
  return (
    <Box width={radius * 2} height={radius * 3} style={{'position': 'relative'}} >
      {/* 親で position 指定をしておくことで、子要素の位置指定を、親領域内での座標でできる https://qiita.com/ikm/items/c20f0afb2e6c74fd807d */}

      {
        idx.map((_, i) => {
          // i 番目のボタンを打つ

          const angle = (i * Math.PI) / 6;
          const cx = radius + radius * Math.sin(angle);
          const cy = radius - radius * Math.cos(angle);
          const positionStyle: {} = {'position': 'absolute', 'top': cy, 'left': cx};

          return (
            <OscillatorButton
              freq={props.freqs[i]}
              isSoundOn={props.isSoundOnList[i]}
              setIsSoundOn={(onoff: boolean) => {
                const newIsSoundOnList = [...props.isSoundOnList];
                newIsSoundOnList[i] = onoff;
                props.setIsSoundOnList(newIsSoundOnList);
              }}
              label={props.freqs[i].toFixed(2).split(".").join("\n")}
              buttonType={"CircleButton"}
              buttonProps={{style: positionStyle}}
            />
          )
        })
      }
    </Box>
  )
}