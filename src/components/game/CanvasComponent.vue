<template>
  <div id="content-body">
    <div id="button-container">
      <input type="color" v-model="brushColor" />
      <label for="brush-size">브러시 크기:</label>
      <input
        id="brush-size"
        type="range"
        v-model="brushSize"
        min="1"
        max="50"
      />
      <button @click="setEraser">지우개</button>
      <button @click="setBrush">브러시</button>
      <button @click="selectElement">선택</button>
      <button @click="deleteCanvasElement">선택 요소 삭제</button>
    </div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  data() {
    return {
      canvas: null,
      brushColor: "#000000",
      brushSize: 5,
      socket: null,
    };
  },
  mounted() {
    this.socket = new WebSocket("ws://nggg.com:8080/canvas");
    this.canvasInit();

    // 서버로부터 메시지를 수신하면 해당 데이터를 사용하여 그림을 그립니다.
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "path") {
        const path = new fabric.Path(data.path, {
          stroke: data.color,
          strokeWidth: data.width,
          fill: null,
          selectable: false,
          evented: false,
        });
        this.canvas.add(path);
      }
    };
  },
  watch: {
    brushColor(newColor) {
      if (this.canvas && this.canvas.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.color = newColor;
      }
    },
    brushSize(newSize) {
      if (this.canvas && this.canvas.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.width = parseInt(newSize, 10);
      }
    },
  },
  methods: {
    canvasInit() {
      this.canvas = new fabric.Canvas("canvas", {
        width: 550,
        height: 550,
        isDrawingMode: true,
        backgroundColor: "white",
      });

      // 캔버스 초기화 후 브러시 설정을 보장하기 위해 비동기 처리
      this.$nextTick(() => {
        // 기본 그리기 브러시 설정
        if (this.canvas && this.canvas.freeDrawingBrush) {
          this.canvas.freeDrawingBrush.width = this.brushSize;
          this.canvas.freeDrawingBrush.color = this.brushColor;
        }
      });

      // 사용자가 그림을 그릴 때 발생하는 이벤트
      this.canvas.on("path:created", (event) => {
        const path = event.path;
        const pathData = path.toObject(["path"]);
        const message = {
          type: "path",
          path: pathData.path,
          color: path.stroke,
          width: path.strokeWidth,
        };
        this.socket.send(JSON.stringify(message)); // 그림 데이터를 WebSocket을 통해 전송
      });
    },
    setBrush() {
      this.canvas.isDrawingMode = true;
      if (this.canvas.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.width = this.brushSize;
        this.canvas.freeDrawingBrush.color = this.brushColor;
      }
    },
    setEraser() {
      this.canvas.isDrawingMode = true; // 그리기 모드 활성화
      if (this.canvas.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.width = this.brushSize;
        this.canvas.freeDrawingBrush.color = this.canvas.backgroundColor; // 캔버스 배경색으로 설정
      }
    },
    selectElement() {
      this.canvas.isDrawingMode = false; // 선택 모드로 전환
    },
    deleteCanvasElement() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        this.canvas.remove(activeObject);
      }
    },
  },
};
</script>


<style scoped>
#content-body {
  display: flex;
  width: 100%;
}

#button-container {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#canvas {
  width: 75%;
  border: 2px dashed black;
}
</style>
