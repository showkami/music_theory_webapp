import {Button, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

type TriadSelectorProps = {
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
    const idx = Array.from({ length: 12 }, (_, i) => i);
    const newSoundOnList = idx.map((i) => onIds.includes(i));
    props.setIsSoundOnList(newSoundOnList);
  }

  /**
   * isSoundOnList を全てOffにする
   */
  const resetIsSoundOnList = () => {
    props.setIsSoundOnList(Array.from({length: 12}, () => false));
  }

  /**
   * 押している間だけ、 onIds で指定した単音をOnにして、離すとすべてOffになる、ようなボタン
   * @param onIds
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
              <TableCell>和音構成</TableCell>
              <TableCell>自然長音階</TableCell>
              <TableCell>和声短音階</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>I - III - V (Tonic)</TableCell>
              <TableCell> <PlayButton onIds={[0,4,7]} /> </TableCell>
              <TableCell> <PlayButton onIds={[0,3,7]} /> </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>II - IV - VI</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IV - VI - I' (Subdominant)</TableCell>
              <TableCell> <PlayButton onIds={[]} /> </TableCell>
                {/*TODO: 1オクターブ高いやつもDodecagonに加えないと、鳴らせない。。*/}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
  )
}