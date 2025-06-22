import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    const options = { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const link = navLinks.find(nav => nav.id === id);
          if (link) setActive(link.title);
        }
      });
    }, options);

    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toggle && menuRef.current && !menuRef.current.contains(e.target)) {
        setToggle(false);
      }
    };
    const handleEsc = (e) => e.key === 'Escape' && setToggle(false);

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [toggle]);

  const handleNavClick = (id, title) => (e) => {
    e.preventDefault();
    setActive(title);
    setToggle(false);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    navigate(`/#${id}`);
  };

  return (
    <nav className={`${styles.paddingX} w-full fixed top-0 z-20 transition-colors duration-300 ${
        scrolled ? 'bg-primary' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center py-5">
        {/* Logo */}
        <Link to="/" onClick={() => { setActive(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
            <p className="text-white text-[18px] font-bold whitespace-nowrap">
              Ayush Kumar | Full-stack Developer
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden sm:flex flex-row gap-10">
          {navLinks.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={`/#${id}`}
                onClick={handleNavClick(id, title)}
                className={`text-[18px] font-medium cursor-pointer transition-colors duration-200 ${
                  active === title ? 'text-white' : 'text-secondary'
                }`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className="sm:hidden flex items-center">
          <button
            aria-label={toggle ? 'Close menu' : 'Open menu'}
            aria-expanded={toggle}
            onClick={() => setToggle(prev => !prev)}
            className="p-2 focus:outline-none"
          >
            <img src={toggle ? close : menu} alt="menu-icon" className="w-7 h-7 object-contain" />
          </button>
          <div
            ref={menuRef}
            className={`absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl p-6 black-gradient transform transition-all duration-300 ${
              toggle ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map(({ id, title }) => (
                <li key={id}>
                  <button
                    onClick={handleNavClick(id, title)}
                    className={`w-full text-left font-poppins font-medium text-[16px] transition-colors duration-200 ${
                      active === title ? 'text-white' : 'text-secondary'
                    }`}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
