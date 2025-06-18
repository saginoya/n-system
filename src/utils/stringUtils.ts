/**
 * 文字列の前後の空白を削除します
 * @param value - 処理対象の文字列
 * @returns 前後の空白が削除された文字列
 */
export const trim = (value: string): string => {
  return value.trim()
}

/**
 * 文字列がすべて半角文字かどうかを判定します
 * @param value - 判定対象の文字列
 * @returns すべて半角文字の場合はtrue、それ以外はfalse
 */
export const isSingleByte = (value: string): boolean => {
  if (value.match(/^[ -~]*$/)) {
    return true
  } else {
    return false
  }
}

/**
 * カタカナをひらがなに変換します
 * @param value - 変換対象の文字列
 * @returns カタカナがひらがなに変換された文字列
 */
export const convertKatakanaToHiragana = (value: string): string => {
  return value.replace(/[\u30A1-\u30F6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60
    return String.fromCharCode(chr)
  })
}

/**
 * 全角英数字を半角に変換します
 * @param value - 変換対象の文字列
 * @returns 全角英数字が半角に変換された文字列、入力がundefinedの場合はundefined
 */
export const convertFullWidthToHalfWidth = (value: string | undefined): string | undefined => {
  if (value === undefined) return undefined
  return value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  })
}

/**
 * 全角記号を半角に変換します
 * @param value - 変換対象の文字列
 * @returns 全角記号が半角に変換された文字列、入力がundefinedの場合はundefined
 */
export const convertSymbolToHalfWidth = (value: string | undefined): string | undefined => {
  if (value === undefined) return undefined

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
    '　': ' ',
  }

  return value.replace(
    /[！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～\u3000]/g,
    (match) => symbolMap[match] || match,
  )
}

/**
 * PascalCase の文字列を kebab-case に変換する
 * WEBコンポーネントの生成にも利用するため慎重に扱う
 * - 大文字の前にハイフンを挿入
 * - 数字の前にもハイフンを挿入（数字が続くと複数回ハイフンが入ることに注意）
 * - 全体を小文字に変換
 * - 先頭・末尾のハイフンを削除
 * - 重複したハイフンは1つにまとめる
 * @param input - PascalCase の文字列
 * @returns kebab-case の文字列
 */
export const pascalToKebab = (input: string): string => {
  return input
    .replace(/([A-Z])/g, '-$1') // 大文字の前にハイフン
    .replace(/(\d+)/g, '-$1') // 数字の前にハイフン
    .toLowerCase() // 小文字に
    .replace(/^-|-$/g, '') // 先頭・末尾のハイフン除去
    .replace(/-+/g, '-') // 重複ハイフンを1つに
}
