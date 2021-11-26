const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentMenuName = "espresso";

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    } else store.setLocalStorage(this.menu);

    render();
  };

  const render = () => {
    const data = store.getLocalStorage();

    $("#espresso-menu-list").innerHTML = data[this.currentMenuName]
      .map(
        (item, index) =>
          `<li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${item}</span>
          <button
            type="button"
            id=${index}
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
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
        </li>
        `
      )
      .join("");
    updateMenuCount();
    $("#espresso-menu-name").value = "";
  };

  const updateMenuCount = () => {
    $(".menu-count").innerText = `총 ${
      this.menu[this.currentMenuName].length
    }개`;
  };

  const updateMenuName = (menuName, menuId) => {
    const value = prompt("수정하실 메뉴 명을 입력해주세요", menuName);
    this.menu[this.currentMenuName][menuId] = value;
    store.setLocalStorage(this.menu);
    render();
  };

  const removeMenuName = (menuId) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      this.menu[this.currentMenuName].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    //수정하는 버튼을 클릭하는 경우 -> 이벤트 위임을 이용
    if (e.target.classList.contains("menu-edit-button")) {
      const menuName = e.target.closest("li").querySelector(".menu-name")
        .innerText;

      updateMenuName(menuName, e.target.id);
      return;
    }

    //삭제하는 버튼을 클릭하는 경우 -> 이벤트 위임을 이용
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e.target.id);
      return;
    }

    //품절하는 버튼을 클릭하는 경우 -> 이벤트 위임을 사용
    if (e.target.classList.contains("menu-sold-out-button")) {
      e.target
        .closest("li")
        .querySelector(".menu-name")
        .classList.toggle("sold-out");
      return;
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

    this.menu[this.currentMenuName].push(menuName);
    render();
    store.setLocalStorage(this.menu);
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

      this.menu[this.currentMenuName].push(menuName);
      store.setLocalStorage(this.menu);
      render();
    }
  });

  $("nav").addEventListener("click", (e) => {
    if (e.target.classList.contains("cafe-category-name")) {
      const categoryName = e.target.innerText;
      $(".mt-1").innerText = `${categoryName} 메뉴 관리`;
      this.currentMenuName = e.target.dataset.categoryName;
      render();
    }
  });
}

const app = new App();
app.init();
