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
            canvas: document.querySelector('.video_canvas_0'),
            context: document.querySelector('.video_canvas_0').getContext('2d'),
            videoImages: [],
         },
         values: {
            // Video
            videoImageCount: 300,
            imageSequence: [0, 299],
            canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
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
            canvas: document.querySelector('.video_canvas_1'),
            context: document.querySelector('.video_canvas_1').getContext('2d'),
            videoImages: [],
         },
         values: {
            // Video
            videoImageCount: 960,
            imageSequence: [0, 959],
            canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
            canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
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
            canvas: document.querySelector('.image_blend_canvas'),
            context: document.querySelector('.image_blend_canvas').getContext('2d'),
            imagesPath: ['./images/blend-image-1.jpg', './images/blend-image-2.jpg'],
            images: [],
         },
         values: {
            // 1번째 이미지 애니메이션
            rect1X: [0, 0, { start: 0, end: 0 }],
            rect2X: [0, 0, { start: 0, end: 0 }],
            rectStartY: 0,
            // 2번째 이미지 애니메이션
            blendHeight: [0, 0, { start: 0, end: 0 }],
            // 3번째 이미지 애니메이션
            canvas_scales: [0, 0, { start: 0, end: 0 }],
            // 4번째 텍스트 애니메이션
            canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
            canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
         },
      },
   ];

   const checkMenu = () => {
      if (yOffset > 44) {
         document.body.classList.add('sticky_header');
      }
   };

   const setCanvasImage = () => {
      let imgElem;
      for (var i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
         imgElem = new Image();
         imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
         sceneInfo[0].objs.videoImages.push(imgElem);
      }
      let imgElem2;
      for (var i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
         imgElem2 = new Image();
         imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
         sceneInfo[2].objs.videoImages.push(imgElem2);
      }
      let imgElem3;
      for (var i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
         imgElem3 = new Image();
         imgElem3.src = sceneInfo[3].objs.imagesPath[i];
         sceneInfo[3].objs.images.push(imgElem3);
      }
   };

   const setLayout = () => {
      // 각 스크롤 섹션의 높이 세팅
      for (let i = 0; i < sceneInfo.length; i++) {
         if (sceneInfo[i].type === 'sticky') {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
         } else if (sceneInfo[i].type === 'normal') {
            // 컨텐츠 만큼 높이 값
            sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
         }
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

      const heightRatio = window.innerHeight / 1080;
      sceneInfo[0].objs.canvas.style.transform = `translate3D(-50%,-50%,0) scale(${heightRatio})`;
      sceneInfo[2].objs.canvas.style.transform = `translate3D(-50%,-50%,0) scale(${heightRatio})`;
   };

   let yOffset = 0; // window.pageYOffset 대신 쓸 변수
   let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
   let currentScene = 0; // 현제 활성화된 씬
   let enterNewScene = false; // 씬이 변경될때 스위치
   // 비디오 감속
   let acc = 0.1;
   let delayedYOffset = 0;
   let rafId;
   let rafState;
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
            // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
            // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
            objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

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
            break;
         case 2:
            // let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
            // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
            if (scrollRatio <= 0.5) {
               // in
               objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
            } else {
               // out
               objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
            }
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
            // section_4에서 캔버스 미리 그려주기위한 작업
            if (scrollRatio > 0.9) {
               const objs = sceneInfo[3].objs;
               const values = sceneInfo[3].values;
               // 가로/세로 모두 꽉차게 하기위해 여기서  세팅(계산 필요)
               const widthRatio = document.body.offsetWidth / objs.canvas.width;
               const heightRatio = window.innerHeight / objs.canvas.height;
               let canvasScaleRatio;

               if (widthRatio <= heightRatio) {
                  // 캔버스보다 브라우저 창이 홀쭉한 경우
                  canvasScaleRatio = heightRatio;
               } else {
                  canvasScaleRatio = widthRatio;
                  // 캔버스보다 브라우저 창이 납작한 경우
               }
               objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
               objs.context.fillStyle = '#fff';
               objs.context.drawImage(objs.images[0], 0, 0);

               // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
               const recalculateInnerWidth = window.innerWidth / canvasScaleRatio;
               const recalculateInnerHeight = window.innerHeight / canvasScaleRatio;

               // 가려줄 박스 값 세팅해주기
               const whiteRectWidth = recalculateInnerWidth * 0.15;

               values.rect1X[0] = (objs.canvas.width - recalculateInnerWidth) / 2;
               values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
               values.rect2X[0] = values.rect1X[0] + recalculateInnerWidth - whiteRectWidth;
               values.rect2X[1] = values.rect2X[0] + whiteRectWidth;
               // 가려줄 박스 값 그려주기
               objs.context.fillRect(parseInt(values.rect1X[0]), 0, parseInt(whiteRectWidth), recalculateInnerHeight);
               objs.context.fillRect(parseInt(values.rect2X[0]), 0, parseInt(whiteRectWidth), recalculateInnerHeight);
            }
            break;
         case 3:
            let step = 0;
            // 가로/세로 모두 꽉차게 하기위해 여기서  세팅(계산 필요)
            const widthRatio = document.body.offsetWidth / objs.canvas.width;
            const heightRatio = window.innerHeight / objs.canvas.height;
            let canvasScaleRatio;
            if (widthRatio <= heightRatio) {
               // 캔버스보다 브라우저 창이 홀쭉한 경우
               canvasScaleRatio = heightRatio;
            } else {
               canvasScaleRatio = widthRatio;
               // 캔버스보다 브라우저 창이 납작한 경우
            }
            objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
            objs.context.fillStyle = '#fff';
            objs.context.drawImage(objs.images[0], 0, 0);
            // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
            const recalculateInnerWidth = window.innerWidth / canvasScaleRatio;
            const recalculateInnerHeight = window.innerHeight / canvasScaleRatio;
            // 애니메이션 시작시점
            if (!values.rectStartY) {
               // 시작지점 섹션과 캔버스사이 간격 + 스케일로 줄어든만큼의 캔버스 간격
               values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
               console.log(window.innerHeight);
               values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;
               values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;
               values.rect1X[2].end = values.rectStartY / scrollHeight;
               values.rect2X[2].end = values.rectStartY / scrollHeight;
            }

            // 가려줄 박스 값 세팅해주기
            const whiteRectWidth = recalculateInnerWidth * 0.15;

            values.rect1X[0] = (objs.canvas.width - recalculateInnerWidth) / 2;
            values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
            values.rect2X[0] = values.rect1X[0] + recalculateInnerWidth - whiteRectWidth;
            values.rect2X[1] = values.rect2X[0] + whiteRectWidth;
            // // 가려줄 박스 값 그려주기
            objs.context.fillRect(calcValues(values.rect1X, currentYOffset), 0, parseInt(whiteRectWidth), recalculateInnerHeight);
            objs.context.fillRect(calcValues(values.rect2X, currentYOffset), 0, parseInt(whiteRectWidth), recalculateInnerHeight);

            // step
            if (scrollRatio < values.rect1X[2].end) {
               // 첫번째 애니메이션 진행중
               step = 1;
               objs.canvas.classList.remove('sticky');
            } else {
               // 첫번째 애니메이션 끝났다
               step = 2;
               // 첫번째 이미지 고정
               objs.canvas.classList.add('sticky');
               // top 위치 위로 맞추기
               objs.canvas.style.top = `-${(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;
               // 블랜드 이미지
               values.blendHeight[0] = 0;
               values.blendHeight[1] = objs.canvas.height;
               // 첫번째 애니메이션 끝나는 지점을 두번째 애니메이션 시작 지점으로 세팅
               values.blendHeight[2].start = values.rect1X[2].end;
               values.blendHeight[2].end = values.rect1X[2].end + 0.2;

               const blendHeight = calcValues(values.blendHeight, currentYOffset);

               // 블랜드 이미지 그리기
               objs.context.drawImage(
                  objs.images[1],
                  0,
                  objs.canvas.height - blendHeight,
                  objs.canvas.width,
                  blendHeight,
                  0,
                  objs.canvas.height - blendHeight,
                  objs.canvas.width,
                  blendHeight
               );
               // 두번째 애니메이션 끝났냐
               if (scrollRatio > values.blendHeight[2].end) {
                  values.canvas_scales[0] = canvasScaleRatio;
                  // 브라우저 가로 / 1920 비율
                  values.canvas_scales[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                  // 두번째 애니메이션 끝나는 시점이 세번째 애니메이션 시작하는 시점
                  values.canvas_scales[2].start = values.blendHeight[2].end;
                  values.canvas_scales[2].end = values.canvas_scales[2].start + 0.2;
                  objs.canvas.style.transform = `scale(${calcValues(values.canvas_scales, currentYOffset)})`;
               }

               if (values.canvas_scales[2].end > 0 && scrollRatio > values.canvas_scales[2].end) {
                  // 두번째 세번째는 0.2+0.2 한 0.4만큼 스크롤을 픽스 상태로 움직였으니 마진탑으로 채워준다
                  objs.canvas.classList.remove('sticky');
                  objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

                  // 세번째 애니메이션 끝나는 시점이 네번째 애니메이션 시작하는 시점
                  values.canvasCaption_opacity[2].start = values.canvas_scales[2].end;
                  values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
                  values.canvasCaption_translateY[2].start = values.canvas_scales[2].end;
                  values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].start + 0.1;
                  objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
                  objs.canvasCaption.style.transform = `translate3D(0,${calcValues(values.canvasCaption_translateY, currentYOffset)}%,0)`;
               } else {
                  objs.canvas.classList.add('sticky');
                  objs.canvas.style.marginTop = `0`;
                  objs.canvasCaption.style.opacity = `0`;
               }
            }

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
      // yOffset이 아닌 delayedYOffset로 하는 이유는 감속이 되는 비디오 때문이다 비디오가 아니면 yOffset 가능
      if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
         enterNewScene = true;
         //  넘어갔으면 현재 씬 값을 ++ 해라
         currentScene++;
      }
      //   현재 스크롤이 만약 2번이면 1번까지의 높이보다 작냐
      if (delayedYOffset < prevScrollHeight) {
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

   function loop() {
      // 비디오 감속
      delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

      if (!enterNewScene) {
         if (currentScene === 0 || currentScene === 2) {
            const currentYOffset = delayedYOffset - prevScrollHeight;
            const values = sceneInfo[currentScene].values;
            const objs = sceneInfo[currentScene].objs;
            console.log('loop');
            let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
            if (objs.videoImages[sequence]) {
               objs.context.drawImage(objs.videoImages[sequence], 0, 0);
            }
         }
      }

      rafId = requestAnimationFrame(loop);

      if (Math.abs(yOffset - delayedYOffset) < 1) {
         cancelAnimationFrame(rafId);
         rafState = false;
      }
   }

   window.addEventListener('load', () => {
      document.body.classList.remove('before_load');
      setLayout();
      // 새로고침하고 이벤트가 없는 이상 이미지가 안보이는 현상 수정
      if (yOffset > 0) {
         let tempYOffset = yOffset;
         let tempScrollCount = 0;
         let siId = setInterval(() => {
            window.scrollTo(0, tempYOffset);
            tempYOffset += 2;
            tempScrollCount++;
            if (tempScrollCount > 20) {
               clearInterval(siId);
            }
         }, 20); //1000이 1초
      }
      // 첫번째 캔버스 이미지 1개 그려주기
      sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
      // 이벤트들
      window.addEventListener('scroll', () => {
         yOffset = window.pageYOffset;
         scrollLoop();
         checkMenu();
         // 비디오 감속
         if (!rafState) {
            rafId = requestAnimationFrame(loop);
            rafState = true;
         }
      });
      window.addEventListener('resize', () => {
         if (window.innerWidth > 900) {
            window.location.reload();
            sceneInfo[3].values.rectStartY = 0;
            setLayout();
         }
      });
      // 모바일 가로세로전환 떄문
      window.addEventListener('orientationchange', () => {
         window.scrollTo(0, 0);
         setTimeout(setLayout, 500);
      });
      // 로딩 끝난 후 없애기
      document.querySelector('.loading').addEventListener('transitionend', (e) => {
         document.body.removeChild(e.currentTarget);
      });
   });

   setCanvasImage();
});
