export const useTextFormatter = () => {
  // 文字列前後の空白を削除
  const trim = (value: string): string => {
    return value.trim()
  }

  // 文字列がすべて半角文字かの判定
  const isSingleByteChara = (value: string): boolean => {
    if (value.match(/^[ -~]*$/)) {
      return true
    } else {
      return false
    }
  }

  // カタカナをひらがなに変換
  const katakanaToHiragana = (value: string): string => {
    return value.replace(/[\u30A1-\u30F6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60
      return String.fromCharCode(chr)
    })
  }

  // 英数字を全角から半角へ変換する
  const convertFullWidthToHalfWidth = (value: string | undefined): string | undefined => {
    if (!value) return undefined
    return value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    })
  }

  // 全角の記号を半角へ変換する
  const convertFullWidthSymbolToHalfWidth = (value: string | undefined): string | undefined => {
    if (!value) return undefined

    const symbolMap: { [key: string]: string } = {
      '！': '!',
      '＂': '"',
      '＃': '#',
      '＄': '$',
      '％': '%',
      '＆': '&',
      '＇': "'",
      '（': '(',
      '）': ')',
      '＊': '*',
      '＋': '+',
      '，': ',',
      '－': '-',
      '．': '.',
      '／': '/',
      '：': ':',
      '；': ';',
      '＜': '<',
      '＝': '=',
      '＞': '>',
      '？': '?',
      '＠': '@',
      '［': '[',
      '＼': '\\',
      '］': ']',
      '＾': '^',
      '＿': '_',
      '｀': '`',
      '｛': '{',
      '｜': '|',
      '｝': '}',
      '～': '~',
      '　': ' '
    }

    return value.replace(
      /[！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～\u3000]/g,
      (match) => symbolMap[match] || match
    )
  }

  return {
    trim,
    isSingleByteChara,
    katakanaToHiragana,
    convertFullWidthToHalfWidth,
    convertFullWidthSymbolToHalfWidth
  }
}
