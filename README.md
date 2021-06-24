# : Highlighter (1인 프로젝트)
>chrom Web Store : https://chrome.google.com/webstore/detail/highlighter/dabclgamcklajjplnkipfibgdcbogcnj?utm_source=chrome-ntp-icon

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/54474732/123283267-33e4ed00-d546-11eb-8104-a46cbdf509a6.gif)

## : 소개
핵심단어를 드래그 함으로써 가독성을 높이다.  
이미 읽었던 포스팅을 다시 읽을 때,   
필요한 부분만 다시 읽을 수 있도록,  
드래그함으로써 텍스트에 하이라이팅효과를 부여한다.  

## : 단축키 
shift + V ->  On/Off,  
shift + X -> 모두 지우기,  
shift + Z -> 행동취소(이전 상태로 되돌리기)  

## : 설계
contentScript.js ..  
<img width="475" alt="스크린샷 2021-06-24 오후 11 53 06" src="https://user-images.githubusercontent.com/54474732/123284695-6cd19180-d547-11eb-95b2-9dcad2f27a02.png">  
onmouseup 이벤트로 함수실행시  
드래그가 시작된 지점과(startContainer) 끝나는지점이(endContainer)  
하나의 노드 안에 있다면 해당 노드를 mark로 감싼다.  


<img width="649" alt="스크린샷 2021-06-24 오후 11 53 19" src="https://user-images.githubusercontent.com/54474732/123284698-6e02be80-d547-11eb-934c-946e78d3fa16.png">    
하지만 만약 다수의 노드가 존재한다면      
시작노드와 끝노드는 각각 startOffset, endOffset를 찾아 해당 부분만 mark로 감싸고,     
그 외의 노드들은 반복문을 통해 모두 mark태그로 감싸는 형식으로 설계.  

하지만 복잡한 자식노드들을 가지고있는 노드는 대응이 어려워  
@ 단어에 특화,  
@ 문장과 문단의 하이라이팅은 기대하기 힘듬.  
