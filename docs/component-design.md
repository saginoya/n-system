# N-Systemのコンポーネント設計について

## 📁 ディレクトリ構成

```
assets/             # 静的ファイル

components/
  ├── entries/      # 実際にビルドされるコンポーネント# レイアウトなど他の要素を整理するためのコンポーネント
  ├── features/     # UIに対して独自性や専門性のある変更をしたコンポーネント
  ├── icons/        # アイコン
  ├── templates/    # ページ単位でのレイアウト
  ├── ui/           # 最小単位のUIコンポーネント（Button, Input など）

composables/        # 再利用可能なロジック（useFetchData, useFormValidation など）

lib/                # 外部ライブラリを扱う（ラッパー関数など）

styles/             # CSSのクラスを取得するための関数

tests/              # テストファイル

types/              # 型定義（TypeScript 用）

utils/              # 共通のユーティリティ関数
```
