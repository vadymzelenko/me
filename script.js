const body = document.body
const btnTheme = document.getElementById('btn-theme') // 🔥 надійно
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass)
  btnTheme.classList.add(btnClass)
}

const removeThemeClass = (bodyClass, btnClass) => {
  body.classList.remove(bodyClass)
  btnTheme.classList.remove(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

if (getBodyTheme && getBtnTheme) {
  addThemeClass(getBodyTheme, getBtnTheme)
} else {
  // дефолтна тема
  setTheme('dark', 'fa-moon')
}

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {
  const oldBodyClass = localStorage.getItem('portfolio-theme')
  const oldBtnClass = localStorage.getItem('portfolio-btn-theme')

  if (oldBodyClass && oldBtnClass) {
    removeThemeClass(oldBodyClass, oldBtnClass)
  }

  addThemeClass(bodyClass, btnClass)
  localStorage.setItem('portfolio-theme', bodyClass)
  localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () => {
  isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')
}

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
  const navUl = document.querySelector('.nav__list')

  if (btnHamburger.classList.contains('fa-bars')) {
    btnHamburger.classList.remove('fa-bars')
    btnHamburger.classList.add('fa-times')
    navUl.classList.add('display-nav-list')
  } else {
    btnHamburger.classList.remove('fa-times')
    btnHamburger.classList.add('fa-bars')
    navUl.classList.remove('display-nav-list')
  }
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
  const btnScrollTop = document.querySelector('.scroll-top')

  if (
    body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    btnScrollTop.style.display = 'block'
  } else {
    btnScrollTop.style.display = 'none'
  }
}

document.addEventListener('scroll', scrollUp)

