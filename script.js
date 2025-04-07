const body = document.body
const btnTheme = document.getElementById('btn-theme') // теперь это иконка <i>
const btnHamburger = document.querySelector('.nav__hamburger')
const navUl = document.querySelector('.nav__list')

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass)
  btnTheme.classList.add(btnClass)
}

const removeThemeClass = (bodyClass, btnClass) => {
  body.classList.remove(bodyClass)
  btnTheme.classList.remove(btnClass)
}

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

const isDark = () => body.classList.contains('dark')

const toggleTheme = () => {
  isDark() ? setTheme('light', 'fa-sun') : setTheme('dark', 'fa-moon')
}

// Применение сохранённой темы
const savedBodyTheme = localStorage.getItem('portfolio-theme')
const savedBtnTheme = localStorage.getItem('portfolio-btn-theme')

if (savedBodyTheme && savedBtnTheme) {
  addThemeClass(savedBodyTheme, savedBtnTheme)
} else {
  setTheme('dark', 'fa-moon') // дефолтная тема
}

btnTheme.parentElement.addEventListener('click', toggleTheme)

// Бургер меню
btnHamburger.addEventListener('click', () => {
  const icon = btnHamburger.querySelector('i')

  if (icon.classList.contains('fa-bars')) {
    icon.classList.remove('fa-bars')
    icon.classList.add('fa-times')
    navUl.classList.add('display-nav-list')
  } else {
    icon.classList.remove('fa-times')
    icon.classList.add('fa-bars')
    navUl.classList.remove('display-nav-list')
  }
})

// Scroll top кнопка
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