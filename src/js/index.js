const $ = (selector) => document.querySelector(selector);

function App() {
  this.menu = [];

  const render = () => {
    $("#espresso-menu-list").innerHTML = this.menu
      .map(
        (item, index) =>
          `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${item.menuName}</span>
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
    updateMenuCount();
    $("#espresso-menu-name").value = "";
  };

  const updateMenuCount = () => {
    $(".menu-count").innerText = `총 ${this.menu.length}개`;
  };

  const updateMenuName = (menuName, menuId) => {
    let value = prompt("수정하실 메뉴 명을 입력해주세요", menuName);
    this.menu[menuId].name = value;
    render();
  };

  const removeMenuName = (menuId) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      this.menu.splice(menuId, 1);
      render();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    //수정하는 버튼을 클릭하는 경우 -> 이벤트 위임을 이용
    if (e.target.classList.contains("menu-edit-button")) {
      const menuName = e.target.closest("li").querySelector(".menu-name")
        .innerText;

      updateMenuName(menuName, e.target.id);
    }

    //삭제하는 버튼을 클릭하는 경우 -> 이벤트 위임을 이용
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e.target.id);
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", (e) => {
    const menuName = $("#espresso-menu-name").value;

    if (menuName === "") {
      alert("값을 입력해주세요.");
      return;
    }

    this.menu.push({ menuName });
    render();
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }

    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }

    if (e.key === "Enter") {
      const menuName = $("#espresso-menu-name").value;

      this.menu.push({ menuName });
      render();
    }
  });

  $("nav").addEventListener("click", (e) => {
    if (e.target.classList.contains("cafe-category-name")) {
      let categoryName = e.target.innerText;
      $(".mt-1").innerText = `${categoryName} 메뉴 관리`;
    }
  });
}

const app = new App();
