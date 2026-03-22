import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Navigation Component
 * Provides a logo-based menu toggle button and slide-out overlay menu.
 *
 * Features:
 * - Focus trap when menu is open
 * - Escape key to close menu
 * - Body scroll lock prevention
 * - Accessible with ARIA labels
 */
export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const previousActiveElement = useRef(null);

    const handleMenuToggle = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const handleLinkClick = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    // Focus management and keyboard handling
    useEffect(() => {
        if (isMenuOpen) {
            // Store the currently focused element to restore later
            previousActiveElement.current = document.activeElement;

            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // Focus the first focusable element in the menu
            const focusableElements = menuRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }

            // Add escape key listener
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeMenu();
                }
            };

            document.addEventListener('keydown', handleEscape);

            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = '';

                // Restore focus to the button that opened the menu
                if (previousActiveElement.current) {
                    previousActiveElement.current.focus();
                }
            };
        }
    }, [isMenuOpen, closeMenu]);

    // Focus trap within the menu
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;

            const focusableElements = menuRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (!focusableElements || focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
    }, [isMenuOpen]);

    return (
        <>
            {/* Menu Toggle Button - Logo only */}
            <button
                ref={buttonRef}
                onClick={handleMenuToggle}
                className="fixed top-4 right-4 z-40 p-2 hover:opacity-70 transition-opacity duration-200"
                aria-label="Menü öffnen"
                aria-expanded={isMenuOpen}
                aria-controls="slide-menu"
            >
                <img
                    src="/images/logo.png"
                    alt="Menü"
                    className="h-10 w-auto"
                />
            </button>

            {/* Menu Overlay */}
            <div
                id="slide-menu"
                className={`fixed inset-0 z-50 transition-opacity duration-300 ${
                    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Hauptmenü"
            >
                {/* Overlay Background */}
                <button
                    className="absolute inset-0 bg-linear-to-br from-(--color-primary)/90 to-(--color-primary-dark)/95 backdrop-blur-md"
                    tabIndex={isMenuOpen ? 0 : -1}
                    onClick={handleMenuToggle}
                    aria-label="Menü schließen"
                />

                {/* Menu Content */}
                <nav
                    ref={menuRef}
                    className={`absolute top-0 right-0 h-full w-full max-w-md transform transition-transform duration-500 ease-out ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Close Button */}
                        <div className="flex justify-end p-6">
                            <button
                                onClick={handleMenuToggle}
                                className="text-white/80 hover:text-white transition-colors duration-200 p-2"
                                aria-label="Menü schließen"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Logo in Menu */}
                        <div className="flex justify-center py-8">
                            <img
                                src="/images/logo.png"
                                alt="Purple Noise Logo"
                                className="h-24 w-auto"
                            />
                        </div>

                        {/* Menu Links */}
                        <div className="flex-1 flex flex-col justify-center px-8">
                            <ul className="space-y-8">
                                <li>
                                    <a
                                        href="#hero"
                                        onClick={handleLinkClick}
                                        className="block text-3xl md:text-4xl font-light text-white hover:text-(--color-accent) transition-colors duration-300 transform hover:translate-x-4"
                                    >
                                        Start
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#concerts"
                                        onClick={handleLinkClick}
                                        className="block text-3xl md:text-4xl font-light text-white hover:text-(--color-accent) transition-colors duration-300 transform hover:translate-x-4"
                                    >
                                        Konzerte
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#rehearsals"
                                        onClick={handleLinkClick}
                                        className="block text-3xl md:text-4xl font-light text-white hover:text-(--color-accent) transition-colors duration-300 transform hover:translate-x-4"
                                    >
                                        Proben
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        onClick={handleLinkClick}
                                        className="block text-3xl md:text-4xl font-light text-white hover:text-(--color-accent) transition-colors duration-300 transform hover:translate-x-4"
                                    >
                                        Kontakt
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="p-8 text-center text-sm text-white/60">
                            <p>&copy; 2026 Purple Noise</p>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
