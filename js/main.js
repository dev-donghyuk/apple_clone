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
            messageB: document.querySelector('.section_1 .main_message.b'),
            messageC: document.querySelector('.section_1 .main_message.c'),
            messageD: document.querySelector('.section_1 .main_message.d'),
         },
         values: {
            // A
            messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
            messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
            messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
            messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
            // B
            messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
            messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
            messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
            messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
            // C
            messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
            messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
            messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
            messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
            // D
            messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
            messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
            messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
         },
      },
      // 1
      {
         type: 'normal',
         // heightNum: 5, normal에서는 필요없음
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
            messageA: document.querySelector('.section_3 .a'),
            messageB: document.querySelector('.section_3 .b'),
            messageC: document.querySelector('.section_3 .c'),
            lineB: document.querySelector('.section_3 .b .line'),
            lineC: document.querySelector('.section_3 .c .line'),
         },
         values: {
            messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
            messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
            messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
            messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
            messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
            messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
            messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
            messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
            messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
            messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
            messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
            messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
            lineB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
            lineC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }],
         },
      },
      // 3
      {
         type: 'sticky',
         heightNum: 5,
         scrollHeight: 0,
         objs: {
            container: document.querySelector('.section_4'),
            canvasCaption: document.querySelector('.canvas_text'),
         },
      },
   ];

   const setLayout = () => {
      // 각 스크롤 섹션의 높이 세팅
      for (let i = 0; i < sceneInfo.length; i++) {
         if (sceneInfo[i].type === 'sticky') {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
         } else if (sceneInfo[i].type === 'normal') {
            // 컨텐츠 만큼 높이 값
            sceneInfo[i].objs.container.style.height = sceneInfo[i].objs.container.offsetHeight;
         }
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
      // 현재 씬 높이 값
      const scrollHeight = sceneInfo[currentScene].scrollHeight;
      // 현재 활성화된 씬에서의 스크롤 높이 비율 === 현재 씬에서의 스크롤 값 / 현재 씬 높이 값
      // 0 ~ 1
      const scrollRatio = currentYOffset / scrollHeight;

      if (values.length === 3) {
         // start ~ end 사이에 애니메이션 실행
         // 활성화 씬 전체기준 애니메이션 2개 이상일 때
         const partScrollStart = values[2].start * scrollHeight; // start 스크롤 값 px
         const partScrollEnd = values[2].end * scrollHeight; // end 스크롤 값 px
         const partScrollHeight = partScrollEnd - partScrollStart;
         if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
            // start ~ end 구간에서의 현재 스크롤 값 비율
            result = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
         } else if (currentYOffset < partScrollStart) {
            result = values[0];
         } else if (currentYOffset > partScrollEnd) {
            result = values[1];
         }
      } else {
         // 활성화 씬 전체기준 애니메이션 1개일 때
         // 만약 200 ~ 900일 경우  사이값은 700으로해서 비율 구해주고 초기 값 더해줌
         result = scrollRatio * (values[1] - values[0]) + values[0];
      }

      return result;
   };
   const playAnimation = () => {
      const objs = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;
      const currentYOffset = yOffset - prevScrollHeight;
      // 현재 씬 높이 값
      const scrollHeight = sceneInfo[currentScene].scrollHeight;
      // 현재 활성화된 씬에서의 스크롤 높이 비율 === 현재 씬에서의 스크롤 값 / 현재 씬 높이 값
      // 0 ~ 1
      const scrollRatio = currentYOffset / scrollHeight;
      switch (currentScene) {
         case 0:
            if (scrollRatio <= 0.22) {
               // in
               objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
               objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
            } else {
               // out
               objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
               objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.42) {
               // in
               objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
               objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
            } else {
               // out
               objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
               objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.62) {
               // in
               objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
               objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
            } else {
               // out
               objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
               objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.82) {
               // in
               objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
               objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
            } else {
               // out
               objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
               objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
            }
            break;
         case 1:
            // console.log('1 play');
            break;
         case 2:
            if (scrollRatio <= 0.32) {
               // in
               objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
               objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
            } else {
               // out
               objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
               objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.67) {
               // in
               objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
               objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
               objs.lineB.style.transform = `scaleY(${calcValues(values.lineB_scaleY, currentYOffset)})`;
            } else {
               // out
               objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
               objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
               objs.lineB.style.transform = `scaleY(${calcValues(values.lineB_scaleY, currentYOffset)})`;
            }

            if (scrollRatio <= 0.93) {
               // in
               objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
               objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
               objs.lineC.style.transform = `scaleY(${calcValues(values.lineC_scaleY, currentYOffset)})`;
            } else {
               // out
               objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
               objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
               objs.lineC.style.transform = `scaleY(${calcValues(values.lineC_scaleY, currentYOffset)})`;
            }
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
      // currentScene이 증가하거나 감소할때는 -값이 들어갈 수도 있으니 그때는 애니메이션 잠깐 멈춰라
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
