/*===== YouTube API =====*/
const videoContainer = document.querySelector(".video-list");
const pagination = document.querySelector(".pagination");

const API_KEY = "AIzaSyA9XfI_9DKEfDi5e2Yk9asBcRfB0llnWEY";
const maxResults = 6;
let totalResults = 0;
let resultsPerPage;
let nextPageToken = "";
let prevPageToken = "";
let totalPages = 0;
//load items
window.addEventListener("DOMContentLoaded", () => {
  getVideos();
});

function getVideos() {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCaGeZ0wvXqtBeDmxiUnXCtw&maxResults=${maxResults}&order=date&key=${API_KEY}&type=video&pageToken=${nextPageToken}`
      
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
      applyPagination();
      displayVideos(videos);
    });
}

function displayVideos(videos) {
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

function setupPagination(){

}
