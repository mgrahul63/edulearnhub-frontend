import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 py-6 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <img
            src={assets.logo}
            alt="logo"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-gray-300 shadow-sm hover:scale-105 transition-transform duration-200"
          />

          <div className="hidden md:block h-8 w-px bg-gray-300"></div>

          <p className="text-sm text-gray-600 font-light text-center md:text-left">
            © 2024 JKKNIU — All Rights Reserved.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://web.facebook.com/mgrahul639/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={assets.facebook_icon}
                alt="facebook-icon"
                className="w-6 h-6 opacity-80 hover:opacity-100"
              />
            </a>
            <a
              href="https://github.com/mgrahul63/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={assets.github_icon}
                alt="github-icon"
                className="w-6 h-6 opacity-80 hover:opacity-100"
              />
            </a>
            <a
              href="https://www.instagram.com/mgraful639/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={assets.instagram_icon}
                alt="instagram-icon"
                className="w-6 h-6 opacity-80 hover:opacity-100"
              />
            </a>
          </div>

          {/* Developed by text */}
          <p className="text-xs text-gray-500 mt-2 md:mt-0 text-center md:text-right">
            Developed by MG Rahul
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
