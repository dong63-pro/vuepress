---
title: canvas
createTime: 2025/02/28 14:27:35
permalink: /demo/ara0b9wn/
---
### **1. 获取图像数据getImageData**
  **参数：** 矩形区域左上角的 x、y 坐标，width矩形区域的宽度，height矩形区域的高度

  **返回：**
  - width: 图像数据矩形区域的宽度，以像素为单位
  - height: 图像数据矩形区域的高度，以像素为单位
  - data: 一个 Uint8ClampedArray 类型的一维数组，包含了每个像素的 RGBA 值，数组的长度为 width * height * 4
```js 
const image = ctx.getImageData(x, y, width, height)
```

### **2. 创建图像createImageData**

```js
const imageData = ctx.createImageData(width, height)
console.log(imageData) // {width: string, height: string , data: Uint8ClampedArray}
const Uint8ClampedArray = []
imageData.data.set(Uint8ClampedArray)
```


### **3. 像素数据绘制到画布 putImageData** 
- 基本形式参数：
  - imageData：必需，一个 ImageData 对象，包含要绘制的像素数据。
  - dx：必需，imageData 对象在画布上放置位置的左上角的 X 坐标。
  - dy：必需，imageData 对象在画布上放置位置的左上角的 Y 坐标。
- 高级形式额外参数：
  - dirtyX：可选，imageData 对象中需要绘制的矩形区域左上角的 X 坐标，默认值为 0。
  - dirtyY：可选，imageData 对象中需要绘制的矩形区域左上角的 Y 坐标，默认值为 0。
  - dirtyWidth：可选，imageData 对象中需要绘制的矩形区域的宽度，默认值为 imageData.width。
  - dirtyHeight：可选，imageData 对象中需要绘制的矩形区域的高度，默认值为 imageData.height

```js 
// 基本形式：将 ImageData 对象绘制到画布的指定位置
ctx.putImageData(imageData, dx, dy);
// 高级形式：可以指定从 ImageData 对象中提取的矩形区域，并将其绘制到画布的指定位置
ctx.putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
```

### **4. ImageData转base64格式**
功能是将包含 RGBA 像素数据的对象转换为一个 DataURL 格式的字符串。具体步骤如下：
1. 从传入的 RGBAImg 对象中提取图像的宽度和高度。
2. 创建一个新的 canvas 元素，并设置其宽度和高度。
3. 获取 canvas 的 2D 绘图上下文。
4. 如果上下文获取失败，返回空字符串。
5. 创建一个新的 ImageData 对象，并将 RGBAImg 中的像素数据设置到该对象中。
6. 将 ImageData 对象绘制到 canvas 上。
7. 使用 canvas.toDataURL() 方法将 canvas 内容转换为 DataURL 字符串并返回

```ts 
// 定义 RGBAImg 类型
interface RGBAImage {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

// 定义函数并指定参数和返回值类型
export const RGBA2ImageData = (RGBAImg: RGBAImage): string => {
  try {
    // 从 RGBAImg 中提取宽度和高度
    const { width, height } = RGBAImg;
    // 创建一个新的 canvas 元素
    const canvas = document.createElement('canvas');
    // 设置 canvas 的宽度和高度
    canvas.width = width;
    canvas.height = height;
    // 获取 canvas 的 2D 绘图上下文
    const ctx = canvas.getContext('2d');
    // 如果上下文获取失败，抛出错误
    if (!ctx) {
      throw new Error('Failed to get 2D context for the canvas.');
    }
    // 创建一个新的 ImageData 对象
    const imgData = ctx.createImageData(width, height);
    // 将 RGBAImg 中的像素数据设置到 ImageData 对象中
    imgData.data.set(RGBAImg.data);
    // 将 ImageData 对象绘制到 canvas 上
    ctx.putImageData(imgData, 0, 0);
    // 将 canvas 内容转换为 DataURL 字符串并返回
    return canvas.toDataURL();
  } catch (error) {
    // 打印错误信息
    console.error('Error converting RGBA data to ImageData:', error);
    // 返回空字符串
    return '';
  }
};
```

### **5. 画布绘制图片 drawImage**
```js
// 创建一个新的 Image 对象，并将其 src 属性设置为 screenImageUrl。
const image = new Promise((resolve, reject) => {
    const img = new Image()
    img.src = screenImageUrl
    if (img.complete) {
      resolve(img) 
    } else {
      img.onload = () => { resolve(img) }
      img.onerror = () => { reject(new Error('Failed to load image')) }   
    }
})


// 形式一：简单绘制，将图像绘制到画布指定位置
ctx.drawImage(image, dx, dy);

// 形式二：可调整绘制图像的大小，将图像绘制到画布指定位置并设置绘制后的宽度和高度
ctx.drawImage(image, dx, dy, dWidth, dHeight);

// 形式三：可裁剪图像并调整大小，从源图像中裁剪出指定区域，然后绘制到画布指定位置并设置绘制后的大小
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```