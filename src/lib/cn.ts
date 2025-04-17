import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * TailwindCSSのユーティリティークラスの文字列を抽出
 * ・配列の情報から整形する
 * ・競合するクラスを解決する
 * @param inputs クラスの配列
 * @returns
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(...inputs))
