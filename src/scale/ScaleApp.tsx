import React, {useEffect, useMemo, useState} from 'react';
import {Box, Container, Typography, Button, IconButton, Icon, Avatar, ToggleButton} from "@mui/material";
import OscillatorButton from "../component/OscillatorButton.tsx";
import FrequencyInput from "../component/FrequencyInput.tsx";

export default function ScaleApp() {
  const [tonicFreq, setTonicFreq] = useState<number>(440);
  const idx: number[] = Array.from({ length: 12 }, (_, i) => i);
  const freqs: number[] = idx.map((_, i) => tonicFreq * 2**(i / 12));
  const [isSoundOnList, setIsSoundOnList] = useState<boolean[]>(idx.map( (_, i) => false));
  const radius: number = 100;

  return (
    <>
      <Typography variant={"h2"}>ScaleApp</Typography>

      Tonic = <FrequencyInput freq={tonicFreq} setFreq={setTonicFreq} />

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
                freq={freqs[i]}
                isSoundOn={isSoundOnList[i]}
                setIsSoundOn={(onoff: boolean) => {
                  const newIsSoundOnList = [...isSoundOnList];
                  newIsSoundOnList[i] = onoff;
                  setIsSoundOnList(newIsSoundOnList);
                }}
                label={freqs[i].toFixed(2).split(".").join("\n")}
                buttonType={"CircleButton"}
                buttonProps={{style: positionStyle}}
              />
            )
          })
        }
      </Box>

      <Button variant={"text"} color={"warning"} onClick={()=>{setIsSoundOnList(idx.map((i)=>{return false}))}} >Stop All</Button>
    </>
  )
}
