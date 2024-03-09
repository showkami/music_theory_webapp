import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup, TableContainer, TableHead, TableCell, TableRow, Table, TableBody
} from "@mui/material";
import OscillatorButton from "../component/OscillatorButton.tsx";
import FrequencyInput from "../component/FrequencyInput.tsx";
import DodecagonOscillators from "../component/DodecagonOscillators.tsx";

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
  const [tonicFreq, setTonicFreq] = useState<number>(261.6255653006);
  const [temperament, setTemperament] = useState<Temperament>("equal")

  const idx: number[] = Array.from({ length: 12 }, (_, i) => i);

  //const [freqs, setFreqs] = useState<number[]>([]);
  const freqs = useMemo(() => {
    switch (temperament) {
      case "equal":
        return  idx.map((_, i) => tonicFreq * 2 ** (i / 12));
      case "just":
        // see https://ja.wikipedia.org/wiki/%E7%B4%94%E6%AD%A3%E5%BE%8B
        return [
          tonicFreq,
          0,  // 純正律の黒鍵・・・
          tonicFreq * 9 / 8,
          tonicFreq * 6 / 5,  // 純正律の黒鍵・・・だが単調のIII音から
          tonicFreq * 5 / 4,
          tonicFreq * 4 / 3,
          0,  // 純正律の黒鍵・・・
          tonicFreq * 3 / 2,
          tonicFreq * 8 / 5,  // 純正律の黒鍵・・・だが短調のVI音から
          tonicFreq * 5 / 3,
          tonicFreq * 9 / 5,  // 純正律の黒鍵・・・だが短調のVII音から
          tonicFreq * 15 / 8,
        ];
      case "pythagorean":
        // see https://ja.wikipedia.org/wiki/%E3%83%94%E3%82%BF%E3%82%B4%E3%83%A9%E3%82%B9%E9%9F%B3%E5%BE%8B
        return [
          tonicFreq,  // 完全一度
          tonicFreq * 256 / 243,  // 短2度
          tonicFreq * 9 / 8,  // 長2度
          tonicFreq * 32 / 27, // 短3度
          tonicFreq * 81 / 64, // 長3度
          tonicFreq * 4 / 3, // 完全4度
          tonicFreq * 729 / 512, // 増4度 (減5度としては1024/729... 異名同音が異なる音になってしまう)
          tonicFreq * 3 / 2, // 完全5度
          tonicFreq * 128 / 81, // 短6度
          tonicFreq * 27 / 16, // 長6度
          tonicFreq * 16 / 9, // 短7度
          tonicFreq * 243 / 128, // 長7度
        ];
    }
  }, [tonicFreq, temperament])

  const [isSoundOnList, setIsSoundOnList] = useState<boolean[]>(idx.map((_, i) => false));

  return (
    <>
      <Typography variant={"h2"}>ScaleApp</Typography>

      Tonic = <FrequencyInput freq={tonicFreq} setFreq={setTonicFreq}/>

      <Box>
        <ToggleButtonGroup
          value={temperament}
          onChange={(event, newTemperament) => {setTemperament(newTemperament)}}
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

      <TableContainer component={"paper"}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>和音構成</TableCell>
              <TableCell>自然長音階</TableCell>
              <TableCell>和声短音階</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>I - III - V (Tonic)</TableCell>
              <TableCell> <Button onClick={()=>setIsSoundOnList([true, false, false, false, true, false, false, true, false, false, false, false])}></Button> </TableCell>
              <TableCell>1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
