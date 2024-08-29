<template>
  <div id="app">
    <!-- 초기 방에 들어갔을 때 표시되는 부분 -->
    <div v-if="showReadyComponent" class="readyGameComponent">
      캔버스 & 팔레트
      <button @click="showReadyRender = true">레디</button>
      <div v-if="showReadyRender" class="readyRender">
        <div class="selectContainer">
          <select class="theme">
            <!-- 여기서 v-if로 테마 불러와야됨 -->
            <option value="option1">과일</option>
            <option value="option2">사람</option>
          </select>
        </div>
        <div class="readyContainer">
          <button class="readyButton" @click="startGame">READY</button>
        </div>
      </div>
    </div>

    <!-- 게임 시작 후 표시되는 캔버스 부분 -->
    <div v-else id="content-body">
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
  </div>
</template>

<script>
import * as fabric from "fabric";

export default {
  data() {
    return {
      showReadyComponent: true, // 레디 컴포넌트 표시 여부
      showReadyRender: false, // 레디 버튼 클릭 후 표시되는 화면
      canvas: null,
      brushColor: "#000000",
      brushSize: 5,
      socket: null,
    };
  },
  methods: {
    startGame() {
      this.showReadyComponent = false; // 게임 시작 시 레디 컴포넌트 숨기기
      this.$nextTick(() => {
        this.canvasInit(); // 캔버스 초기화
        this.setupWebSocket(); // WebSocket 설정
      });
    },
    canvasInit() {
      this.canvas = new fabric.Canvas("canvas", {
        width: 550,
        height: 550,
        isDrawingMode: true,
        backgroundColor: "white",
      });

      // 수동으로 freeDrawingBrush 초기화
      if (!this.canvas.freeDrawingBrush) {
        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
      }

      // 브러시 설정
      this.canvas.freeDrawingBrush.width = this.brushSize;
      this.canvas.freeDrawingBrush.color = this.brushColor;

      this.canvas.on("path:created", (event) => {
        const path = event.path;
        const pathData = path.toObject(["path"]);
        const message = {
          type: "path",
          path: pathData.path,
          color: path.stroke,
          width: path.strokeWidth,
        };
        if (this.socket) {
          this.socket.send(JSON.stringify(message));
        }
      });
    },
    setupWebSocket() {
      this.socket = new WebSocket("ws://nggg.com:8080/canvas");

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
    setBrush() {
      if (this.canvas && this.canvas.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.width = this.brushSize;
        this.canvas.freeDrawingBrush.color = this.brushColor;
        this.canvas.isDrawingMode = true;
      }
    },
    setEraser() {
      if (this.canvas && this.canvas.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.width = this.brushSize;
        this.canvas.freeDrawingBrush.color = this.canvas.backgroundColor;
        this.canvas.isDrawingMode = true;
      }
    },
    selectElement() {
      if (this.canvas) {
        this.canvas.isDrawingMode = false;
      }
    },
    deleteCanvasElement() {
      if (this.canvas) {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
          this.canvas.remove(activeObject);
        }
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

.readyGameComponent {
  height: 500px;
  width: 700px;
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.readyRender {
  display: flex;
  height: 500px;
  width: 700px;
  border: 1px solid black;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgb(114, 70, 40);
  opacity: 40%;
}

.readyButton {
  height: 100px;
  width: 200px;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
