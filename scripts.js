document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    // Función para actualizar el enlace activo en la barra de navegación
    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    };

    // Evento de scroll con la rueda del mouse para navegar entre secciones
    window.addEventListener('wheel', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado de scroll
        const currentSection = document.elementFromPoint(0, window.innerHeight / 2);
        let targetSection = e.deltaY < 0 ? currentSection.previousElementSibling : currentSection.nextElementSibling;

        if (targetSection && targetSection.tagName === 'SECTION') {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Llamar a updateActiveLink después de un corto delay para asegurarse de que la sección esté en la vista
        setTimeout(updateActiveLink, 500);
    }, { passive: false });

    // Actualizar el enlace activo también en scroll normal
    window.addEventListener('scroll', updateActiveLink);
});
