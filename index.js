let apiData = [];

const getData = async () => {
  const videosData = await fetch(
    "https://api.freeapi.app/api/v1/public/youtube/videos"
  );

  apiData = await videosData.json();
  console.log(apiData)
  renderItems(apiData.data.data);
};

const renderItems = (itemsToRender) => {
  const videoContainer = document.querySelector(".videos-container");
  videoContainer.innerHTML = "";
  itemsToRender?.map((item) => {
    const videoCard = document.createElement("div");
    const imgPath = item.items.snippet.thumbnails.maxres.url;
    const videoId = item?.items?.id;

    const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
    videoCard.innerHTML = `
        <div class='video-card'>
            <img src = ${imgPath} class='card-img'>
            <div class='card-title'>${item.items.snippet.title}</div>
            <div class='card-channel'>${item.items.snippet.channelTitle}</div>
        </div>
    `;
    videoCard.addEventListener("click", () => {
        window.open(videoLink, "_blank");
      });
    videoContainer.appendChild(videoCard);
  });
};

const getFilteredItems = (searchTerm) => {
  if (apiData) {
    let filterData;
    filterData = apiData?.data?.data.filter((video) => {
      return video.items.snippet?.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    renderItems(filterData);
  }
};

getData();
