import {
  Tooltip,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import InfoIcon from '@mui/icons-material/Info';
import {capitalRomanNumeral} from "../constant.tsx";

type TriadSelectorProps = {
  isSoundOnList: boolean[],
  setIsSoundOnList: Function
}

/**
 * 三和音の再生ボタンを表示する
 * @constructor
 */
export default function TriadSelector(props: TriadSelectorProps) {

  /**
   * onIds で指定した番目の単音をOnにし、他をOffにする
   * @param onIds
   * @example
   * // 0番目・3番の単音をOnにし、他をOffにする
   * setIsSoundOnList([0, 3])
   *  -> isSoundOnList -> [true, false, false, true, false, false, false, false, false, false, false, false]
   */
  const setIsSoundOnList = (onIds: number[]) => {
    const idx = Array.from({ length: props.isSoundOnList.length }, (_, i) => i);
    const newSoundOnList = idx.map((i) => onIds.includes(i));
    props.setIsSoundOnList(newSoundOnList);
  }

  /**
   * isSoundOnList を全てOffにする
   */
  const resetIsSoundOnList = () => {
    props.setIsSoundOnList(Array.from({length: props.isSoundOnList.length}, () => false));
  }

  /**
   * 押している間だけ、 onIds で指定した単音をOnにして、離すとすべてOffになる、ようなボタン
   */
  const PlayButton = (playButtonProps: {onIds: number[]}) => {
    return (
      <Icon
        onClick={() => setIsSoundOnList(playButtonProps.onIds)}
      >
        <PlayCircleIcon/>
      </Icon>
    )
  }

  return (
    <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Root <Tooltip title={"根音...第I音〜第VII音"}><InfoIcon fontSize={"small"}/></Tooltip> </TableCell>
              <TableCell> Minor triad <Tooltip title={"短三和音 = 根音 + 短三度 + 完全五度"}><InfoIcon fontSize={"small"}/></Tooltip> </TableCell>
              <TableCell> Major triad <Tooltip title={"長三和音 = 根音 + 長三度 + 完全五度"}><InfoIcon fontSize={"small"}/></Tooltip> </TableCell>
              <TableCell> Diminished triad <Tooltip title={"減三和音 = 根音 + 短三度 + 減五度(三全音)"}><InfoIcon fontSize={"small"}/></Tooltip> </TableCell>
              <TableCell> Augmented triad <Tooltip title={"増三和音 = 根音 + 長三度 + 増五度"}><InfoIcon fontSize={"small"}/></Tooltip> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // 根音が第I音〜第VII音までの三和音を表示
              Array.from(
                {length: 7}, (_, i) => i
              ).map((_, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell> {capitalRomanNumeral[i]} </TableCell>
                    <TableCell> <PlayButton onIds={[0+i, 3+i, 7+i]} /> </TableCell>
                    <TableCell> <PlayButton onIds={[0+i, 4+i, 7+i]} /> </TableCell>
                    <TableCell> <PlayButton onIds={[0+i, 3+i, 6+i]} /> </TableCell>
                    <TableCell> <PlayButton onIds={[0+i, 4+i, 8+i]} /> </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
  )
}