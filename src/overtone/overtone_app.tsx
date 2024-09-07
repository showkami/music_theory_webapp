import {Box, Button, Slider, Stack, Grid, Typography, Divider} from "@mui/material"
import FrequencyInput from "../component/FrequencyInput";
import {useState} from "react";
import OscillatorButton from "../component/OscillatorButton";

export default function OvertoneApp() {
  const [fundFreq, setFundFreq] = useState<number>(440 * 2 ** (-9/12));

  const overtoneLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  const [isSoundsOn, setIsSoundsOn] = useState<boolean[]>(overtoneLevels.map((_) => false))
  const [soundVolumes, setSoundVolumes] = useState<number[]>(overtoneLevels.map((_) => 1));

  /**
   * 1st, 2nd とかを返す
   * @param n
   * @example formatOrder(1) => "1st"
   * @example formatOrder(2) => "2nd"
   */
  const formatOrder = (n: number) => {
    let pr = new Intl.PluralRules("en-US", { type: "ordinal" });
    const suffixes = new Map([
      ["one", "st"],
      ["two", "nd"],
      ["few", "rd"],
      ["other", "th"],
    ]);
    const rule = pr.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
  }

  return (
    <>
      Set fundamental freq: <FrequencyInput freq={fundFreq} setFreq={setFundFreq} />

      <Box>
        <Button
          color={"error"}
          variant={"text"}
          onClick={()=>{
            setIsSoundsOn(overtoneLevels.map(()=>false))
          }}
        >Stop All</Button>
      </Box>

      <Box>
        {overtoneLevels.map((level: number, i) => {
          return (
            <Stack>
              <Grid container paddingLeft={1} paddingRight={1}>
                {/* 第i倍音の説明 */}
                <Grid item xs={4} md={2}>
                  {
                    [1].map(() => {
                      // 第i倍音は2の何乗か？＝基音から何オクターブと何セントずれているか
                      const log = Math.log2(level)
                      const octave = Math.floor(log)
                      const toneChroma = log % 1

                      // 12音階平均律の0~11番の音程のうち、toneChromaに一番近いものと、そこからtoneChromaまでのズレを求める
                      const nearest = Math.round(toneChroma * 12)
                      const diff = toneChroma * 12 - nearest

                      // 説明書きをreturn
                      return (
                        <>
                          <Typography variant={"caption"} fontSize={15}>第{level}倍音</Typography> <br/>
                          <details>
                            <summary>
                              <Typography variant={"caption"} fontSize={10}>{octave}oct+{nearest}半音{diff >= 0 ? "+" : "-"}{Math.abs(diff*100).toFixed(0)}ｾﾝﾄ</Typography>
                            </summary>

                              <Typography variant={"caption"} fontSize={10}>log{level} = {octave}+{toneChroma.toFixed(5)}</Typography> <br/>
                              <Typography variant={"caption"} fontSize={10}>= {octave}+({nearest}{diff >= 0 ? "+" : "-"}{Math.abs(diff).toFixed(5)})/12</Typography><br/>
                          </details>
                        </>
                      )
                    })
                  }

                </Grid>

                {/* 再生ボタン */}
                <Grid item xs={2} md={2}>
                  <OscillatorButton
                    freq={fundFreq * level}
                    isSoundOn={isSoundsOn[i]}
                    setIsSoundOn={() => {
                      setIsSoundsOn((prev) => {
                        const newIsSoundsOn = [...prev];
                        newIsSoundsOn[i] = !newIsSoundsOn[i]
                        return newIsSoundsOn;
                      })
                    }}
                    volume={soundVolumes[i]}
                  />
                </Grid>

                {/* 音量調整 */}
                <Grid item xs={5} md={8} minWidth={"100px"} >
                  <Slider
                    value={soundVolumes[i]}
                    onChange={(evt, value) => {
                      setSoundVolumes((prev) => {
                        const newVolumes = [...prev];
                        newVolumes[i] = value as number;
                        return newVolumes
                      })
                    }}
                    step={0.005}
                    defaultValue={1}
                    min={0}
                    max={1}
                    size={"small"}
                    valueLabelDisplay={"auto"}
                    valueLabelFormat={(value) => value.toFixed(3)}
                  />
                </Grid>
              </Grid>
              <Divider />
            </Stack>
          )
        })}
      </Box>

    </>
  )
}