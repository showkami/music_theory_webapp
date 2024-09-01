import {Box, Button, Slider, Stack, Grid, Input} from "@mui/material"
import FrequencyInput from "../component/FrequencyInput";
import {useState} from "react";
import OscillatorButton from "../component/OscillatorButton";
export default function OvertoneApp() {
  const [fundFreq, setFundFreq] = useState<number>(440 * 2 ** (-9/12));

  const overtoneLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [isSoundsOn, setIsSoundsOn] = useState<boolean[]>(overtoneLevels.map((_) => false))
  const [soundVolumes, setSoundVolumes] = useState<number[]>(overtoneLevels.map((_) => 1));
  console.log(isSoundsOn)

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
              <Grid container paddingLeft={2} paddingRight={2}>
                <Grid item xs={6} md={2}>
                  <OscillatorButton
                    freq={fundFreq * level}
                    label={formatOrder(level) + "(" + (fundFreq * level).toFixed(2) + " Hz)"}
                    isSoundOn={isSoundsOn[i]}
                    setIsSoundOn={() => {
                      setIsSoundsOn((prev) => {
                        const newIsSoundsOn = [...prev];
                        newIsSoundsOn[i] = !newIsSoundsOn[i]
                        console.log(prev, newIsSoundsOn)
                        return newIsSoundsOn;
                      })
                    }}
                    volume={soundVolumes[i]}
                    buttonType={"ToggleButton"}
                  />
                </Grid>
                <Grid item xs={6} md={8} minWidth={"100px"} >
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
            </Stack>
          )
        })}
      </Box>

    </>
  )
}