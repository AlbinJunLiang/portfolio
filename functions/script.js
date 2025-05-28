// Scroll suave personalizado para considerar altura del nav fijo
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const targetID = anchor.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetID);
        const navHeight = document.querySelector("nav")?.offsetHeight || 0;
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: "smooth",
            });
        }
    });
});

function descargarPDF() {
    const enlace = document.createElement("a");
    enlace.href = "data:application/pdf;base64," + pdf;
    enlace.download = "Albin Liang - Software Developer CV.pdf";
    enlace.click();
}

const toggle = document.getElementById('toggle-theme');
const icon = document.getElementById('theme-icon');

const excludedElements = [
    document.querySelector('nav'),
    document.querySelector('footer'),
    document.querySelector('.footer-content'),
    document.querySelector('.social-links')
].filter(Boolean); // elimina nulls si no existen

function setColors(elements, bgColor, textColor) {
    elements.forEach(el => {
        if (el) {
            el.style.backgroundColor = bgColor ?? "";
            el.style.color = textColor ?? "";
        }
    });
}

function setHeadingsColor(color) {
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        if (!excludedElements.some(ex => ex.contains(heading))) {
            heading.style.color = color;
        }
    });
}

function toggleGitHubIcon() {
    const githubIcon = document.querySelector('.tech-tag img[alt="GitHub"]');
    if (!githubIcon) return;
    if (githubIcon.src.includes('github_dark.svg')) {
        githubIcon.src = 'icons/github_light.svg';
    } else {
        githubIcon.src = 'icons/github_dark.svg';
    }
}

function applyDarkMode() {
    document.body.style.backgroundColor = "#0f0f1c";
    document.body.style.color = "white";

    document.querySelectorAll('section').forEach(section => {
        if (!excludedElements.includes(section)) {
            section.style.backgroundColor = "#1a1a2e";
            section.style.color = "white";
        }
    });

    const elementsToDarken = [
        ...document.querySelectorAll('.experience-item'),
        ...document.querySelectorAll('.certification-item'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.skills-category'),
        ...document.querySelectorAll('.language-item')
    ];
    setColors(elementsToDarken, "#1a1a2e", "white");

    setHeadingsColor("white");

    icon.textContent = 'light_mode';
}

function applyLightMode() {
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.color = "#333";

    document.querySelectorAll('section').forEach(section => {
        if (!excludedElements.includes(section)) {
            section.style.backgroundColor = "white";
            section.style.color = "#333";
        }
    });

    const elementsToLighten = [
        ...document.querySelectorAll('.experience-item'),
        ...document.querySelectorAll('.certification-item'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.skills-category'),
        ...document.querySelectorAll('.language-item')
    ];
    setColors(elementsToLighten, "", "");

    setHeadingsColor("");

    icon.textContent = 'dark_mode';
}

function updateThemeColors(isDark) {
    // skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.style.backgroundColor = isDark ? 'rgb(5,5,5)' : '#e0e0e0';
        tag.style.color = isDark ? 'rgb(228, 228, 228)' : 'rgb(0, 0, 0)';
    });

    // about paragraph and strong text
    const aboutP = document.getElementById('p-about');
    if (aboutP) aboutP.style.color = isDark ? 'white' : '#555';

    const strongText = document.querySelector('#profile-text strong');
    if (strongText) strongText.style.color = isDark ? 'rgb(255, 243, 14)' : 'rgb(33, 14, 110)';

    // spans in #about
    const aboutSpans = document.querySelectorAll('#about span');
    aboutSpans.forEach(span => {
        span.style.color = isDark ? 'white' : '#555';
    });

    // paragraphs in #projects
    const projectParagraphs = document.querySelectorAll('#projects p');
    projectParagraphs.forEach(p => {
        p.style.color = isDark ? 'white' : '#555';
    });

    // language names
    const languageNames = document.querySelectorAll('#languages .language-name');
    languageNames.forEach(span => {
        span.style.color = isDark ? 'white' : '#555';
    });

    // github element
    const githubElement = document.querySelector('.github');
    if (githubElement) githubElement.style.color = isDark ? 'white' : 'black';
}

toggle.addEventListener('click', e => {
    e.preventDefault();

    toggleGitHubIcon();

    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
        document.body.classList.remove('dark-mode');
        applyLightMode();
        updateThemeColors(false);
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark-mode');
        applyDarkMode();
        updateThemeColors(true);
        localStorage.setItem('theme', 'dark');
    }
});

// Cargar tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        applyDarkMode();
        updateThemeColors(true);
    } else {
        applyLightMode();
        updateThemeColors(false);
    }
}

loadTheme();
