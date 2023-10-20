const accessKey = 'duPouGctUuWikSixCFavfRMfTd9V0CuKUhJS9KRY6t8';
const url = `https://api.unsplash.com`;
const ID = `client_id=${accessKey}`;
const imgSpec = `orientation=landscape`;
const modal = document.getElementById('my-modal')
const modalImg = document.getElementById('modal-img');
const prevImg = document.querySelector('.arrow-left');
const nextImg = document.querySelector('.arrow-right');
const about = document.querySelector('.link-about');
const searchInput = document.getElementById('search-input');
const clearButton = document.querySelector('.clear-button');

let photosData =[];
let currentIndex;

searchInput.focus();

searchInput.addEventListener('input', () => {
  clearButton.style.display = searchInput.value ? 'block' : 'none';
});

clearButton.addEventListener('click', () => {
  searchInput.value = '';
  clearButton.style.display = 'none';
})

function displayPhotos(photos) {
  const photoContainer = document.getElementById('photo-container');
  photoContainer.innerHTML = '';

  photos.forEach(photo => {
    const photoItem = document.createElement('div');
    photoItem.classList.add('card');

    const img = document.createElement('img');
    img.src = photo.urls.regular;

    img.addEventListener('click', () => {
      openModal(photo.urls.regular);
    })

    img.addEventListener('contextmenu', (event) => {
      event.preventDefault();
        Swal.fire({
          title: 'Are you sure?',
          text: "Full size image will be open in a new tab.",
          icon: 'warning',
          iconColor: '#999999',
          showCancelButton: true,
          confirmButtonColor: '#009933',
          cancelButtonColor: '#696969',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(photo.urls.full, '_blank');
          }
        })
      }
    );
    photoItem.appendChild(img);
    photoContainer.appendChild(photoItem);
  });
}

function openModal(imageUrl) {
  currentIndex = photosData.findIndex(item => item.urls.regular === imageUrl);
  modal.style.display = 'flex';
  modalImg.src = imageUrl;
}

modal.addEventListener('click', closeModal)

function closeModal(event) {
  const target = event.target;
  if(target === modal || target.closest('.close')) {
    modal.style.display = 'none';
  }
}

function prevImage () {
  currentIndex = (currentIndex - 1 + photosData.length) % photosData.length;
  const imageUrl = photosData[currentIndex].urls.full;
  modalImg.src = imageUrl;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % photosData.length;
  const imageUrl = photosData[currentIndex].urls.full;
  modalImg.src = imageUrl;
}

async function fetchPhotos() {
  try {
    const response = await fetch(`${url}/photos/random?${ID}&count=12&${imgSpec}`);
      if (!response.ok) {
        if(response.status === 403) {
          Swal.fire({
            icon: 'error',
            iconColor: '#999999',
            title: 'Oops...',
            confirmButtonColor: '#009933',
            html: `Exceeded the number of requests. Please try again later.`,
          })
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const data = await response.json();
        photosData = data;
        displayPhotos(data);
      }
    } catch (error) {
    console.error('Error fetching random photos:', error);
  }
}

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    searchPhotos();
  }
}

async function searchPhotos() {
  try {
    const seacrhInput = document.getElementById('search-input');
    const query = seacrhInput.value;
    if(query === '') {
      fetchPhotos();
    } else {
      const response = await fetch(`${url}/search/photos?query=${query}&${ID}&per_page=24&${imgSpec}`)
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      const searchData = await response.json();
      photosData = searchData.results;

      const photos = searchData.results || [];
      photos.length === 0 ? Swal.fire({
        icon: 'error',
        iconColor: '#999999',
        title: 'Oops...',
        confirmButtonColor: '#009933',
        text: `There's no photo on "${query}". Please retry with valid request.`,
      }) : displayPhotos(photos);
    }
          } catch (error) {
            console.error('Error searching photos:', error);
          }
    }

    about.addEventListener('click', () => {
      Swal.fire({
        icon: 'question',
        confirmButtonColor: '#009933',
        title: 'About',
        html: 'Enjoy using the <Strong>Image Gallery.</strong></br></br>To make a query, type the query into the <em>Search bar</em> and press the <strong>Search</strong> button or <strong>Enter</strong>.</br></br>To open the image in full size, <strong>right-click</strong> on the image.</br></br>To view the slideshow, <strong>left-click</strong> on the image and use the arrows.',
      })
    })

fetchPhotos();

//самооценка
console.log (
  '%cСамостоятельная оценка:\n', 'font-weight: bold; font-size: 15px',
  '\n',
  '[\u2713] Верстка  +10\n',
  '   [\u2713] на странице есть несколько фото и строка поиска +5\n',
  '   [\u2713] в футере приложения есть ссылка на гитхаб автора приложения, год\n        создания приложения, логотип курса со ссылкой на курс +5\n',
  '[\u2713] При загрузке приложения на странице отображаются полученные от API\n     изображения +10\n',
  '[\u2713] Если в поле поиска ввести слово и отправить поисковый запрос, на странице\n     отобразятся изображения соответствующей тематики, если такие данные\n     предоставляет API +10\n',
  '[\u2713] Поиск +30\n',
  '   [\u2713] при открытии приложения курсор находится в поле ввода +5\n',
  '   [\u2713] есть placeholder +5\n',
  '   [\u2713] автозаполнение поля ввода отключено (нет выпадающего списка с\n     предыдущими запросами) +5\n',
  '   [\u2713] поисковый запрос можно отправить нажатием клавиши Enter +5\n',
  '   [\u2713] после отправки поискового запроса и отображения результатов поиска,\n     поисковый запрос продолжает отображаться в поле ввода +5\n',
  '   [\u2713] в поле ввода есть крестик при клике по которому поисковый запрос из\n     поля ввода удаляется и отображается placeholder +5\n',
  '[\u2713] Очень высокое качество оформления приложения и/или дополнительный не\n     предусмотренный в задании функционал, улучшающий качество приложения\n     +10\n',
  '   [\u2713] высокое качество оформления приложения предполагает собственное\n        оригинальное оформление равное или отличающееся в лучшую сторону\n        по сравнению с демо\n',
  '\n',

  'Баллы: 60/60'
)