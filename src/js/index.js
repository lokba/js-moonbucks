/*
step1 요구사항
// 메뉴 추가
[x] 에스프레스 메뉴에 확인 버튼 이벤트 리스너 등록하기
[x] 에스프레스 메뉴에 엔터키 입력으로 이벤트 리스너 등록하기
[x] 추가되는 메뉴 아이템은  <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입(readme)
[x] 총 메뉴 갯수를 count하여 보여주기
[x] 메뉴 추가시, input값 '' 초기화
[x] 입력값이 ''인 경우, 추가 되지 않는다


// 메뉴 수정
[x] 수정 버튼 클릭시 prompt 이용하여 메뉴 이름 수정


// 메뉴 삭제
[x] 삭제 버튼 클릭시 confirm 이용하여 메뉴 삭제 
[x] 총 메뉴 갯수를 count하여 보여주기
*/

//Dom 객체 만들어주는 함수
const $ = (tag) => document.querySelector(tag);

function App() {
  this.menu = [];

  //렌더링하는 함수
  const render = () => {
    $("#espresso-menu-list").innerHTML = this.menu
      .map(
        (item, index) =>
          `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${item.name}</span>
    <button
      type="button"
      id=${index}
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      id=${index}
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>`
      )
      .join("");

    // 메뉴의 수를 카운터하는 함수
    countMenuItem();
  };

  const countMenuItem = () => {
    $(".menu-count").innerText = `총 ${this.menu.length}개`;
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    //수정하는 버튼을 클릭하는 경우
    if (e.target.classList.contains("menu-edit-button")) {
      const menuName = e.target.closest("li").querySelector(".menu-name")
        .innerText;

      let value = prompt("수정하실 메뉴 명을 입력해주세요", menuName);
      this.menu[e.target.id].name = value;
      render();
    }

    //삭제하는 버튼을 클릭하는 경우
    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.menu.splice(e.target.id, 1);
        render();
      }
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    //form 이벤트 리스너 방지
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", (e) => {
    const inputValue = $("#espresso-menu-name").value;

    if (inputValue === "") {
      alert("메뉴이름이 입력되지 않았습니다");
      return;
    }

    this.menu.push({ name: inputValue });
    render();
    $("#espresso-menu-name").value = "";
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const inputValue = $("#espresso-menu-name").value;

      if (inputValue === "") {
        alert("메뉴이름이 입력되지 않았습니다");
        return;
      }

      this.menu.push({ name: inputValue });
      render();
      $("#espresso-menu-name").value = "";
    }
  });
}

const app = new App();
