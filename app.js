const tbody = document.getElementById("tbody");

let countries = [];
const countriesFetch = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => (countries = data));
};
countriesFetch()
  .then(() => {
    countries.map((a) => {
      // console.log(a);

      const tr = document.createElement("tr");
      const countryName = document.createElement("td");
      countryName.textContent = a.name.common;
      tr.append(countryName);

      const countryCapital = document.createElement("td");
      countryCapital.textContent = a.capital;
      tr.append(countryCapital);

      const countryRegion = document.createElement("td");
      countryRegion.textContent = a.region;
      tr.append(countryRegion);

      const countryPopulation = document.createElement("td");
      countryPopulation.textContent = a.population;
      tr.append(countryPopulation);

      const countryFlag = document.createElement("td");
      const flagImg = document.createElement("img");
      flagImg.setAttribute("src", `${a.flags.png}`);

      countryFlag.append(flagImg);
      tr.append(countryFlag);

      tbody.append(tr);
    });
   
  }).then((a)=>{
    const pagination = document.getElementById("pagination");
    const rows = [...document.querySelectorAll("tbody tr")];

    const recordPerPage = 7;
    const totalPageCount = Math.ceil(rows.length / recordPerPage);
    let activePage = 1;

    const paginate = () => {
      pagination.innerHTML = "";
      
      let start = activePage - 3 > 0 ? activePage - 3 : 1;
      let startIndex = (activePage - 1) * recordPerPage;
      rows.map((a, b) => {
        if (b >= startIndex && b <= startIndex + recordPerPage) {
          a.style.display = "table-row";
          
        } else {
          a.style.display = "none";
        }
        
      });
      let end = activePage + 3;
      for (let i = start; i <= end && i <= totalPageCount; i++) {
        const page = document.createElement("li");
        if (i === activePage) {
          page.classList.add("active");
        }
        page.addEventListener("click", () => {
          activePage = i;
          paginate();
        });
        page.textContent = i;
        pagination.append(page);
      }
    };
    paginate();
  })
  
    
  

// const recordPerPage = 7;
// const totalPageCount = Math.ceil(rows.length / recordPerPage);
// let activePage = 1;

// const paginate = () => {
//   pagination.innerHTML = "";
//   let start = activePage - 3 > 0 ? activePage - 3 : 1;
//   let startIndex = (activePage - 1) * recordPerPage;
//   rows.map((a, b) => {
//     if (b >= startIndex && b <= startIndex + recordPerPage) {
//       a.style.display = "block";
//     } else {
//       a.style.display = "none";
//     }
//   });
//   let end = activePage + 3;
//   for (let i = start; i <= end && i <= totalPageCount; i++) {
//   const page = document.createElement("li");
//     if (i === activePage) {
//       page.classList.add("active");
//     }
//     page.addEventListener("click", () => {
//       activePage = i;
//       paginate();
//     });
//     page.textContent = i;
//     pagination.append(page);
//   }
// };
// paginate();
