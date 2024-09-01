import React from "react";
import {Button, ButtonGroup, Input} from "@mui/material";

type FrequencyInputProps = {
  freq: number | undefined
  setFreq: Function
}

export default function FrequencyInput(props: FrequencyInputProps) {
  return (
    <>
      <Input
        value={props.freq ? props.freq.toFixed(5) : ""}
        style={{ width: "280px" }}
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
        endAdornment={
          <ButtonGroup variant={"text"}>
            <Button onClick={()=>{props.setFreq(440 * 2 ** (-12/12))}}>A3</Button>
            <Button onClick={()=>{props.setFreq(440 * 2 ** (-9/12))}}>C4</Button>
            <Button onClick={()=>{props.setFreq(440 * 2 ** (-0/12))}}>A4</Button>
            <Button onClick={()=>{props.setFreq(440 * 2 ** (+3/12))}}>C5</Button>
          </ButtonGroup>
        }
      />


    </>

  )
}