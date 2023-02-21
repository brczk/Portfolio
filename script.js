let i = 0;
const menuButton = document.querySelector('body #nav-button');
const navbar = document.querySelector('body #navbar');
const content = document.querySelector('body #content');

const animateHome = () => {
    const nouns = ['learning', 'contribution', 'creativity', 'progression', 'success'];
    const colors = ['#ffc20e', '#ff4a3d', '#6f3198'];
    const introduction = document.querySelector('#content #home h1');
    introduction.querySelector('#nouns').textContent = `${nouns[i++ % nouns.length]}.`;
    introduction.querySelector('#iminto').style.color = `${colors[i++ % colors.length]}`;
}

const loadPage = (event) => {
    event.preventDefault();
    const targetId = event.target.firstChild.getAttribute('href');
    const targetPage = document.querySelector(`#content ${targetId}`);
    const width = document.documentElement.clientWidth;

    targetPage.style.display = 'flex';
    document.querySelectorAll('.pages').forEach(page => page != targetPage ? page.style.display = 'none' : page);

    if(width < 1200)
    {
        toggleMenu();
    }
}

const toggleMenu = () => {
    if(window.getComputedStyle(navbar).display == 'none')
    {
        navbar.style.display = 'block';
        content.style.display = 'none';
    }
    else
    {
        navbar.style.display = 'none';
        content.style.display = 'block';
    }
}

const fetchPortfolio = () => {
    fetch('portfolio.txt')
    .then(response => response.text())
    .then(text => {
        const result = text.replace(/\n/g, '<br>');
        document.querySelector('#content #about #portfolio').innerHTML = result;
    });
}

window.onload = () => {
    setInterval(animateHome, 1200);
    menuButton.addEventListener('click', toggleMenu);
    window.addEventListener('resize', () => {
        const width = document.documentElement.clientWidth;
        if(width <= 1200)
        {
            menuButton.style.display = 'block';
            navbar.style.display = 'none';
        }
        else
        {
            menuButton.style.display = 'none';
            navbar.style.display = 'block';
            content.style.display = 'block';
        }
    });
    document.querySelectorAll('#navbar ul li').forEach(li => {
        li.addEventListener('click', loadPage);
    });
    document.querySelector('#content #about #hostname').textContent = new URL(window.location.href).hostname;
    fetchPortfolio();
}