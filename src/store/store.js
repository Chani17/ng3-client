import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/*<localStorage에 대해서....>*/
/*1. localStorage는 HTML5에서 제공하는 웹 스토리지 API 중 하나로, 브라우저에 데이터를 영구적으로 저장할 수 있게 해준다*/
/*2. localStorage에 저장된 데이터는 브라우저를 닫거나 컴퓨터를 재부팅하더라도 유지된다.*/
/*3. localStorage는 도메인별로 분리되어 있어, 한 도메인에서 저장된 데이터는 다른 도메인에서 접근할 수 없다.*/
/*4. 5MB 정도밖에 저장 못한다*/
/*5. key: value 형태로 데이터를 저장한다.*/
/*6. 특이하게 localStorage는 index를 내부적으로 가지고 있는데 localStorage에서 값이 변경되면(추가, 삭제) 인덱스를 재할당한다.  
  예를들어, 0번 인덱스 : {key1, value}, 1번 인덱스 : {key2, value}, 2번 인덱스 : {key3, value} 이렇게 데이터가 있는데 
  1번 index의 {key2:value}가 삭제되면 자동으로
  0번 인덱스 : {key1, value}, 1번 인덱스 : {key3, value}가 된다!
*/
/*7. 문제는 얘네가 index를 지 마음대로 할당하기도 해서 원하는 순서대로 방 정보가 불러와지지 않을 수도 있다. 신경쓰지 말것!! */

export const store = new Vuex.Store({
  //다른 곳에서 써야하는 것들이라 export를 사용함
  state: {
    //1. state 는 data()와 같은것
    rooms: [], //db 그러니까 localStorage에 있는 room들을 담을 배열
  },
  getters: {
    //2. getters는 computed와 같은것
    getRooms(state) {
      return state.rooms; //사실 state의 room을 그대로 가져오는거라 없어도 상관없지만, 다른곳에서 rooms에 직접 접근해서 뭔가를 하는것보다 getter을 통해 안전하게 사용하기위해 선언해 보았다.
    },
  },
  mutations: {
    //3. mutations는 method과 같은것. 주로 state에 있는 값에 변화를 주기 위해 사용한다.
    setRooms(state, arr) {
      //매개변수로 들어온 arr배열을 받아서 state의 rooms 변수의 값을 바꾼다.
      state.rooms = arr;
    },
  },
  actions: {
    //4. 비동기 처리 로직을 선언하는 메서드. 비동기 작업은 여러 mutaion을 연계하여 수행할때 사용!
    fetchRooms({ commit }) {
      //mutations를 호출하기 위한 Vuex의 규칙. {commit}은 mutations, {dispatch}는 actions를 의미
      //localstorage(DB로 사용)에 있는 각 room(db에 있을 게임방에 대한 데이터)들을 불러와서 setRooms를 통해 rooms변수에 값을 할당
      const arr = []; //room들을 담을 배열
      if (localStorage.length > 0) {
        //localStorage에 room이 1개 이상 존재한다면
        for (let i = 0; i < localStorage.length; i++) {
          //localStorage의 room 개수만큼 반복
          if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
            //원래 웹팩을 사용하면 자동으로 localStorage에 'loglevel:webpack-dev-server'를 key로하는 데이터가 하나 생성되는데 요즘 버전에서는 그러지 않는 것으로 알고 있음. 하지만 혹시 몰라서 선언했다.
            arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            //JSON.parse : JSON 형식의 문자열을 받아, 해당 문자열을 자바스크립트의 객체(혹은 배열)로 변환
            //localStorage.getItem(키값) : key값을 통해 value값을 가져온다.
          }
        }
      }
      commit('setRooms', arr); //mutations에 있는 setRomms를 호출하는데 매개변수로 arr을 넘긴다.
    },
    /* localStorage에서 값을 가져오는건 동기적으로 처리된다. 때문에 원래는 mutation에 넣어도 상관없지만 굳이 action에 넣은 이유는 실제로 우리가 db에서 값을 꺼내올때는 비동기로 처리되기때문이다.*/
    /*만약 localStorage가 아닌 db에서 값을 꺼내왔다고 가정했을때의 로직은 아래와 같다.*/
    /* 
    async fetchRooms({ commit }) {
      try {
        // 예시: fetch API를 사용하여 서버에서 데이터를 가져옴
        const response = await fetch('https://api.example.com/rooms');
        const rooms = await response.json(); // JSON을 객체나 배열로 변환

        // 서버에서 받은 데이터를 mutations을 통해 상태에 반영
        commit('setRooms', rooms);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
        // 에러 처리 (예: 에러 상태 업데이트, 사용자에게 알림 등)
      }
    },
    */
  },
});
