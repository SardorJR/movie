var movieScroll = document.getElementById("movie_scroll");
var scrollMovie = document.querySelector(".scroll_movie");

movieScroll.addEventListener("input", function () {
  var value = this.value;
  var scrollWidth = scrollMovie.scrollWidth - scrollMovie.clientWidth;
  var scrollPosition = (value / 100) * scrollWidth;
  scrollMovie.scrollLeft = scrollPosition;
});

scrollMovie.addEventListener("scroll", function () {
  var scrollWidth = scrollMovie.scrollWidth - scrollMovie.clientWidth;
  var scrollPosition = (scrollMovie.scrollLeft / scrollWidth) * 100;
  movieScroll.value = scrollPosition;
});


// VITE_BASE_URL=https://api.themoviedb.org/3/movie
// VITE_API_KEY=Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODAzYWUxZGEwOGU3M2RmM2ZjMTI2OGMzNTE2NWNjMiIsInN1YiI6IjY0MjdlZWY4OGE4OGIyMDBkNTMyOGQ1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8WByVMOVhx2M7eo1SLPb3cPkt2NSfzLg53Afm1_dr-M


// const grid = document.querySelector('.grid')

// fetch('https://api.themoviedb.org/3/movie/now_playing', {
//   headers: {
//     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODAzYWUxZGEwOGU3M2RmM2ZjMTI2OGMzNTE2NWNjMiIsInN1YiI6IjY0MjdlZWY4OGE4OGIyMDBkNTMyOGQ1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8WByVMOVhx2M7eo1SLPb3cPkt2NSfzLg53Afm1_dr-M
//     `
//   }
// })
//   .then(res => res.json())
//   .then(res =>
//     reload_now(res.results, grid)
//   )
// function reload_now(arr, place) {
//   place.innerHTML=''
//   for (let item of arr) {
//     place += `
//     <div class="item">
//     <img src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="">
//     <span>Побег из Претории</span>
//     <p>${item.title}</p>
//   </div>
//     `
//   }
// }
const grid = document.querySelector('.grid')
let scroll_movie = document.querySelector('.scroll_movie')
let iframe = document.querySelector('iframe')
let showAll = false;
fetch('https://api.themoviedb.org/3/movie/now_playing', {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODAzYWUxZGEwOGU3M2RmM2ZjMTI2OGMzNTE2NWNjMiIsInN1YiI6IjY0MjdlZWY4OGE4OGIyMDBkNTMyOGQ1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8WByVMOVhx2M7eo1SLPb3cPkt2NSfzLg53Afm1_dr-M`
  }
})
  .then(res => res.json())
  .then(res => {
    reload_2(res.results, scroll_movie, iframe);
    reload_now(res.results.slice(0, 8), grid);
  })

function reload_now(arr, place) {
  place.innerHTML = ''
  for (let item of arr) {
    console.log(item);
    place.insertAdjacentHTML('beforeend', `
      <div class="item">
        <img src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="">
        <span>${item.title}</span>
        <p>Боевик</p>
      </div>
    `);
  }
}
let new_film = document.querySelector('.new_film')
new_film.onclick = () => {
  fetch('https://api.themoviedb.org/3/movie/now_playing', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODAzYWUxZGEwOGU3M2RmM2ZjMTI2OGMzNTE2NWNjMiIsInN1YiI6IjY0MjdlZWY4OGE4OGIyMDBkNTMyOGQ1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8WByVMOVhx2M7eo1SLPb3cPkt2NSfzLg53Afm1_dr-M`
    }
  })
    .then(res => res.json())
    .then(res => {

      if (!showAll) {
        reload_now(res.results, grid)
        new_film.innerHTML = 'показать 8'
        showAll = true
      } else {
        reload_now(res.results.slice(0, 8), grid)
        new_film.innerHTML = 'показать все новинки'
      }
    }
    )

}
let nam = document.querySelector('.name')

function reload_2(arr, place, iframe) {
  place.innerHTML = ''
  for (let item of arr) {
    const boxItem = document.createElement('div');
    boxItem.classList.add('box_item');

    const item1 = document.createElement('div');
    item1.classList.add('item1');
    item1.style.background = `url('https://image.tmdb.org/t/p/original${item.poster_path}')`;

    const img = document.createElement('img');
    img.src = '/public/img/Polygon 2 (1).png';
    img.alt = '';

    const span = document.createElement('span');
    span.textContent = item.title;
    boxItem.id = item.id
    // Добавляем img и span внутрь элемента item1
    item1.appendChild(img);

    // Добавляем item1 и span внутрь элемента boxItem
    boxItem.appendChild(item1);
    boxItem.appendChild(span);

    // Добавляем boxItem в конец контейнера place
    place.appendChild(boxItem);


    item1.onclick = () => {
      fetch(`https://api.themoviedb.org/3/movie/${item.id}/videos`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODAzYWUxZGEwOGU3M2RmM2ZjMTI2OGMzNTE2NWNjMiIsInN1YiI6IjY0MjdlZWY4OGE4OGIyMDBkNTMyOGQ1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8WByVMOVhx2M7eo1SLPb3cPkt2NSfzLg53Afm1_dr-M`
        }
      })
        .then(res => res.json())
        .then(res => {
          const trailer = res.results.find(item => item.type === 'Trailer')
          iframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
          nam.innerHTML = item.title
        })
    }
  }
}








const links = document.querySelectorAll('.active');

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    links.forEach(l => l.classList.remove('acti'));
    link.classList.add('acti');
  });
});




const linkss = document.querySelectorAll('.active2');


linkss.forEach(lin => {
  lin.addEventListener('click', (event) => {
    event.preventDefault();

    linkss.forEach(l => l.classList.remove('act'));
    lin.classList.add('act');
  });
});
