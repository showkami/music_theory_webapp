import React, {useEffect, useMemo, useState} from 'react';
import {ButtonGroup, Button, Input} from '@mui/material';
import OscillatorButton from './OscillatorButton.tsx'


const ToneApp = () => {
  const [toneFreq, setToneFreq] = useState<number | undefined>(undefined);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);


  return (
    <>
      <h1>ToneApp</h1>

      <div>
        <Input
          value={toneFreq ? toneFreq : ""}
          placeholder={"Frequency"}
          type={"number"}
          onChange={(event) => {
            const value = Number(event.target.value);
            if (value !== null && value !== undefined) {
              setToneFreq(value);
            } else {
              setToneFreq(undefined);
            }
          }}
        />
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