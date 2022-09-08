import { useCallback } from "react";





export const AddShare = (states) => {


    const addShare = useCallback(() => {

        if(window.Kakao) {
            const kakao = window.Kakao;

            if(!kakao.isInitialized()) {
                kakao.init("ae36ac4f82f003aa0e94fd1266270445");
                window.alert('한번 더 눌러주세요!');
            };

            kakao.Share.createDefaultButton({
                container: '#kakaotalk-sharing-btn',
                objectType: 'feed',
                content: {
                  title: states.data.name,
                  description: '의류',
                  imageUrl:
                    states.data.url,
                  link: {
                    mobileWebUrl: `http://localhost:3000/product/${states.data.name}`,
                    androidExecutionParams: 'test',
                    webUrl : `http://localhost:3000/product/${states.data.name}`
                  },
                },
                buttons: [
                  {
                    title: '웹으로 이동',
                    link: {
                      mobileWebUrl: `http://localhost:3000/product/${states.data.name}`,
                      webUrl : `http://localhost:3000/product/${states.data.name}`
                    },
                  },
                ]
              });

        }
    },[states])

    return addShare;

}