/**
 * [김찬희] : 실시간 그림 그리기 기능을 구현한 WebSocket과 fabric.js 관련 코드 작성
 */

document.addEventListener('DOMContentLoaded', function() {
    let canvas;
    const socket = new WebSocket('ws://nggg.com:8080/canvas');

    // 캔버스 초기화
    canvasInit();

    // 서버로부터 메시지를 수신하면 해당 데이터를 사용하여 그림을 그립니다.
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log('socket data = ', data.color);
        if (data.type === 'path') {
            console.log('socket path = ', data.type);
            const path = new fabric.Path(data.path, {
                stroke: data.color,
                strokeWidth: data.width,
                fill: null,
                selectable: false,
                evented: false
            });
            canvas.add(path);
        }
    };

    // 사용자가 그림을 그릴 때 발생하는 이벤트
    canvas.on('path:created', function(event) {
        console.log('path:created');
        const path = event.path;
        const pathData = path.toObject(['path']);
        const message = {
            type: 'path',
            path: pathData.path,
            color: path.stroke,
            width: path.strokeWidth,
        };
        console.log('전송 전');
        socket.send(JSON.stringify(message));  // 그림 데이터를 WebSocket을 통해 전송
        console.log('send 후');
    });

    function canvasInit() {
        canvas = new fabric.Canvas("canvas", {
            width: 550,
            height: 550,
            isDrawingMode: true,
            backgroundColor: "white",
        });

        // 기본 그리기 브러시 너비와 색상을 검정으로 설정
        canvas.freeDrawingBrush.width = 5;
        canvas.freeDrawingBrush.color = "black";

        // 색상 선택기 이벤트 리스너
        document.getElementById('color-picker').addEventListener('input', (e) => {
            canvas.freeDrawingBrush.color = e.target.value;
        });

        // 브러시 버튼 클릭 이벤트 리스너
        document.getElementById("brush").addEventListener("click", () => {
            canvas.freeDrawingBrush.width = parseInt(document.getElementById('brush-size').value, 10);
            canvas.freeDrawingBrush.color = document.getElementById('color-picker').value;
            canvas.isDrawingMode = true;  // 그리기 모드 활성화
        });

        // 지우개 버튼 클릭 이벤트 리스너
        document.getElementById("erase").addEventListener("click", () => {
            canvas.freeDrawingBrush.width = parseInt(document.getElementById('brush-size').value, 10);
            canvas.freeDrawingBrush.color = canvas.backgroundColor;  // 캔버스 배경색으로 설정
            canvas.isDrawingMode = true;  // 그리기 모드 활성화
        });

        // 브러시 크기 조절 이벤트 리스너
        document.getElementById('brush-size').addEventListener('input', (e) => {
            canvas.freeDrawingBrush.width = parseInt(e.target.value, 10);
        });
    }
});
