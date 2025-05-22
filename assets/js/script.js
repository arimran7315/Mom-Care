

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link (optional)
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function () {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.accordion-toggle');

    // Initialize accordion
    toggles.forEach(toggle => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('.toggle-icon');
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        // Set ARIA attributes and initial state
        toggle.setAttribute('aria-controls', content.id || `content-${Math.random().toString(36).substr(2, 9)}`);
        content.id = toggle.getAttribute('aria-controls');

        if (isExpanded) {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.textContent = '−';
            icon.classList.add('text-white', 'bg-emerald-800');
            icon.classList.remove('text-emerald-800');
            toggle.querySelector('span:first-child').classList.add('text-emerald-800');
            toggle.querySelector('span:first-child').classList.remove('text-gray-800');
        } else {
            toggle.setAttribute('aria-expanded', 'false');
            content.style.maxHeight = '0';
            icon.textContent = '+';
            icon.classList.add('text-emerald-800');
            icon.classList.remove('text-white', 'bg-emerald-800');
            toggle.querySelector('span:first-child').classList.add('text-gray-800');
            toggle.querySelector('span:first-child').classList.remove('text-emerald-800');
        }
    });

    // Handle click events
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.toggle-icon');
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // Close all other sections if this is opening
            if (!isExpanded) {
                toggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherContent = otherToggle.nextElementSibling;
                        const otherIcon = otherToggle.querySelector('.toggle-icon');

                        otherToggle.setAttribute('aria-expanded', 'false');
                        otherContent.style.maxHeight = '0';
                        otherIcon.textContent = '+';
                        otherIcon.classList.add('text-emerald-800');
                        otherIcon.classList.remove('text-white', 'bg-emerald-800');
                        otherToggle.querySelector('span:first-child').classList.add('text-gray-800');
                        otherToggle.querySelector('span:first-child').classList.remove('text-emerald-800');
                    }
                });
            }

            // Toggle current section
            if (isExpanded) {
                toggle.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0';
                icon.textContent = '+';
                icon.classList.add('text-emerald-800');
                icon.classList.remove('text-white', 'bg-emerald-800');
                toggle.querySelector('span:first-child').classList.add('text-gray-800');
                toggle.querySelector('span:first-child').classList.remove('text-emerald-800');
            } else {
                toggle.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = '−';
                icon.classList.add('text-white', 'bg-emerald-800');
                icon.classList.remove('text-emerald-800');
                toggle.querySelector('span:first-child').classList.add('text-emerald-800');
                toggle.querySelector('span:first-child').classList.remove('text-gray-800');
            }
        });
    });

    // Handle dynamic content resize
    const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            const content = entry.target;
            const toggle = content.previousElementSibling;
            if (toggle.getAttribute('aria-expanded') === 'true') {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    document.querySelectorAll('.accordion-content').forEach(content => {
        resizeObserver.observe(content);
    });
});