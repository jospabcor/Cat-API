const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=5&api_key=live_lNUNX228ceQJK7kA0M6amABtS41dqIQfX11bJK959oHUve40QSewOiZbWbVY3gvy";

const API_URL_FAVOURITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_lNUNX228ceQJK7kA0M6amABtS41dqIQfX11bJK959oHUve40QSewOiZbWbVY3gvy";

const API_URL_FAVOURITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_lNUNX228ceQJK7kA0M6amABtS41dqIQfX11bJK959oHUve40QSewOiZbWbVY3gvy`;

const spanError = document.getElementById("randomGatosError");

async function loadRandomCats() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const btnRdnGnrl = document.querySelectorAll('.btnRdnGnrl');
    
    let img = document.querySelectorAll(".catImg");
    console.log(data);
    img.forEach((cat, pos) => {
      cat.src = data[pos].url;
    });
    btnRdnGnrl.forEach((cat,pos) =>{
      cat.onclick =() => saveFavouriteCat(data[pos].id)
    })
  }
}

async function loadFavouriteCats() {
  const res = await fetch(API_URL_FAVOURITES);
  const data = res.status === 200 ? await res.json() : await res.text();
  const sectionFavs = document.getElementById("favoritesMichis");
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message;
  } else {
    const favsArr = [];
    const container = document.createElement("div");
    container.classList.add("imgContainerFavs");
    sectionFavs.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Gatitos Favoritos");
    h2.append(h2Text);
    h2.classList.add("h2Title");
    sectionFavs.append(h2);
    sectionFavs.append(container);

    data.forEach((item) => {
      const art = document.createElement("article");
      const image = document.createElement("img");
      const button = document.createElement("button");
      const textBtn = document.createTextNode("Quitar de favoritos");

      button.append(textBtn);
      button.addEventListener("click", () => deleteFavouriteCat(item.id));
      image.classList.add("catImgg");
      image.src = item.image.url;
      art.append(image, button);
      favsArr.push(art);
    });
    container.append(...favsArr);
  }
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

  const data = res.status === 200 ? await res.json() : await res.text();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message;
  } else {
    loadFavouriteCats();
    loadRandomCats();
  }
}

async function deleteFavouriteCat(id) {
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message;
  } else {
    console.log("gato eliminado de favoritos");
    loadFavouriteCats();
  }
}

const btn = document.querySelector(".rdnCat");
btn.onclick = loadRandomCats;

loadRandomCats();
loadFavouriteCats();
