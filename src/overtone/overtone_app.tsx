import {Box, Button} from "@mui/material"
import FrequencyInput from "../component/FrequencyInput";
import {useState} from "react";
import OscillatorButton from "../component/OscillatorButton";
export default function OvertoneApp() {
  const [fundFreq, setFundFreq] = useState<number>(220);

  const overtoneLevels = [1, 2, 3, 4, 5, 6, 7];
  const [isSoundsOn, setIsSoundsOn] = useState<boolean[]>(overtoneLevels.map((_) => false))
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
            <Box sx={{display: "flex"}}>
              <OscillatorButton
                freq={fundFreq * level}
                label={formatOrder(level) + "(" + (fundFreq * level).toFixed(5) + " Hz)"}
                isSoundOn={isSoundsOn[i]}
                setIsSoundOn={() => {
                  setIsSoundsOn((prev) => {
                    const newIsSoundsOn = [...prev];
                    newIsSoundsOn[i] = !newIsSoundsOn[i]
                    console.log(prev, newIsSoundsOn)
                    return newIsSoundsOn;
                  })
                }}
                buttonType={"ToggleButton"}
              />
            </Box>
          )
        })}
      </Box>

    </>
  )
}