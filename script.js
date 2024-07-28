document.addEventListener("DOMContentLoaded", function () {
  const name = document.querySelector(".name");
  const type = document.querySelector(".type");
  const image = document.getElementById("image");
  const ul = document.querySelector(".list_abilities");

  function searchPokemom() {
    let req = document.getElementById("search").value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${req}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na rede: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        name.textContent = data["forms"][0]["name"];

        image.src = data["sprites"]["front_default"];

        image.style.display = "block";

        type.textContent = data["types"][0]["type"]["name"];

        ul.style.display = "grid";

        let listAbilities = data["abilities"];

        ul.innerHTML = "";
        for (i in listAbilities) {
          const newLi = document.createElement("li");
          newLi.textContent = listAbilities[i]["ability"]["name"];
          ul.appendChild(newLi);
        }
      })

      .catch((error) => {
        console.error("Erro na requisição:", error);
        alert("Pokemom não encontrado");
      });
  }

  const botao = document.getElementById("botao");
  botao.addEventListener("click", searchPokemom);
});
