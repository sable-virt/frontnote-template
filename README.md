# frontnote-template

StyleGuideジェネレーターFrontNoteのデフォルトテンプレート

[FrontNote](https://www.npmjs.org/package/frontnote)

## 使い方

実際の使い方はrelease/index.htmlのソースをご覧ください。

## 取得可能な値

### title

Type: `String`

オプションで指定されたスタイルガイドのタイトル文字列

### overview

Type: `Boolean`

overviewページかどうか。  
overviewページではcurrentにマークダウンを読み込んでHTML化したデータが格納されます。

### current

Type: `Object`

現在のファイルオブジェクト

### files

Type: `Array`

全てのファイルオブジェクトが格納されている配列データ

### css

Type: `String`

オプション:cssで指定したパスが入ったlinkタグ

### script

Type: `String`

オプション:scriptで指定したパスが入ったscriptタグ

### helpers

Type: `Object`

ヘルパー関数オブジェクト

#### isCurrent(current,file)

Param: `current` currentファイルオブジェクト  
Param: `file` ファイルオブジェクト  
Return `Boolean`

currentとfileに渡したファイルオブジェクトが一致したらtrueを返却

#### hasAttribute(attributes,attr)

Param: `attributes` 属性値が入った配列
Param: `attr` 調べる属性
Return `Boolean`

attributesにattrが含まれているかどうかを返却

## ファイルオブジェクト

### file.file

読み込んだファイルのパス

### file.url

生成されるスタイルガイドのファイルパス

### file.dirs

読み込んだファイルのパスをディレクトリごとに区切った配列

### file.ext

読み込んだファイルの拡張子

### sections

読み込んだファイルのコメントセクションが格納された配列

### overview

読み込んだファイルのoverviewオブジェクト

* title - overviewタイトル
* comment - overviewコメント

## コメントセクション

### section.title

セクションタイトル

### section.comment

セクションコメント

### section.attributes

セクションに設定された属性値が入った配列
以下の属性値だとラベルの色が変わります

* deprecated または 非推奨
* todo

### section.code

セクションコード

### colors

カラー情報が格納された配列

#### colors[i].name

カラー名

#### colors[i].color

カラーコード

#### colors[i].value

カラー名とカラーコード