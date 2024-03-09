import {Avatar, Button, IconButton, ToggleButton, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {Oscillator} from "tone";


type OscillatorButtonProps = {
  freq: number,
  isSoundOn: boolean,
  setIsSoundOn: Function,
  buttonType: "ToggleButton" | "CircleButton"
  label?: string
  buttonProps?: {}
}

const OscillatorButton = (props: OscillatorButtonProps) => {
  console.warn(`OscillatorButton is rendered; isOn=${props.isSoundOn} freq=${props.freq}`)

  useEffect(()=>{
    const osc = new Oscillator(props.freq, "sine").toDestination();
    if (props.isSoundOn) osc.start();
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
            sx={{bgcolor: props.isSoundOn? "primary.main" : "default"}}
          >
            <Typography variant={"button"}>
              {props.label ? props.label : undefined}
            </Typography>
          </Avatar>
        </IconButton>
      )
  }
}

export default OscillatorButton;