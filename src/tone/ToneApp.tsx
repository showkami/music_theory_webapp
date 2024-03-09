import React, {useEffect, useMemo, useState} from 'react';


import {Oscillator} from "tone";

const ToneApp = () => {
  const [toneFreq, setToneFreq] = useState<number>(440.0);

  return (
    <>
      <h1>ToneApp</h1>
    </>
  )
}

export default ToneApp;