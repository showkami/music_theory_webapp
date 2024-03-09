import React, {useEffect, useMemo, useState} from 'react';
import {ButtonGroup, Button, Input, Typography} from '@mui/material';
import OscillatorButton from '../component/OscillatorButton.tsx'
import FrequencyInput from "../component/FrequencyInput.tsx";


const ToneApp = () => {
  const [toneFreq, setToneFreq] = useState<number | undefined>(440);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);


  return (
    <>
      <Typography variant={"h2"}>ToneApp</Typography>

      <div>
        <FrequencyInput freq={toneFreq} setFreq={setToneFreq} />
      </div>

      <div>
        {toneFreq ?　
          <OscillatorButton
            freq={toneFreq}
            isSoundOn={isSoundOn}
            setIsSoundOn={setIsSoundOn}
            label={`Ring ${toneFreq} Hz`}
            buttonType={"ToggleButton"}
          />　: <></>}
      </div>

    </>
  )
}

export default ToneApp;