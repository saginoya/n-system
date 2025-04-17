# N-Systemのコンポーネント設計について

## 📁 ディレクトリ構成

```
assets/             #

components/
  ├── container/    # レイアウトなど他の要素を整理するためのコンポーネント
  ├── parts/        # 最小単位のUIコンポーネント（Button, Input など）
  ├── icons/        # アイコン
  ├── layouts/      # ページ単位でのレイアウト
  ├── n-elements/   # 実際にビルドされるコンポーネント

composables/        # 再利用可能なロジック（useFetchData, useFormValidation など）

styles/             # CSSのクラスを取得するための関数

tests/              # テストファイル

types/              # 型定義（TypeScript 用）

utils/              # 共通のユーティリティ関数
```
