//======================================================================================
//Тест на поддержеку браузера - изображений webP
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

//Мобильное меню =======================================================================================
const burger = document.querySelector('.menu-burger'),
      menu = document.querySelector('.header .menu'),
      menuItem = document.querySelectorAll('.header .menu a');
function toggleMenu(){
  burger.classList.toggle('active');
  menu.classList.toggle('active');
}
burger.addEventListener('click', toggleMenu);
menuItem.forEach(elem => {
  elem.addEventListener('click', toggleMenu);
});

//Плавная прокрутка по якорям  меню =====================================================================
var headerHeight = $('header').outerHeight();
$('.menu__item a').on('click', function(_event) {
  _event.preventDefault();
  var linkHref = $(this).attr('href');
  $('.wrapper').animate({
    scrollTop: $(linkHref).offset().top
  }, 500);
  console.log(linkHref);

});


//Слайдер на первом экране======================================================================================
const swiperMain = new Swiper('.main-slider',{
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: '.main-slider .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.main-slider .swiper-button-next',
    prevEl: '.main-slider .swiper-button-prev',
  }
});
const swiperAbout = new Swiper('.about-right',{
  loop: true,
  effect: 'flip',
  fadeEffect: {
    slidesShadows: false
  },
  autoplay: {
    delay: 3000,
  },
});
//Табы - вкладки =============================================================================
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
  const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

  function hideTabContent(){
    content.forEach(item => {
      item.style.display = 'none';
    });

    tab.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0){
    content[i].style.display = 'block';
    tab[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  header.addEventListener('click', (e) => {
    const target = e.target;
    if (target &&
        (target.classList.contains(tabSelector.replace(/\./, "")) 
        || target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) ) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  });

};

tabs('.service-list', '.service__item', '.service-content', 'active');
tabs('.price-tabs-list', '.price-tabs__item', '.price-tabs-content', 'active');

//======================================================================================
//Всплывающие окна
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true; //для исключения двойного нажатия
const timeout = 800; //ms для блокировки скролла
if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll(
  '.close-popup'); //в html добавить класс .close-popup, при нажатии которого popup закрывается
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup')); //.closest - возвращает ближайший родительский элемент
      e.preventDefault();
    });
  }
}
function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      //если у нажатого объекта нет родителя с классом popup__content, тогда мы popup закрываем 
      if (!e.target.closest('.popup__content')) { //отсекаем все, кроме темной области
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}
function bodyLock() {
  //при открыти и закрытии popup пропадает и появляется скролл и контект пляшет, чтобы этого не было:
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  //Для того чтобы фиксированная шапка с классом .lock-padding не пригала при открытии и закрытии popup
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
  //чтобы не было повторных нажатий
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});
//Полифилы//Для поддержки кода в старых браузерах
function isInternetExplorer() {
  return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}
if (isInternetExplorer() === false) {
  // alert('Браузер не IE');
  (function () {
    if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
        var node = this;
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
  })();
} else {
  // alert('Сочувствую, но ваш браузер IE');
  (function () {
    if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
        var node = this;
        while (node) {
          if (node.msMatchesSelector(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
  })();
}
(function () {
  //Проверяем поддерждку
  if (!Element.prototype.matches) {
    //определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
});