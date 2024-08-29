<template>
  <div class="chatRoomContainer">
    <div id="messages" ref="messageBox">
      <div v-for="(message, index) in messages" :key="index" :class="['message', getMessageClass(message)]">
        [{{ message.timestamp }}] {{ message.sender }}: {{ message.message }}
      </div>
    </div>

    <input id="messageInput" v-model="messageInput" type="text" placeholder="Type a message"
      @keyup.enter="sendMessage" />
    <button id="sendButton" @click="sendMessage">Send</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      socket: null,
      messages: [],
      messageInput: '',
      userName: '', // 사용자 이름을 저장할 데이터 필드 추가
    };
  },
  methods: {
    ...mapGetters(['getLoginUserId']),

    connect() {
      this.userName = this.getLoginUserId(); // 함수를 호출하여 userName을 설정

      // WebSocket 객체 생성
      this.socket = new WebSocket(`ws://nggg.com:8080/chat?roomId=${this.roomId}`);

      this.socket.onopen = () => {
        console.log('WebSocket connection opened');

        let joinMessage = {
          sender: 'Manager', // 시스템 메시지로 설정
          message: `${this.userName}님이 입장하셨습니다.`
        };
        this.socket.send(JSON.stringify(joinMessage));
      };

      this.socket.onmessage = (event) => {
        let chat = JSON.parse(event.data);
        this.messages.push(chat);

        // 메시지 박스의 스크롤을 가장 하단으로 이동
        this.$nextTick(() => {
          let messageBox = this.$refs.messageBox;
          messageBox.scrollTop = messageBox.scrollHeight;
        });
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
        // 퇴장 메시지는 서버에서 처리하도록 변경
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    },
    sendMessage() {
      if (this.messageInput && this.socket) {
        let chat = {
          sender: this.userName, // 메시지에 사용자 이름을 포함
          message: this.messageInput
        };

        // 서버로 메시지 전송
        this.socket.send(JSON.stringify(chat));
        this.messageInput = '';
      }
    },
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    },
    getMessageClass(message) {
      if (message.sender === this.userName) {
        return 'you';
      } else if (message.sender === 'Manager') {
        return 'manager';
      } else {
        return 'other';
      }
    }
  },
  mounted() {
    this.connect();
  }
};
</script>

<style scoped>
.chatRoomContainer {
  height: 500px;
  width: 320px;
  border: 1px solid black;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#messages {
    border: 1px solid #ccc;
    padding: 10px;
    height: 88%;
    overflow-y: auto;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 20px;
}

.message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
}

.message.you {
    background-color: #7ed481;
    text-align: right;
    border: 1px solid silver;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.message.manager {
    background-color: rgb(243, 177, 177);
    text-align: center;
    border: 1px solid silver;
    font-style: italic;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.message.other {
    background-color: rgb(243, 179, 243);
    text-align: left;
    border: 1px solid silver;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

#messageInput {
    width: calc(100% - 100px);
    padding: 10px;
    margin-right: 10px;
    margin-left: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

#sendButton {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
}
</style>
