import {useState, useEffect, useRef, useCallback, type JSX} from 'react';

const socialLinks = [
    {name: 'Instagram', href: 'https://www.instagram.com/purplenoisechoir/', icon: 'instagram'},
    {name: 'Facebook', href: 'https://www.facebook.com/purplenoisechoir/', icon: 'facebook'}
];

const renderSocialIcon = (iconName: string): JSX.Element | null => {
    if (iconName === 'facebook') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
        );
    }

    if (iconName === 'instagram') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
        );
    }

    return null;
};

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
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDialogElement | null>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    const handleMenuToggle = useCallback((): void => {
        setIsMenuOpen((prev: boolean) => !prev);
    }, []);

    const handleLinkClick = useCallback((): void => {
        setIsMenuOpen(false);
    }, []);

    const closeMenu = useCallback((): void => {
        setIsMenuOpen(false);
    }, []);

    // Keep native dialog state in sync with React state.
    useEffect(() => {
        const dialogElement = menuRef.current;
        if (!dialogElement) {
            return;
        }

        if (isMenuOpen) {
            previousActiveElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            if (!dialogElement.open) {
                dialogElement.showModal();
            }
            document.body.style.overflow = 'hidden';

            const focusableElements: NodeListOf<HTMLElement> | undefined = dialogElement.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            focusableElements?.[0]?.focus();
            return;
        }

        if (dialogElement.open) {
            dialogElement.close();
        }
        document.body.style.overflow = '';
        previousActiveElement.current?.focus();
    }, [isMenuOpen]);

    useEffect(() => {
        const dialogElement = menuRef.current;
        if (!dialogElement) {
            return;
        }

        const handleClose = (): void => {
            setIsMenuOpen(false);
            document.body.style.overflow = '';
            previousActiveElement.current?.focus();
        };

        dialogElement.addEventListener('close', handleClose);
        return (): void => {
            dialogElement.removeEventListener('close', handleClose);
        };
    }, []);

    // Focus trap within the menu
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            const focusableElements: NodeListOf<HTMLElement> | undefined = menuRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (!focusableElements || focusableElements.length === 0) return;

            const firstElement: HTMLElement = focusableElements[0];
            const lastElement: HTMLElement = focusableElements[focusableElements.length - 1];

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
            {/* Header Bar */}
            <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-(--color-dark)/75 backdrop-blur-sm">
                <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 sm:px-6">
                    <div className="flex items-center gap-2 justify-self-start">
                        {socialLinks.map((socialLink) => (
                            <a
                                key={socialLink.name}
                                href={socialLink.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-md text-(--color-text) hover:bg-white/10 hover:text-(--color-accent) transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-dark)"
                                aria-label={`${socialLink.name} (oeffnet in neuem Tab)`}
                            >
                                {renderSocialIcon(socialLink.icon)}
                            </a>
                        ))}
                    </div>

                    <a
                        href="/#hero"
                        className="justify-self-center whitespace-nowrap px-2 text-lg font-semibold tracking-wide text-(--color-text) hover:text-(--color-accent) transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-dark) sm:text-2xl md:text-3xl"
                    >
                        Purple Noise
                    </a>

                    <div className="justify-self-end">
                        <button
                            onClick={handleMenuToggle}
                            className="rounded-md p-2 hover:opacity-80 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-dark)"
                            aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                            aria-expanded={isMenuOpen}
                            aria-controls="slide-menu"
                        >
                            <img
                                src="/images/logo.png"
                                alt=""
                                className="h-10 w-auto"
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu Overlay */}
            <dialog
                id="slide-menu"
                className={`fixed inset-0 z-50 transition-opacity duration-300 ${
                    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                aria-label="Hauptmenü"
                ref={menuRef}
            >
                {/* Overlay Background */}
                <button
                    className="absolute inset-0 bg-linear-to-br from-(--color-primary)/90 to-(--color-primary-dark)/95 backdrop-blur-md"
                    tabIndex={isMenuOpen ? 0 : -1}
                    onClick={closeMenu}
                    aria-label="Menü schließen"
                />

                {/* Menu Content */}
                <nav
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
                                        href="/#hero"
                                        onClick={handleLinkClick}
                                        className="block text-3xl md:text-4xl font-light text-white hover:text-(--color-accent) transition-colors duration-300 transform hover:translate-x-4"
                                    >
                                        Start
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/#concerts"
                                        onClick={handleLinkClick}
                                        className="block text-3xl md:text-4xl font-light text-white hover:text-(--color-accent) transition-colors duration-300 transform hover:translate-x-4"
                                    >
                                        Konzerte
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/#rehearsals"
                                        onClick={handleLinkClick}
                                        className="block text-3xl md:text-4xl font-light text-white hover:text-(--color-accent) transition-colors duration-300 transform hover:translate-x-4"
                                    >
                                        Proben
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/#contact"
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
            </dialog>
        </>
    );
}
