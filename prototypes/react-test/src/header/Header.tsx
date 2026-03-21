import {type JSX, useState} from "react";

export function Header(): JSX.Element {
    return (
        <header className={`fixed top-0 z-50 right-2 bg-transparent px-4 lg:px-6 py-2.5`}>
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-5xl max-h-1/12">
                <Logo/>
            </div>
        </header>
    );
}

const Logo = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <div className={`relative inline-block`}>
            <div>
                <button
                    onClick={toggleMenu}
                    className={
                        `inline-flex justify-center w-full px-4 py-2 bg-transparent`
                    }
                >
                    <img
                        className={`object-scale-down shrink h-10 md:h-12`}
                        src={`/images/logo.png`}
                        alt={`Logo`}
                    />
                </button>
            </div>
            {isOpen && (
                <div
                    className={`origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-purple-800 ring-1 ring-purple-950 ring-opacity-5 focus:outline-none`}
                    role="menu"
                >
                    <nav className={`py-1`}>
                        <MenuItem title={`Bilder`} href={`#home`}/>
                        <MenuItem title={`Aktuelles`} href={`#news`}/>
                    </nav>
                </div>
            )}
        </div>
    );
};

const MenuItem = ({title, href}: { title: string; href: string }): JSX.Element => (
    <a
        href={href}
        className={`block px-4 py-2 text-white rounded bg-transparent text-sm hover:text-purple-300 p-0`}
        role={`menuitem`}
    >
        {title}
    </a>
);
