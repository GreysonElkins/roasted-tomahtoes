const apiHead = "https://rancid-tomatillos.herokuapp.com/api/v2";
const localHost = `https://tomato-micro-service.herokuapp.com/api/v1`;
class API {
  static getData = async (location, id) => {
    const pathAndData = this.findRelevantPathAndData(location, id);
    try {
      const response = await fetch(pathAndData.path);
      const data = await response.json();
      return data[pathAndData.data];
    } catch (error) {
      return error;
    }
  };

  static findRelevantPathAndData = (location, id) => {
    const pathAndData = { path: "", data: "" };
    if (location === "movies") {
      pathAndData.path = `${apiHead}/movies/${id ? id : ""}`;
      pathAndData.data = id ? `movie` : `movies`;
    } else if (location === "videos" && id) {
      pathAndData.path = `${apiHead}/movies/${id}/videos`;
      pathAndData.data = `videos`;
    } else if (location === `ratings` && id) {
      pathAndData.path = `${apiHead}/users/${id}/ratings`;
      pathAndData.data = `ratings`;
    } else if (location === `favorites`) {
      pathAndData.path = `${localHost}/favorites`;
      pathAndData.data = `favorites`;
    } else if (location === "comments" && id) {
      pathAndData.path = `${localHost}/movies/${id}/comments`;
      pathAndData.data = `comments`;
    } else {
      throw new Error("A bad path was provided for fetching data");
    }
    return pathAndData;
  };

  static postData = async (info, id) => {
    const path = this.findPostPath(info, id);
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  static findPostPath = (info, id) => {
    const acceptableUserInfo = ["email", "password"];
    const acceptableRatingInfo = ["rating", "movie_id"];
    const acceptableFavoriteInfo = ["id"];
    const acceptableCommentsInfo = ["comment", "author"];
    const infoValues = Object.keys(info);
    if (
      id &&
      infoValues.every((value) => acceptableRatingInfo.includes(value))
    ) {
      return `${apiHead}/users/${id}/ratings`;
    } else if (
      infoValues.every((value) => acceptableUserInfo.includes(value))
    ) {
      return `${apiHead}/login`;
    } else if (
      infoValues.every((value) => acceptableFavoriteInfo.includes(value))
    ) {
      return `${localHost}/favorites`;
    } else if (
      infoValues.every((value) => acceptableCommentsInfo.includes(value))
    ) {
      return `${localHost}/movies/${id}/comments`;
    } else {
      throw new Error("Something is wrong with the data for POST");
    }
  };

  static deleteData = async (id, ratingID) => {
    const path = this.findDeletePath(id, ratingID);
    try {
      const response = await fetch(path, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  static findDeletePath = (id, ratingID) => {
    if (ratingID) {
      return `${apiHead}/users/${id}/ratings/${ratingID}`;
    } else {
      return `${localHost}/favorites/${id}`;
    }
  };
}

export default API;
