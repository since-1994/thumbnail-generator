

const colors = document.querySelectorAll('.color-selector');
colors.forEach(color => {
    color.style.backgroundColor = color.getAttribute('color');
})