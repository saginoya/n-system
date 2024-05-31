export const useText = () => {
  // 前後の空白削除
  const trim = (value: string): string => {
    return value.trim()
  }

  // 半角文字かの判定
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

  return {
    trim,
    isSingleByteChara,
    katakanaToHiragana
  }
}
