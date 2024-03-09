import {Button, ToggleButton} from "@mui/material";
import React, {useEffect} from "react";
import {Oscillator} from "tone";


type OscillatorButtonProps = {
  freq: number,
  isSoundOn: boolean,
  setIsSoundOn: Function,
  buttonType: "ToggleButton"
  label?: string
}

const OscillatorButton = (props: OscillatorButtonProps) => {
  console.warn(`OscillatorButton is rendered; isOn=${props.isSoundOn} freq=${props.freq}`)

  useEffect(()=>{
    const osc = new Oscillator(props.freq, "sine").toDestination();
    if (props.isSoundOn) osc.start();
    return ()=>{osc.stop()} // クリーンアップ関数。再レンダー時にこれが呼ばれ、stopする。これをやりたいがためにuseEffectを使っている
  }) // 依存配列を渡さない (レンダーのたびにeffectを実行)。[] で指定すると初回レンダー時にしかeffectが実行されないので、 on/off 切り替わってもeffectが実行されないままになってしまう

  switch (props.buttonType) {
    case "ToggleButton":
      return (
        <ToggleButton value={"ring"} selected={props.isSoundOn} onClick={() => {
          props.setIsSoundOn(!props.isSoundOn);
        }}>
          {props.label ? props.label : undefined}
        </ToggleButton>
      )
  }
}

export default OscillatorButton;