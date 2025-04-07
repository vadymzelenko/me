const body = document.body
const btnTheme = document.getElementById('btn-theme')

// Початкове завантаження теми з localStorage
const savedTheme = localStorage.getItem('portfolio-theme') || 'light'
const savedIcon = localStorage.getItem('portfolio-btn-theme') || 'fa-moon'

// Очистка старих класів і встановлення початкових
body.classList.remove('light', 'dark')
btnTheme.classList.remove('fa-moon', 'fa-sun')

body.classList.add(savedTheme)
btnTheme.classList.add(savedIcon)

const isDark = () => body.classList.contains('dark')

const setTheme = (theme, icon) => {
  body.classList.remove('light', 'dark')
  btnTheme.classList.remove('fa-moon', 'fa-sun')

  body.classList.add(theme)
  btnTheme.classList.add(icon)

  localStorage.setItem('portfolio-theme', theme)
  localStorage.setItem('portfolio-btn-theme', icon)
}

btnTheme.addEventListener('click', () => {
  if (isDark()) {
    setTheme('light', 'fa-moon')
  } else {
    setTheme('dark', 'fa-sun')
  }
})

const toggleTheme = () =>
  isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

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

document.querySelector('.nav__hamburger').addEventListener('click', displayList)

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
