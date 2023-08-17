import mainbotbg from '../images/main_bg.jpg'
import mainbg from '../images/main_bg1.jpeg'
import subimg1 from '../images/subimg1.jpg'
import touch3d from '../images/3d_touch.jpg'
import duck from '../images/duck_ducks_pato_icon.png'
import React from "react";

import { getAuth } from 'firebase/auth'
// import { getAuth } from "firebase/auth";
import { Helmet } from "react-helmet-async";

function Main() {
    const auth = getAuth();
    const handleStart = () => {
        // Start 버튼 클릭 시 실행되는 함수
        if (auth.currentUser) {
          window.location.replace('/content');
        } else {
            window.location.replace('/login');
        }
      };

    return (
      <div className="App">
        <Helmet>
            <title>Ducket list</title>
          </Helmet>
        <main>
            <div className='main1_wrap'>
                <div className='bucket_text_wrap1'>
                    <div className='bucket_text_wrap'>
                        <div className='bucket_text'>
                            버킷리스트 작성하러 가기!!
                        </div>
                        <div className='typical'>
                            인생의 목표를 적어보세요<img src={duck} alt="오리 아이콘"></img>
                        </div>
                            <button type="button"  className='bucket_start'
                            onClick={handleStart}
                            >Start</button>
                    </div>
                </div>
            <div className='main_bg'>
                <img src={mainbg} alt="배경이미지"></img>
            </div>
            </div>
            <div className='main2_wrap'>
                    <div className='main_img1'>
                        <img src={subimg1} alt="버킷리스트 작성 요령"></img>
                    </div>
                    <div className='main_text1'>
                    <p className='main_text1_title'>버킷리스트 작성 키포인트 5가지</p>
                    <p><span>Key Point 1 <span className='main_text1_str'>되기</span></span><br/><br/>
                    어떤 사람이 되고 싶은지 적어보는 것입니다.
                    목표를 정한 뒤, 이를 이루기 위한 역량이나 자격들을 세부목표로 정합니다</p>

                    <p><span>Key Point 2 <span className='main_text1_str'>하기</span></span><br/><br/>
                    경험하고 싶은 것들은 이 부분에 기록합니다. 직접 체험 할 수 있는 것들을 적고 세부 계획을 세웁니다.</p>

                    <p><span>Key Point3 <span className='main_text1_str'>갖기</span></span><br/><br/>
                    말 그대로 가지고 싶은 것들을 적으면 됩니다. 소유하고 싶은 것들을 적고 최종목표를 달성하기까지의 세부목표를 단계별로 실천합니다.</p>

                    <p><span>Key Point4 <span className='main_text1_str'>돕기</span></span><br/><br/>
                    자신을 위한 꿈만 꾸기 보다는 남을 돕겠다는 소망도 가치가 있다고 생각합니다. 봉사에 대한 희망도 적어보세요.</p>

                    <p><span>Key Point 5 <span className='main_text1_str'>세부계획</span></span><br/><br/>
                    큰 목표를 세웠다면 실천에 한걸음 더 다가가는 세부목표를 세워야 합니다. 최대한 '구체적'으로 적어야 한다는 것입니다.</p>
                    </div>
            </div>
            <div className='main2_wrap'>
                    <div className='main_text1'>
                    <p className='main_text1_title'>버킷리스트 사용 Tip</p>
                    <p>완료한 버킷 리스트 항목은 체크해주세요!!</p>
                    <p>목표로 한 것들을 꼭 이뤄 보세요</p>
                    </div>
                    <div className='main_img1'>
                        <img src={touch3d} alt="버킷리스트 작성 요령"></img>
                    </div>
            </div>
            <div className='main3_wrap'>
                <div className='mainbotbg'>
                    <img src={mainbotbg} alt="메인 하단 이미지"></img>
                </div>
                <div className='main3_text'>
                    <p className='main_text1_title'>
                        버킷리스트 작성하러 가기!!
                    </p>
                    <button type="button"  className='bucket_start'
                        onClick={handleStart}
                    >Start</button>
                </div>
            </div>
        </main>
      </div>
    );
  }
  
  export default Main;
  