/*===== YouTube API =====*/
const videoContainer = document.querySelector(".video-list");
const pagination = document.querySelector(".pagination");

const pagesContainer = document.getElementById("pagesContainer");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
let pagesBtns = [];

const API_KEY = "AIzaSyA9XfI_9DKEfDi5e2Yk9asBcRfB0llnWEY";
const maxResults = 6;
let totalResults = 0;
let resultsPerPage;
let nextPageToken = "";
let prevPageToken = "";
let totalPages = 0;
let currentPage = 0;
let allVideos = [];

//load items
window.addEventListener("DOMContentLoaded", () => {
  initializeVideos();
});

prevPageBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  displayPageVideos(allVideos, currentPage);
});

nextPageBtn.addEventListener("click", () => {
  if (currentPage >= 2) return;
  currentPage++;
  displayPageVideos(allVideos, currentPage);
});

function initializeVideos() {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCaGeZ0wvXqtBeDmxiUnXCtw&maxResults=${maxResults}&order=date&key=${API_KEY}&type=video`
  )
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      let videos = data.items;
      nextPageToken = data.nextPageToken;
      prevPageToken = data.prevPageToken;
      totalResults = data.pageInfo.totalResults;
      resultsPerPage = data.pageInfo.resultsPerPage;
      totalPages = Math.ceil(totalResults / resultsPerPage);
      console.log(totalPages);
      currentPage = 1;
      setupPagination();
    });
}

function setupPagination() {
  for (i = 0; i < totalPages; i++) {
    let html = `<button class="pageBtn" id="prevPageBtn">${i + 1}</button>`;
    const placeholder = document.createElement("div");
    placeholder.innerHTML = html;
    const element = placeholder.firstElementChild;
    pagesContainer.append(element);
  }
  pagesBtns = pagesContainer.querySelectorAll("button");
  console.log(pagesBtns);
  pagesBtns[0].classList.add("active");

  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCaGeZ0wvXqtBeDmxiUnXCtw&maxResults=${totalResults}&order=date&key=${API_KEY}&type=video`
  )
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      allVideos = data.items;
      console.log(allVideos);
      displayPageVideos(allVideos, currentPage);
    });

  pagesBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPage = btn.innerHTML;
      displayPageVideos(allVideos, currentPage);
    });
  });
}

function displayPageVideos(videos, page) {
  page--;
  let start = resultsPerPage * page;
  let end = start + resultsPerPage;
  let paginatedItems = videos.slice(start, end);
  console.log(paginatedItems);
  displayVideos(paginatedItems);
}

function displayVideos(videos) {
  pagesBtns.forEach((element) => {
    element.classList.remove("active");
  });
  pagesBtns[currentPage - 1].classList.add("active");
  let videoTemplate = videos.map((video) => {
    let date = video.snippet.publishTime.split("T");
    let dateAr = date[0].split("-");
    let newDate = dateAr[2] + "-" + dateAr[1] + "-" + dateAr[0];

    let url = `https://www.youtube.com/watch?v=${video.id.videoId}`;

    return `  <div class="video-item padd-15">
        <div class="inner">
          <div class="thumbnail">
            <a href="${url}" target="_blank">
              <img class="image" src="${video.snippet.thumbnails.high.url}" alt="">
            </a>
          </div>
          <div class="details">
            <h3 class="title">
              <a href="${url}" target="_blank">${video.snippet.title}</a>
            </h3>
            <span class="date">${newDate}</span>
          </div>
        </div>
      </div>`;
  });
  videoTemplate = videoTemplate.join("");

  videoContainer.innerHTML = videoTemplate;
}

/*------- fetcing videos using the page token -------*/
// function fetchVideos(pageToken) {
//   fetch(
//     `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCaGeZ0wvXqtBeDmxiUnXCtw&maxResults=${maxResults}&order=date&key=${API_KEY}&type=video&pageToken=${pageToken}`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw Error("ERROR");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       let videos = data.items;
//       nextPageToken = data.nextPageToken;
//       prevPageToken = data.prevPageToken;
//       displayVideos(videos);
//     });
// }
