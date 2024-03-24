import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Typography,
  Button, ButtonGroup,
  ToggleButton,
  ToggleButtonGroup, TableContainer, TableHead, TableCell, TableRow, Table, TableBody
} from "@mui/material";
import OscillatorButton from "../component/OscillatorButton";
import FrequencyInput from "../component/FrequencyInput";
import DodecagonOscillators from "../component/DodecagonOscillators";
import TriadSelector from "./TriadSelector";

import {equalTemperamentMultiple, justTemperamentMultiple, pythagoreanTemperamentMultiple} from "../constant";

/**
 * 音階の種類の型
 * @enum "equal" 12平均律
 * @enum "just" 純正律
 * @enum "pythagorean" ピタゴラス音律
 */
type Temperament =
  "equal"
  | "just"
  | "pythagorean"

export default function ScaleApp() {
  const [tonicFreq, setTonicFreq] = useState<number>(440 * 2 ** (-9/12));
  const [temperament, setTemperament] = useState<Temperament>("equal")

  const idx: number[] = Array.from({ length: 24 }, (_, i) => i);

  const freqs = useMemo(() => {
    switch (temperament) {
      case "equal":
        return idx.map((i) => tonicFreq * (1 + Math.floor(i / 12)) * equalTemperamentMultiple[i % 12]);
      case "just":
        return idx.map((i) => tonicFreq * (1 + Math.floor(i / 12)) * justTemperamentMultiple[i % 12]);
      case "pythagorean":
        return idx.map((i) => tonicFreq * (1 + Math.floor(i / 12)) * pythagoreanTemperamentMultiple[i % 12]);
    }
  }, [tonicFreq, temperament])

  const [isSoundOnList, setIsSoundOnList] = useState<boolean[]>(idx.map((_, i) => false));

  return (
    <>
      <Box>
        Tonic = <FrequencyInput freq={tonicFreq} setFreq={setTonicFreq}/>
        Set to:
        <ButtonGroup variant={"text"}>
          <Button onClick={()=>{setTonicFreq(440 * 2 ** (-12/12))}}>A3</Button>
          <Button onClick={()=>{setTonicFreq(440 * 2 ** (-9/12))}}>C4</Button>
          <Button onClick={()=>{setTonicFreq(440 * 2 ** (-0/12))}}>A4</Button>
          <Button onClick={()=>{setTonicFreq(440 * 2 ** (+3/12))}}>C5</Button>
        </ButtonGroup>
      </Box>

      <Box>
        <ToggleButtonGroup
          value={temperament}
          size={"small"}
          color={"primary"}
          exclusive={true}
        >
          <ToggleButton value={"equal"} onClick={() => setTemperament("equal")}>平均律</ToggleButton>
          <ToggleButton value={"just"} onClick={() => setTemperament("just")}>純正律</ToggleButton>
          <ToggleButton value={"pythagorean"} onClick={() => setTemperament("pythagorean")}>ピタゴラス音律</ToggleButton>
        </ToggleButtonGroup>
      </Box>


      <DodecagonOscillators
        freqs={freqs}
        isSoundOnList={isSoundOnList}
        setIsSoundOnList={setIsSoundOnList}
      />

      <Button variant={"text"} color={"warning"} onClick={() => {
        setIsSoundOnList(idx.map((i) => {
          return false
        }))
      }}>Stop All</Button>

      <TriadSelector isSoundOnList={isSoundOnList} setIsSoundOnList={setIsSoundOnList} />
    </>
  )
}
