import React, {useEffect, useMemo, useState} from 'react';
import {Box, Container, Typography, Button, IconButton, Icon, Avatar, ToggleButton} from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {Oscillator} from "tone";
import OscillatorButton from "../component/OscillatorButton.tsx";

export default function ScaleApp() {
  const [tonicFreq, setTonicFreq] = useState<number>(440);

  const radius: number = 100;

  return (
    <>
      <Typography variant={"h2"}>ScaleApp</Typography>

      <Box width={radius * 2} style={{'position': 'relative'}} >
        {/* 親で position 指定をしておくことで、子要素の位置指定を、親領域内での座標でできる https://qiita.com/ikm/items/c20f0afb2e6c74fd807d */}

        {
          Array.from({ length: 12 }).map((_, i) => {
            // i 番目のボタンを打つ

            // i 番目の音の定義
            const freq: number = tonicFreq * 2**(i / 12);
            const [isSoundOn, setIsSoundOn] = useState<boolean>(false);

            // i 番目のボタンの位置
            const angle = (i * Math.PI) / 6;
            const cx = radius + radius * Math.sin(angle);
            const cy = radius - radius * Math.cos(angle);
            const positionStyle: {} = {'position': 'absolute', 'top': cy, 'left': cx};

            return (
              <OscillatorButton
                freq={freq}
                isSoundOn={isSoundOn}
                setIsSoundOn={setIsSoundOn}
                label={freq.toFixed(2).split(".").join("\n")}
                buttonType={"CircleButton"}
                buttonProps={{style: positionStyle}}
              />
            )
          })
        }


      </Box>
    </>
  )
}
