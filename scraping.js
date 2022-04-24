const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

async function getData(url) {
  const response = await axios({
    url: url,
    headers: { "content-type": "application/json" },
    validateStatus: (status) => {
      return true;
    },
  });
  const html = await response.data;
  const $ = await cheerio.load(html);

  if ($("script:not([src])")[3] == null) {
    return {
      id: null,
      img: null,
      description: null,
      embedUrl: null,
      viewedCount: null,
      relatedVideos: null,
    };
  } else {
    const script = await JSON.parse($("script:not([src])")[3].children[0].data)
      .props.pageProps.videoData;

    return {
      id: script.id,
      img: script.primaryImageSet[0].url,
      description: script.description,
      embedUrl: script.embedUrl,
      viewedCount: script.viewedCount,
      relatedVideos: script.relatedVideos,
    };
  }
}

fs.readFile("tedtalk.json", "utf-8", async (err, data) => {
  if (err) {
    console.log(err.message);
  }

  data = JSON.parse(data);

  console.log("waiting...");

  for (let i = 0; i < Math.ceil(data.length / 100); i++) {
    const temp = [];

    for (let j = i * 100; j < 100 * (i + 1); j++) {
      if (j >= data.length) break;

      temp.push(data[j]);
    }
    await get_data(temp, i);
  }
});

async function get_data(data, i) {
  setTimeout(async () => {
    for (let i = 0; i < data.length; i++) {
      const url = data[i].link;
      const returned_data = await getData(url);

      const id = await returned_data.id;
      const img = await returned_data.img;
      const description = await returned_data.description;
      const relatedVideos = await returned_data.relatedVideos;
      data[i]["views"] = await returned_data.viewedCount;

      const dic = await {
        ...data[i],
        id,
        img,
        description,
        relatedVideos,
      };

      fs.appendFile(
        "tedTalkDetailed.json",
        JSON.stringify(dic) + ",\n",
        "utf-8",
        async (err) => {
          if (err) console.log("there was error while creating file");
        }
      );
    }
  }, 2500 * i);
}
