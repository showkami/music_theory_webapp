import React, {useEffect, useMemo, useState} from 'react';
import DodecaPoints, {PointProps} from "./DodecaPoints.tsx";

import {Oscillator} from "tone";


const ScaleApp = () => {
  const degrees = [1,2,3,4,5,6,7,8,9,10,11,12];
  const tonic: number = 440.0;
  const frequencies: number[] = degrees.map((degree) => { return tonic * 2**((degree - 1) / 12)});

  const oscillators: Oscillator[] = useMemo(() => {
    console.warn("oscillators are created!");
    return frequencies.map((frequency, i) => {
      const osc = new Oscillator(frequency, "sine").toDestination()
      osc.debug = true;
      return osc
    })
  }, []);
  console.log("oscillators:", oscillators);

  const [isMuteList, setIsMuteList] = React.useState<boolean[]>(Array(12).fill(true));

  const [pointInfos, setPointInfos] = useState<PointProps[]>(
    frequencies.map((frequency, i) => {
      return {
        isMute: isMuteList[i],
        label: frequency.toFixed(2),
        handleClick: () => {
          const isMute = isMuteList[i];
          isMute ? oscillators[i].start() : oscillators[i].stop();
          const newIsMuteList = [...isMuteList];
          newIsMuteList[i] = !isMute;
          console.log("isMuteList is changing from ", isMuteList, " to ", newIsMuteList);
          setIsMuteList(newIsMuteList); // 新しいオブジェクトをsetしないと、ステートが更新されていないとみなされてDodecaPointsが再レンダリングされない
        }
      }
    })
  );

  return (
    <>
      <h1>ScaleApp</h1>
      <DodecaPoints
        points={pointInfos}
      />
    </>
  );
}

export default ScaleApp;