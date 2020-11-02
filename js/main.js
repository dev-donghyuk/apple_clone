$(document).ready(function () {
   // scrollEvent
   const sceneInfo = [
      // 0
      {
         type: 'sticky',
         heightNum: 5,
         scrollHeight: 0,
         objs: {
            container: document.querySelector('.section_1'),
            messageA: document.querySelector('.section_1 .main_message.a'),
            messageB: document.querySelector('.section_1 .main_massage.b'),
            messageC: document.querySelector('.section_1 .main_massage.c'),
            messageD: document.querySelector('.section_1 .main_massage.d'),
         },
         values: {
            messageA_opacity: [0, 1, { start: 0.1, end: 0.5 }],
            messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }],
         },
      },
      // 1
      {
         type: 'normal',
         heightNum: 5,
         scrollHeight: 0,
         objs: {
            container: document.querySelector('.section_2'),
         },
      },
      // 2
      {
         type: 'sticky',
         heightNum: 5,
         scrollHeight: 0,
         objs: {
            container: document.querySelector('.section_3'),
         },
      },
      // 3
      {
         type: 'sticky',
         heightNum: 5,
         scrollHeight: 0,
         objs: {
            container: document.querySelector('.section_4'),
         },
      },
   ];

   const setLayout = () => {
      // 각 스크롤 섹션의 높이 세팅
      for (let i = 0; i < sceneInfo.length; i++) {
         sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
         sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
      }
      // 새로고침 시 전 씬값 세팅
      let totalScrollHeight = 0;
      yOffset = window.pageYOffset;
      for (let i = 0; i < sceneInfo.length; i++) {
         totalScrollHeight += sceneInfo[i].scrollHeight;
         if (totalScrollHeight >= yOffset) {
            currentScene = i;
            break;
         }
      }
      document.body.setAttribute('class', `scroll_section_${currentScene + 1}`);
   };

   let yOffset = 0; // window.pageYOffset 대신 쓸 변수
   let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
   let currentScene = 0; // 현제 활성화된 씬
   let enterNewScene = false; // 씬이 변경될때 스위치
   const calcValues = (values, currentYOffset) => {
      let result;
      let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
      result = scrollRatio * (values[1] - values[0]) + values[0];

      if (values.length === 3) {
         // start ~ end 사이에 애니메이션 실행
      } else {
      }

      return result;
   };
   const playAnimation = () => {
      const objs = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;
      const currentYOffset = yOffset - prevScrollHeight;
      switch (currentScene) {
         case 0:
            let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
            objs.messageA.style.opacity = messageA_opacity_in;
            break;
         case 1:
            // console.log('1 play');
            break;
         case 2:
            // console.log('2 play');
            break;
         case 3:
            // console.log('3 play');
            break;
      }
   };
   const scrollLoop = () => {
      enterNewScene = false;
      prevScrollHeight = 0;
      for (let i = 0; i < currentScene; i++) {
         prevScrollHeight += sceneInfo[i].scrollHeight;
      }
      //   현재 스크롤이 만약 2번이면 2번까지의 높이보다 크냐
      if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
         enterNewScene = true;
         //  넘어갔으면 현재 씬 값을 ++ 해라
         currentScene++;
      }
      //   현재 스크롤이 만약 2번이면 1번까지의 높이보다 작냐
      if (yOffset < prevScrollHeight) {
         enterNewScene = true;
         //  바운스 효과로 인한 값이-1로 갈 수도 있으니
         if (currentScene === 0) {
            return;
         }
         currentScene--;
      }
      //   스크롤 값에 따른 currentScene이 정해졌으면 해당 currentScene의 메세지를 보여라
      document.body.setAttribute('class', `scroll_section_${currentScene + 1}`);
      if (!enterNewScene) {
         playAnimation();
      }
   };
   window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset;
      scrollLoop();
   });
   window.addEventListener('load', setLayout);
   window.addEventListener('resize', setLayout);
});
