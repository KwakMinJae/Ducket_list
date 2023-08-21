import All from '../images/6306486.jpg'
import Exer from '../images/8463904.jpg'
import Trip from '../images/6955497.jpg'
import Economy from '../images/7938212.jpg'
import Creative from '../images/7802355.jpg'
import Skill from '../images/6951216.jpg'
import Challenge from '../images/5267895.jpg'
import Complete from '../images/success_icon.png'
import Modify from '../images/modify_icon.png'
import delete_icon from '../images/delete_icon.png'
import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import 'firebase/firestore';
import { db, auth } from '../firebase/firebase-config';
import { collection, getDocs, doc, addDoc, query, orderBy, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { Helmet } from "react-helmet-async";


function Content() {
  const [changed, setChanged] = useState(false);
  const [user, setUser] = useState(null);
  const [newList, setNewList] = useState("");
  const [todos, setList] = useState([]);
  const todosCollectionRef = collection(db, 'todos');
  const [selectedOption, setSelectedOption] = useState("All");
  const [completedItems, setCompletedItems] = useState([]);
 


  const toggleCompletion = async (itemId) => {
    if (completedItems.includes(itemId)) {
      setCompletedItems(completedItems.filter(id => id !== itemId));
    } else {
      setCompletedItems([...completedItems, itemId]);
    }
  
    const listDoc = doc(db, "todos", itemId);
    const editData = {
      // 해당 항목이 완료되었는지 여부를 데이터베이스에 반영
      isCompleted: !completedItems.includes(itemId),

    }
  
    await updateDoc(listDoc, editData);

    // 변경된 completedItems 배열을 세션 스토리지에 저장
    sessionStorage.setItem("completedItems", JSON.stringify(completedItems));

  };


  useEffect(() => {
    const getLists = async () => {
      const data = await getDocs(
        query(todosCollectionRef, orderBy("timeStamp", "desc"))
      );

      setList(
        data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      );
    }

    getLists();
    setChanged(false);
  }, [changed]);

  useEffect(() => {
    const storedCompletedItems = JSON.parse(sessionStorage.getItem("completedItems")) || [];
    setCompletedItems(storedCompletedItems);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("completedItems", JSON.stringify(completedItems));
  }, [completedItems]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        const userDocRef = doc(db, 'users', user.uid);
        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setCompletedItems(userData.completedItems);
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      } else {
        setUser(null);
        setCompletedItems([]);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);


  const date = new Date();
  const now_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const createList = () => {
    if (newList.trim() !== "") {
    addDoc(todosCollectionRef, {
      content: newList,
      d_date: now_date,
      timeStamp: date,
      category: selectedOption,
      isCompleted:false,
      uid: user.uid,
    });

      setChanged(true);
      setNewList("");
    }
  }

  const updateList = async (id, content) => {
    const msg = prompt("내용 수정", content)

    if (msg) {
      const listDoc = doc(db, "todos", id);
      const editData = {
        content: msg,
        d_date: now_date,
        timeStamp: date
      }

      await updateDoc(listDoc, editData)
      setChanged(true)
    }
  }

  const deleteList = async (id) => {
    if (user) { // 사용자가 로그인한 경우에만 항목을 삭제
      var del_ck = window.confirm("정말 삭제하시겠습니까?")

      if (del_ck) {
        const listDoc = doc(db, "todos", id);

        await deleteDoc(listDoc)
        if (completedItems.includes(id)) {
          setCompletedItems(completedItems.filter(completedId => completedId !== id));
        }

        setChanged(true);
      }
    }
  }
  
  useEffect(() => {
    
    const unsubscribe = onSnapshot(
      query(todosCollectionRef, orderBy("timeStamp", "desc")),
      (snapshot) => {
        const updatedTodos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setList(updatedTodos);

        const updatedCompletedItems = updatedTodos
        .filter((item) => item.isCompleted)
        .map((item) => item.id);
        setCompletedItems(updatedCompletedItems);
      }
    );

    return () => {
      unsubscribe(); 
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 동작 방지
      createList();
    }
  }
  

  const totalListCount = todos.length;

  const userTodos = todos.filter(value => user && value.uid === user.uid);

  const userInProgressCount = userTodos.filter(value => !completedItems.includes(value.id)).length;
  const userCompletedCount = completedItems.filter(id => {
    const item = userTodos.find(value => value.id === id);
    return item && item.uid === user.uid;
  }).length;
  const showList = todos.map(
    (value) => {
      const itemClasses = value.isCompleted ? "completed" : "incomplete";
  
      if (selectedOption === "All" || value.category === selectedOption) {
        if (user && value.uid === user.uid) {
        return (
          <div key={value.id} className={`bucket_box_img ${itemClasses}`}>
            <div>
              <div className='bucket_lists'>
                <div className='bucket_text'>
                  {value.content} ({value.category})
                  {/* <span className='d_date'>{value.d_date}</span> */}
                </div>
                <div className='bucket_icon'>
                  <div className='bucket_icon_list'>
                    <button type="button" onClick={() => toggleCompletion(value.id)}><img src={Complete} alt="완료" /></button>
                  </div>
                  <div className='bucket_icon_list'>
                    <button type="button" onClick={() => updateList(value.id, value.content)}><img src={Modify} alt="수정" /></button>
                  </div>
                  <div className='bucket_icon_list'>
                    <button type="button" onClick={() => deleteList(value.id)}><img src={delete_icon} alt="삭제" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        }
      }
      return null;
    }
  );

  return (
    <div className="App">
      <Helmet>
        <title>꿈을 작성해주세요</title>
      </Helmet>
      <div className="cont_wrap">
        <div className='bucket_menu'>
          <div className='list_all_number_wrap'>
            <div>
              <div className='list_all_text'>전체 리스트 수</div>
              <div className='list_all_number'>
                {user ? userTodos.length : totalListCount}
              </div>
            </div>
          </div>
          <div className='list_ing_ed_wrap'>
            <div className='list_wrap'>
              <div className='list_ing_num'>{userInProgressCount}</div>
              <div className='list_text'>진행중</div>
            </div>
            <div className='list_wrap'>
              <div className='list_ed_num'>{userCompletedCount}</div>
              <div className='list_text'>완료</div>
            </div>
          </div>
          <div className="list_textarea">
            <div className="list_text1"><span>당신의 꿈을 작성해주세요</span></div>
            <textarea
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
              onKeyDown={handleKeyDown} // 엔터 키 감지
              ></textarea>
          </div>
          <div className="list_select_box">
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="All">All</option>
              <option value="여행">여행</option>
              <option value="운동">운동</option>
              <option value="경제">경제</option>
              <option value="창작">창작</option>
              <option value="기술">기술</option>
              <option value="도전">도전</option>
            </select>
          </div>
          <div className="bucket_button">
            <button type="button" className="bucket_button1"
              onClick={createList}>등록</button>
          </div>
        </div>
        <div className='bucket_list'>
          <div className='bucket_list_li'>
            <ul>
              <li>
                <a href="#none" onClick={() => setSelectedOption("All")}>
                  <img src={All} alt="All" />
                  <span>All</span>
                </a>
              </li>
              <li>
                <a href="#none" onClick={() => setSelectedOption("여행")}>
                  <img src={Trip} alt="여행" />
                  <span>여행</span>
                </a>
              </li>
              <li>
                <a href="#none" onClick={() => setSelectedOption("운동")}>
                  <img src={Exer} alt="운동" />
                  <span>운동</span>
                </a>
              </li>
              <li>
                <a href="#none" onClick={() => setSelectedOption("경제")}>
                  <img src={Economy} alt="경제" />
                  <span>경제</span>
                </a>
              </li>
              <li>
                <a href="#none" onClick={() => setSelectedOption("창작")}>
                  <img src={Creative} alt="창작" />
                  <span>창작</span>
                </a>
              </li>
              <li>
                <a href="#none" onClick={() => setSelectedOption("기술")}>
                  <img src={Skill} alt="기술" />
                  <span>기술</span>
                </a>
              </li>
              <li>
                <a href="#none" onClick={() => setSelectedOption("도전")}>
                  <img src={Challenge} alt="도전" />
                  <span>도전</span>
                </a>
              </li>
            </ul>
          </div>
          <div className='bucket_box' style={{ overflow: 'auto', maxHeight: '400px' }}>
            {showList}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content;