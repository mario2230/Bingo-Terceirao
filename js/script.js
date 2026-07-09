/**
 * Bingo do Terceirão - JavaScript
 * Funcionalidades: Header scroll, smooth scroll, interatividade
 */

document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initSmoothScroll();
});

/**
 * Header Scroll Effect
 * Adiciona classe 'scrolled' ao header quando usuário faz scroll
 */
function initHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Smooth Scroll para links internos
 * Melhora a experiência ao clicar em links âncora
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignora links vazios ou que apontam para #
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calcula o offset do header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Lazy Loading de imagens (opcional)
 * Melhora performance ao carregar imagens sob demanda
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Analytics (opcional)
 * Rastreia cliques em botões importantes
 */
function trackEvent(eventName, eventData) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    console.log('Event tracked:', eventName, eventData);
}

// Rastrear cliques em botões de compra
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('comprar_cartela', {
            'elemento': this.textContent
        });
    });
});

// Rastrear cliques em WhatsApp
document.querySelectorAll('.whatsapp-btn, .btn-footer').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('whatsapp_click', {
            'elemento': this.textContent
        });
    });
});
