# React Form Uncontrolled User Form

## 目次

* [概要](#概要)
* [学習内容](#学習内容)
* [課題](#課題)
* [条件](#条件)
* [ファイル構成](#ファイル構成)
* [実装](#実装)
* [実装ポイント](#実装ポイント)
* [データの取得方法](#データの取得方法)
* [出力例](#出力例)
* [Uncontrolled Component](#uncontrolled-component)
* [起動方法](#起動方法)

---

## 概要

`useRef`を使用して、複数種類のフォーム要素から入力値を取得するフォームを実装します。

名前、年齢、性別、ニュース購読の入力値を送信時に取得し、1つのオブジェクトとして`console.log`に出力します。

この課題では`useState`を使用せず、フォームの値をDOMから直接取得する**Uncontrolled Component**として実装します。

---

## 学習内容

この課題では、以下を学習します。

* `useRef`
* Uncontrolled Component
* Text Input
* Number Input
* Radio Button
* Checkbox
* `value`
* `checked`
* `FormEvent`
* 複数の`useRef`の管理
* フォーム送信処理
* オブジェクトへのデータ変換

---

## 課題

### 問題文

名前（text）、年齢（number）、性別（radio）、ニュース購読（checkbox）のフォームを作成し、送信時にすべての値をオブジェクトとして`console.log`で出力してください。

`useState`は使用せず、すべて`useRef`で管理してください。

### 条件

1. 名前、年齢、男性、女性、購読チェックボックスの`useRef`を作成する
2. 出力形式は`{ name, age, gender, subscribe }`とする
3. Reactの状態管理は使用しない

---

## ファイル構成

```text id="0g9x4j"
src/
├── hooks/
│   └── useHandleForm.ts
├── pages/
│   └── Form.tsx
├── App.tsx
├── index.css
└── main.tsx
```

---

## 実装

### useHandleForm.ts

```ts id="j6b8kd"
import { useRef } from "react";

const useHandleForm = () => {
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const male = useRef<HTMLInputElement>(null);
  const female = useRef<HTMLInputElement>(null);
  const newsSubscribe = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      name: name.current?.value || "",
      age: age.current?.value || "",
      gender: male.current?.checked
        ? "男性"
        : female.current?.checked
          ? "女性"
          : "",
      subscribe: newsSubscribe.current?.checked || false,
    };

    console.log(data);
  };

  return {
    name,
    age,
    male,
    female,
    newsSubscribe,
    handleSubmit,
  };
};

export default useHandleForm;
```

### Form.tsx

```tsx id="1y83wz"
import useHandleForm from "../hooks/useHandleForm";

const Form = () => {
  const {
    name,
    age,
    male,
    female,
    newsSubscribe,
    handleSubmit,
  } = useHandleForm();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        名前:
        <input id="name" type="text" ref={name} />
      </label>

      <label htmlFor="age">
        年齢:
        <input id="age" type="number" ref={age} />
      </label>

      <fieldset>
        <legend>性別</legend>

        <label htmlFor="male">
          男性
          <input
            id="male"
            type="radio"
            name="gender"
            ref={male}
          />
        </label>

        <label htmlFor="female">
          女性
          <input
            id="female"
            type="radio"
            name="gender"
            ref={female}
          />
        </label>
      </fieldset>

      <label htmlFor="newsSubscribe">
        ニュース購読
        <input
          id="newsSubscribe"
          type="checkbox"
          ref={newsSubscribe}
        />
      </label>

      <button type="submit">送信</button>
    </form>
  );
};

export default Form;
```

---

## 実装ポイント

### 1. 名前と年齢

テキストと数値入力は`value`から取得します。

```ts id="78etwo"
name.current?.value
age.current?.value
```

ただし、HTMLの`input`から取得した値は基本的に**文字列**です。

そのため、年齢を数値として扱う場合は、

```ts id="fpp1fg"
Number(age.current?.value || 0)
```

と変換できます。

---

### 2. ラジオボタン

ラジオボタンでは`checked`を使用します。

```ts id="h4br9y"
male.current?.checked
female.current?.checked
```

例えば男性が選択されている場合、

```text id="bh3ys7"
male.current?.checked
↓
true
```

になります。

---

### 3. 性別を1つの値にまとめる

```ts id="p8x7c2"
gender: male.current?.checked
  ? "男性"
  : female.current?.checked
    ? "女性"
    : "",
```

結果として、

```text id="6cgf1t"
男性 → "男性"
女性 → "女性"
未選択 → ""
```

となります。

---

### 4. チェックボックス

チェックボックスも`checked`で状態を取得します。

```ts id="jv8m9a"
newsSubscribe.current?.checked
```

結果は、

```text id="0qpmr6"
チェックあり  → true
チェックなし  → false
```

です。

---

## データの取得方法

今回のフォームでは、入力要素によって取得方法が異なります。

| フォーム     | 取得方法                   |
| -------- | ---------------------- |
| text     | `ref.current?.value`   |
| number   | `ref.current?.value`   |
| radio    | `ref.current?.checked` |
| checkbox | `ref.current?.checked` |

つまり、

```text id="b3xx1p"
文字を取得
↓
value

選択状態を取得
↓
checked
```

と覚えることができます。

---

## 出力例

例えば、

```text id="jyr0ad"
名前: 山田太郎
年齢: 25
性別: 男性
ニュース購読: ON
```

と入力すると、

```ts id="j2f7st"
{
  name: "山田太郎",
  age: "25",
  gender: "男性",
  subscribe: true
}
```

が`console.log`に出力されます。

---

## Uncontrolled Component

この課題では`useState`を使用していません。

```ts id="v4df5f"
const name = useRef<HTMLInputElement>(null);
```

のように`useRef`を使い、DOMから直接値を取得しています。

### Controlled Component

```text id="3n1pwy"
入力
 ↓
onChange
 ↓
setState
 ↓
React State更新
 ↓
再レンダリング
```

### Uncontrolled Component

今回はこちらです。

```text id="xjkj3y"
入力
 ↓
DOMが値を保持
 ↓
送信
 ↓
useRefから値を取得
```

フォーム入力のたびに`useState`を更新しないため、入力値の変更によるReactのState更新・再レンダリングを発生させずに処理できます。

---

## 起動方法

依存関係をインストールします。

```bash id="qj6d9p"
npm install
```

開発サーバーを起動します。

```bash id="2c5m5z"
npm run dev
```

ブラウザで表示されたURLにアクセスし、フォームに入力して送信します。

ブラウザの開発者ツールのConsoleから、取得したオブジェクトを確認できます。
