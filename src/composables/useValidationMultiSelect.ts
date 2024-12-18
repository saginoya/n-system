import { ref, computed } from 'vue'

/**
 * バリデーションルールの型定義
 * @property required - 必須入力チェックを行うかどうか
 * @property maxlength - 入力値の数上限
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
  maxlength: '選択数が上限を超えています'
} as const

/**
 * フォーム値のバリデーションを行うためのコンポーザブル
 *
 * @param rule バリデーションルールオブジェクト
 * @returns バリデーション関連の状態と関数を含むオブジェクト
 */
export const useValidationMultiSelect = (rule: ValidationRule) => {
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
  const validateRequired = (value?: any[]): void => {
    // 値が空の場合、required設定に応じて結果を返す
    if (!value) {
      errors.value.push(ERROR_MESSAGES.required)
    }
  }

  /**
   * 入力値の文字数上限チェック
   * @param value - 検証する値
   * @param maxlength - 上限数
   */
  const validateMaxlength = (value?: any[], maxlength?: number): void => {
    // 値が空でパターンが指定されている場合のみ検証
    if (!value || !maxlength) return

    if (value.length > maxlength) {
      errors.value.push(ERROR_MESSAGES.maxlength)
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
  const validate = (value?: any[]): void => {
    // エラーメッセージをリセット
    errors.value = []

    const { required, maxlength } = rule

    // 必須チェック
    if (required) validateRequired(value)
    // 文字数上限チェック
    if (maxlength) validateMaxlength(value, maxlength)
  }

  return {
    errors,
    isValid,
    validate
  }
}
