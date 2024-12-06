import { ref, computed } from 'vue'

/**
 * バリデーションルールの型定義
 * @property required - 必須入力チェックを行うかどうか
 * @property pattern - 入力値のパターンマッチング用の正規表現文字列
 * @property maxlength - 入力値の文字数上限
 * @property minlength - 入力値の文字数下限
 */
type ValidationRule = {
  required?: boolean
  pattern?: string
  maxlength?: number
  minlength?: number
}

/**
 * バリデーションエラーメッセージの定義
 * @constant
 */
const ERROR_MESSAGES = {
  required: '必須項目です',
  pattern: '形式が不正です',
  maxlength: '文字数が上限を超えています',
  minlength: '文字数が足りません'
} as const

/**
 * フォーム値のバリデーションを行うためのコンポーザブル
 * @param rule - バリデーションルールオブジェクト
 * @returns バリデーション関連の状態と関数を含むオブジェクト
 */
export const useValidation = (rule: ValidationRule) => {
  /**
   * バリデーションエラーメッセージを格納する配列
   */
  const errors = ref<string[]>([])

  /**
   * バリデーションが成功しているかどうかを示す算出プロパティ
   * @returns エラーが存在しない場合はtrue
   */
  const isValid = computed(() => errors.value.length === 0)

  /**
   * 必須入力チェックを行う
   * @param value - 検証する値
   */
  const validateRequired = (value?: string): void => {
    // 値が空の場合、required設定に応じて結果を返す
    if (!value || !value.trim()) {
      errors.value.push(ERROR_MESSAGES.required)
    }
  }

  /**
   * パターンマッチングによる入力値の検証を行う
   * @param value - 検証する値
   * @param pattern - 正規表現パターン
   */
  const validatePattern = (value?: string, pattern?: string): void => {
    // 値が空でパターンが指定されている場合のみ検証
    if (!value?.trim() || !pattern) return

    if (!new RegExp(pattern).test(value)) {
      errors.value.push(ERROR_MESSAGES.pattern)
    }
  }

  /**
   * 入力値の文字数上限チェック
   * @param value - 検証する値
   * @param maxlength - 上限数
   */
  const validateMaxlength = (value?: string, maxlength?: number): void => {
    // 値が空でパターンが指定されている場合のみ検証
    if (!value?.trim() || !maxlength) return

    if (value.length > maxlength) {
      errors.value.push(ERROR_MESSAGES.maxlength)
    }
  }

  /**
   * 入力値の文字数下限チェック
   * @param value - 検証する値
   * @param minlength - 下限数
   */
  const validateMinlength = (value?: string, minlength?: number): void => {
    // 値が空でパターンが指定されている場合のみ検証
    if (!value?.trim() || !minlength) return

    if (value.length < minlength) {
      errors.value.push(ERROR_MESSAGES.minlength)
    }
  }

  /**
   * 全てのバリデーションルールに基づいて値の検証を実行
   * @param value - 検証する値
   *
   * @example
   * const validation = useValidation({ required: true, pattern: '^[A-Za-z0-9]+$' })
   * const isValid = validation.validate('test123')
   */
  const validate = (value?: string): void => {
    // エラーメッセージをリセット
    errors.value = []

    const { required, pattern, maxlength, minlength } = rule

    // 必須チェック
    if (required) validateRequired(value)
    // パターンマッチング
    if (pattern) validatePattern(value, pattern)
    // 文字数上限チェック
    if (maxlength) validateMaxlength(value, maxlength)
    // 文字数下限チェック
    if (minlength) validateMinlength(value, minlength)
  }

  return {
    errors,
    isValid,
    validate
  }
}
