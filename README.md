# Thumbnail Generator with React

<image src="./images/image1.png" />

## 프로젝트 목적

많은 블로그에서 썸네일 기능을 지원하고 해당 기능을 사용하는 사용자도 많습니다. 그런데 썸네일을 위한 간단한 이미지 파일을 만드려는 목적에 비해 필요한 툴들이 거추장스럽다고 느껴 이 프로젝트를 시작하게 되었습니다.

## 구현된 기능

- 텍스트 추가
- 배경 색상 변경

## 구현될 기능

- 폰트 크기 변경
- 폰트 스타일 변경
- 폰트 위치 변경
- 배경 이미지 변경
- 이미지 비율 변경

## 프로젝트에서 해결한 문제

### 1. 생성한 이미지 다운로드

처음엔 입력을 받아 단순히 div tag에 텍스트와 이미지를 담으려 했으나 dataURL을 생성할 수 없어 dataURL을 생성할 수 있는 canvas API를 이용해 이미지 파일을 생성해보았습니다.

```javascript
const canvas = document.querySelector("canvas");
const url = canvas.toDataURL();
```

### 2. canvas에서의 텍스트 정렬

canvas에서 텍스트를 추가할때 context의 fillText를 이용하는데요. fillText의 인자로 입력할 text, x, y를 전달하게 됩니다. 전달된 x, y를 문자열의 어디에 위치시킬지 정하는 것이 x에 대해서는 textAlign, y에 대해서는 textBaseline 입니다.

- textAlign

  <image src="./images/textAlign.png" width="300" height="200"/>

- textBaseline

  <image src="./images/textBaseline.png" width="300" height="200" />

```javascript
const canvas =  document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.textAlign = 'center';
ctx.textBaseline= 'middle';
ctx.fillStyle = 'black';
ctx.fillText(<text>, <x>, <y>);
```
