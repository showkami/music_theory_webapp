import React from "react";
import {Input} from "@mui/material";

type FrequencyInputProps = {
  freq: number | undefined
  setFreq: Function
}

export default function FrequencyInput(props: FrequencyInputProps) {
  return (
    <Input
      value={props.freq ? props.freq : ""}
      placeholder={"Frequency"}
      type={"number"}
      onChange={(event) => {
        const value = Number(event.target.value);
        if (value !== null && value !== undefined) {
          props.setFreq(value);
        } else {
          props.setFreq(undefined);
        }
      }}
    />
  )
}