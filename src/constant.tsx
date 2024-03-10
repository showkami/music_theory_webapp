export const majorScaleIdx: number[]         = [0, 2, 4, 5, 7, 9, 11];
export const minorScaleIdx: number[]         = [0, 2, 3, 5, 7, 8, 10];
export const harmonicMinorScaleIdx: number[] = [0, 2, 3, 5, 7, 8, 11];
export const melodicMinorScaleIdx: number[]  = [0, 2, 3, 5, 7, 9, 11];

/**
 * 12平均律の各音の、主音との周波数比
 */
export const equalTemperamentMultiple: number[] = Array.from({ length: 24 }, (_, i) => 2 ** (i / 12));

/**
 * 純正律の各音の、主音との周波数比
 * see https://ja.wikipedia.org/wiki/%E7%B4%94%E6%AD%A3%E5%BE%8B
 */
export const justTemperamentMultiple: number[] = [
    1,
    0,  // 純正律の黒鍵・・・
    9 / 8,
    6 / 5,  // 純正律の黒鍵・・・だが単調のIII音から
    5 / 4,
    4 / 3,
    0,  // 純正律の黒鍵・・・
    3 / 2,
    8 / 5,  // 純正律の黒鍵・・・だが短調のVI音から
    5 / 3,
    9 / 5,  // 純正律の黒鍵・・・だが短調のVII音から
    15 / 8,
  ]

/**
 * ピタゴラス音律の各音の、主音との周波数比
 * see https://ja.wikipedia.org/wiki/%E3%83%94%E3%82%BF%E3%82%B4%E3%83%A9%E3%82%B9%E9%9F%B3%E5%BE%8B
 */
export const pythagoreanTemperamentMultiple: number[] = [
    1,  // 完全一度
    256 / 243,  // 短2度
    9 / 8,  // 長2度
    32 / 27, // 短3度
    81 / 64, // 長3度
    4 / 3, // 完全4度
    729 / 512, // 増4度 (減5度としては1024/729... 異名同音が異なる音になってしまう)
    3 / 2, // 完全5度
    128 / 81, // 短6度
    27 / 16, // 長6度
    16 / 9, // 短7度
    243 / 128, // 長7度
  ]

export const capitalRomanNumeral: string[] = ["I", "II", "III", "IV", "V", "VI", "VII"];
