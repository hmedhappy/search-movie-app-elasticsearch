const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");
require("dotenv").config();

const MOVIES = require("./data/movies.json");

const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: process.env?.ELASTIC_USER,
    password: process.env?.ELASTIC_PASSWORD,
  },
  tls: {
    ca: fs.readFileSync("./http_ca.crt"),
    rejectUnauthorized: false,
  },
});

const phraseSearch = async (_index, phrase) => {
  const hits = [];
  const searchResult = await client
    .search({
      index: _index,
      query: {
        multi_match: {
          query: phrase,
          fields: ["Title^2", "Overview^1"],
        },
      },
      sort: [
        {
          Popularity: {
            order: "desc",
          },
        },
        {
          Release_Date: {
            order: "desc",
          },
        },
      ],
    })
    .catch((e) => console.log("errr", e));
  if (searchResult?.hits?.hits?.length > 0) {
    hits.push(...searchResult.hits.hits);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

const addData = async () => {
  try {
    await Promise.all(
      MOVIES.map(
        async ({
          Vote_Average,
          Vote_Count,
          Original_Language,

          Release_Date,
          ...movie
        }) => {
          await client.index({
            index: "movie-db",
            body: {
              ...movie,
              Release_Date: new Date(Release_Date),
            },
          });
        }
      )
    );

    await client.indices.refresh({ index: "movie-db" });
    console.log("DONE");
  } catch (error) {
    if (error) throw error;
  }
};

const deleteIndex = async (index) => {
  try {
    const response = await client.indices.delete({ index });
    return response;
    // console.log(`Index deleted: ${response.body.acknowledged}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  phraseSearch,
  addData,
  deleteIndex,
};
