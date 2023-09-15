const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const Data = await res.json();
  const category = Data.data;
  handleCategory(category);
};

const handleCategory = (categories) => {
  const categoryList = document.getElementById("category-list");
  for (const cat of categories) {
    const categoryItem = document.createElement("div");
    categoryItem.innerHTML = `<a onClick="handleLoadNews('${cat.category_id}')" class="tab bg-btnBg rounded">${cat.category}</a>`;
    categoryList.appendChild(categoryItem);
  }
  const tabLinks = categoryList.querySelectorAll(".tab");
  tabLinks.forEach((tabLink) => {
    tabLink.addEventListener("click", () => {
      tabLinks.forEach((link) => {
        link.classList.remove("bg-clifford");
        link.classList.remove("text-white");
      });
      tabLink.classList.add("bg-clifford");
      tabLink.classList.add("text-white");
    });
  });
};

const handleLoadNews = async (id = "1000") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const news = data.data;
  setData(news);
};

const setData = (news) => {
  const cardContainer = document.getElementById("card-container");
  const blankContainer = document.getElementById("blank-container");
  blankContainer.innerHTML = "";
  cardContainer.innerHTML = "";
  if (news.length > 0) {
    for (const da of news) {
      const cardDiv = document.createElement("div");
      const seconds = da.others.posted_date;    
      const {hours,minutes} = convertDate(seconds);
      const timeInfor=`${hours}hrs ${minutes} min ago`
      
      cardDiv.classList = "card";
      cardDiv.innerHTML = `
      <figure class="h-48 lg:w-full rounded-xl">
          <img src="${
            da.thumbnail
          }" alt="Shoes" class="rounded-xl w-full h-48 " />
      </figure>
      <div class="items-start text-left py-3">
          <div class="flex items-start gap-3">
              <div class="h-12 w-12 rounded-full">
                  <img class="rounded-full w-12 h-12 " src="${da.authors[0]?.profile_picture}" alt="" srcset="">
              </div>
              <div>
                  <h2 class="text-base font-bold mt-1" >${da.title}</h2>
                  <p class="flex items-center gap-2 text-textColor ">${da.authors[0]?.profile_name} <span><img class="w-5" src="${da.authors[0]?.verified === true ? "../image/fi_10629607.png" : ""}" alt="" srcset=""></span></p>
                  <p class=" text-textColor">${da.others.views} views</p>
              </div>
          </div>
      </div>
    <div class="timePlace absolute bottom-28 right-3 text-white bg-bgcolor px-2 rounded-md">${seconds?timeInfor:''}</div>
      `;
      
      cardContainer.appendChild(cardDiv);
    }
  } else {
    const blankField = document.createElement("div");
    blankField.innerHTML = `
    <img src="./image/Icon.png" alt="Shoes" class="px-36 mb-5" />
    <h1 class="text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
    `;
    blankContainer.appendChild(blankField);
  }
};

const handleSortOrder = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/1000`
  );
  const data = await res.json();
  const news = data.data;

  const setSort = news.sort(function (a, b) {
    const first = parseFloat(a.others.views.replace("k", ""));
    const second = parseFloat(b.others.views.replace("k", ""));
    return second - first;
  });
  console.log(setSort);
  setData(setSort);
};
const handleBlogPage = () => {
  window.location.href = "../blog.html";
};

const BackMainPage = () => {
  window.location.href = "../index.html";
};

const convertDate = (second) => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  // const time = `${hours}hrs ${minutes} min ago`;
  return {hours,minutes};
};

loadCategory();
handleLoadNews();
