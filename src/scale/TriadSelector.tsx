import {
  Tooltip,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import React from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import InfoIcon from '@mui/icons-material/Info';
import {capitalRomanNumeral, harmonicMinorScaleIdx, naturalMajorScaleIdx, smallRomanNumeral} from "../constant.tsx";

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
        <PlayCircleIcon />
      </Icon>
    )
  }

  return (
    <TableContainer >
        <Table size={"small"} stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell> Root <Tooltip color={"action"} title={"根音...第I音〜第VII音"}><InfoIcon fontSize={"small"}/></Tooltip> </TableCell>
              <TableCell> min <Tooltip color={"action"} title={"短三和音 = 根音 + 短三度 + 完全五度"}><InfoIcon fontSize={"small"}/></Tooltip> </TableCell>
              <TableCell> Maj <Tooltip color={"action"} title={"長三和音 = 根音 + 長三度 + 完全五度"}><InfoIcon fontSize={"small"}/></Tooltip> </TableCell>
              <TableCell> Dim <Tooltip color={"action"} title={"減三和音 = 根音 + 短三度 + 減五度(三全音)"}><InfoIcon fontSize={"small"}/></Tooltip> </TableCell>
              <TableCell> Aug <Tooltip color={"action"} title={"増三和音 = 根音 + 長三度 + 増五度"}><InfoIcon fontSize={"small"}/></Tooltip> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // 根音が第I音〜第VII音までの三和音を表示
              Array.from(
                {length: 12}, (_, i) => i
              ).map((_, rootIdx) => {
                // 第(i+1)三和音 ((i+1)度の和音) を構成する3つの半音
                const minorTriad = [0 + rootIdx, 3 + rootIdx, 7 + rootIdx];
                const majorTriad = [0 + rootIdx, 4 + rootIdx, 7 + rootIdx];
                const diminishedTriad = [0 + rootIdx, 3 + rootIdx, 6 + rootIdx];
                const augmentedTriad = [0 + rootIdx, 4 + rootIdx, 8 + rootIdx];

                // 和音の構成音が、すべて長音階or短音階の中に含まれるかどうかを判定する関数。
                const isInMajorScale = (onIds: number[]) => onIds.every((id) => naturalMajorScaleIdx.includes(id % 12));
                const isInMinorScale = (onIds: number[]) => onIds.every((id) => harmonicMinorScaleIdx.includes(id % 12));

                // 音階に含まれる和音であれば、Chipを表示 　　　　　　　　　　　　　　　　　
                const ScaleChip = (scaleChipProps: {isInMajorScale: boolean, isInMinorScale: boolean}) => {
                  return (
                    <>
                      {
                        scaleChipProps.isInMajorScale ? <Tooltip title={"自然長音階に含まれる和音"}> <Chip size={"small"} label={"M"} color={"primary"} /> </Tooltip> : <></>
                      }
                      {
                        scaleChipProps.isInMinorScale ? <Tooltip title={"和声短音階に含まれる和音"}> <Chip size={"small"} label={"m"} color={"secondary"} /> </Tooltip> : <></>
                      }
                    </>
                  )
                }

                // 表を表示
                return (
                  <TableRow key={rootIdx}>
                    <TableCell>
                      {/*根音の列*/}
                      {rootIdx}
                      {isInMajorScale([rootIdx]) ?
                        <Chip
                          variant={"outlined"}
                          size={"small"}
                          color={"primary"}
                          label={capitalRomanNumeral[naturalMajorScaleIdx.findIndex((majSclIdx)=>{return majSclIdx===rootIdx})]} // i番目の半音が、長音階の第何音であるかを返す (例: 4番目の半音は、第III音)
                        />
                        : <></>
                      }
                      {isInMinorScale([rootIdx]) ?
                        <Chip
                          variant={"outlined"}
                          size={"small"}
                          color={"secondary"}
                          label={smallRomanNumeral[harmonicMinorScaleIdx.findIndex((mnrSclIdx)=>{return mnrSclIdx===rootIdx})]} // i番目の半音が、短音階の第何音であるかを返す (例: 3番目の半音は、第iii音)
                        />
                        : <></>}
                    </TableCell>
                    {
                      // 短三和音、長三和音、減三和音、増三和音 の各列
                      [minorTriad, majorTriad, diminishedTriad, augmentedTriad].map((triad, j) => {
                        return (
                          <TableCell key={j}>
                            <PlayButton onIds={triad} />
                            <ScaleChip isInMajorScale={isInMajorScale(triad)} isInMinorScale={isInMinorScale(triad)} />
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
  )
}