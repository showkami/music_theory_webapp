import {Avatar, Button, IconButton, ToggleButton, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {Oscillator} from "tone";


type OscillatorButtonProps = {
  freq: number,
  isSoundOn: boolean,
  setIsSoundOn: Function,
  volume?: number,
  buttonType: "ToggleButton" | "CircleButton"
  label?: string
  buttonProps?: {}
}

/**
 * 線形スケールの音量 x（0 ≤ x ≤ 1）をデシベルスケールに変換します。
 *
 * デシベルは対数スケールを使用するため、音量 x の対数を取り、それを20倍してデシベル値を計算します。
 * linearScaleが0の場合、-無限大（音が全くない状態）を返します。
 * linearScaleが1の場合、0 dB. これは元の音量 (システム最大音量) になる
 *
 * @param {number} linearScale - 変換したい線形スケールの音量（0～1の範囲）。
 * @return {number} - 入力された線形スケールの音量に相当するデシベルスケールの値。
 */
const linearToDecibel = (linearScale: number): number => {
  if (linearScale === 0) {
    return -Infinity;
  } else {
    return 20 * Math.log10(linearScale);
  }
}

const OscillatorButton = (props: OscillatorButtonProps) => {

  useEffect(()=>{
    const osc = new Oscillator(props.freq, "sine").toDestination();
    if (props.isSoundOn) osc.start();
    osc.volume.value = props.volume !== undefined ? linearToDecibel(props.volume) : 1
    return ()=>{osc.stop()} // クリーンアップ関数。再レンダー時にこれが呼ばれ、stopする。これをやりたいがためにuseEffectを使っている
  }) // 依存配列を渡さない (レンダーのたびにeffectを実行)。[] で指定すると初回レンダー時にしかeffectが実行されないので、 on/off 切り替わってもeffectが実行されないままになってしまう

  const toggleIsSoundOn = () => {props.setIsSoundOn(!props.isSoundOn)};

  switch (props.buttonType) {
    case "ToggleButton":
      return (
        <Button
          variant={props.isSoundOn ? "contained" : "outlined"}
          onClick={toggleIsSoundOn}
          {...props.buttonProps}
        >
          {props.label ? props.label : undefined}
        </Button>
      )
    case "CircleButton":
      return (
        <IconButton
          onClick={toggleIsSoundOn}
          {...props.buttonProps}
        >
          <Avatar
            sx={{backgroundColor: props.isSoundOn? "primary.main" : "primary.second"}}
          >
            <Typography variant={"caption"}>
              {props.label ? props.label : undefined}
            </Typography>
          </Avatar>
        </IconButton>
      )
  }
}

export default OscillatorButton;