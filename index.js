const searchInfo = document.querySelector(".searchInfo");
const viewRep = document.querySelector(".viewRep");
const listRep = document.querySelector(".listRep");

searchInfo.addEventListener("input", function () {
  clearTimeout(this.timer);

  const queryString = this.value;

  this.timer = setTimeout(async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${queryString}`
      );
      const { items } = await response.json();

      viewRep.innerHTML = "";

      if (items && items.length > 0) {
        items.slice(0, 5).forEach((elem) => {
          const itemRepList = document.createElement("li");
          itemRepList.classList.add("inputRepList");
          itemRepList.innerText = elem.name;
          itemRepList.addEventListener("click", () => handleItemClick(elem));
          viewRep.appendChild(itemRepList);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, 600);
});

function getItem(elem) {
  const itemRepList = document.createElement("li");
  itemRepList.classList.add("itemRepList");
  itemRepList.insertAdjacentHTML(
    "beforeend",
    `
    <div>
      Name: ${elem.name} <br>
      Owner: ${elem.owner.login} <br>
      Stars: ${elem.stargazers_count} 
    </div>
    <div>
      <span class='deleteBtn'><img src='./deleteIco.png' width='50px' /></span>
    </div>
  `
  );
  listRep.appendChild(itemRepList);

  itemRepList
    .querySelector(".deleteBtn")
    .addEventListener("click", () => itemRepList.remove());
}

function handleItemClick(elem) {
  getItem(elem);
  searchInfo.value = "";
  viewRep.innerHTML = "";
}
