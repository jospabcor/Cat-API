const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=5&api_key=live_lNUNX228ceQJK7kA0M6amABtS41dqIQfX11bJK959oHUve40QSewOiZbWbVY3gvy";

const API_URL_FAVOURITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_lNUNX228ceQJK7kA0M6amABtS41dqIQfX11bJK959oHUve40QSewOiZbWbVY3gvy";

const spanError = document.getElementById("randomGatosError");

async function loadRandomCats() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const btnrdn1 = document.getElementById("btnrdn1");
    const btnrdn2 = document.getElementById("btnrdn2");
    const btnrdn3 = document.getElementById("btnrdn3");
    const btnrdn4 = document.getElementById("btnrdn4");
    const btnrdn5 = document.getElementById("btnrdn5");

    btnrdn1.addEventListener("click", () => saveFavouriteCat(data[0].id));
    btnrdn2.addEventListener("click", () => saveFavouriteCat(data[1].id));
    btnrdn3.addEventListener("click", () => saveFavouriteCat(data[2].id));
    btnrdn4.addEventListener("click", () => saveFavouriteCat(data[3].id));
    btnrdn5.addEventListener("click", () => saveFavouriteCat(data[4].id));
    let img = document.querySelectorAll(".catImg");
    console.log(data);
    img.forEach((cat, pos) => {
      cat.src = data[pos].url;
      cat.setAttribute("image-url", data[pos].url);
    });
  }
}

async function loadFavouriteCats() {
  const res = await fetch(API_URL_FAVOURITES);
  const data = res.status === 200 ? await res.json() : await res.text();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message;
  }

  const favsArr = [];
  const container = document.querySelector(".imgContainerFavs");
  data.forEach((item) => {
    const art = document.createElement("article");
    const image = document.createElement("img");
    const button = document.createElement("button");
    const textBtn = document.createTextNode("Quitar de favoritos");

    button.append(textBtn);
    image.classList.add("catImgg");
    image.src = item.image.url;
    art.append(image, button);
    favsArr.push(art);
  });
  container.append(...favsArr);
}

async function saveFavouriteCat(id) {
  const res = await fetch(API_URL_FAVOURITES, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
}

const btn = document.querySelector(".rdnCat");

btn.onclick = loadRandomCats;

loadRandomCats();
loadFavouriteCats();
