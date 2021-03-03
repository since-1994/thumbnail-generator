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

### 3. image 입력 받아와 canvas의 배경으로 표시하기

<image src="./images/uploadImage.png" />
canvas위에 image를 그리기 위해서 `ctx.drawImage()`를 사용했는데요. drawImage에 전달할 인자로 그리고자 하는 image를 src로 갖고 있는 image element가 필요합니다. image element를 생성해주는 방법도 좋지만 탬플릿에 `display: none`인 image element를 미리 넣어놓고 이용했습니다.

```javascript
const Pallette = ({ colors, onChangeText, onSelectColor }) => {
  const imageRef = useRef();

  const updateImage = (e) => {
    imageRef.current.src = URL.createObjectURL(imageRef.current.files[0]);
    ctx.drawImage(imageRef.current, 0, 0);
  };

  return (
    <section>
      <input ref={imageRef} type="file" onChange={updateImage} />
    </section>
  );
};
```

그런데 위처럼 하면 canvas에 이미지가 표시되지 않습니다. image가 로드가 채 되기 전에 받아오기 때문인데요. 이 문제를 해결하기 위해 image element에 `load` eventListener를 달아주어 해결했습니다.

```javascript
const Pallette = ({ colors, onChangeText, onSelectColor }) => {
  const imageRef = useRef();

  const updateImage = (e) => {
    imageRef.current.src = URL.createObjectURL(imageRef.current.files[0]);
  };

  const drawImage = () => {
    ctx.drawImage(imageRef.current, 0, 0);
  };

  return (
    <section>
      <input
        ref={imageRef}
        type="file"
        onChange={updateImage}
        onLoad={drawImage}
      />
    </section>
  );
};
```

### 4. 16:9의 비율로 업로드한 이미지 잘라주기

업로드한 이미지를 생성할 Thumbnail의 비율에 맞게 잘라주기 위한 기능을 추가하는데 자르는 기준이 되는 박스가 아래와 같이 이미지를 벗어나면 결과가 잘리는 문제가 발생하였습니다.

## <image src="./images/image2.png" width="80%"/>

이 문제를 해결하기 위한 방법으로 기준이 되는 박스를 아래와 같이 아예 이미지 밖을 나가지 못하도록 수정해보았습니다.

```javascript
if (left < 0) {
  left = 0;
}
if (top < 0) {
  top = 0;
}
if (top + h > canvasRef.current.height) {
  top = canvasRef.current.height - h;
}
if (left + w > canvasRef.current.width) {
  left = canvasRef.current.width - w;
}
```
