function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 group">
      {/* Ícone SVG — barra de chocolate */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform group-hover:-rotate-6"
      >
        {/* Base da barra de chocolate */}
        <rect x="3" y="6" width="30" height="24" rx="4" fill="#92400e" />
        {/* Brilho superior */}
        <rect x="3" y="6" width="30" height="6" rx="4" fill="#b45309" />
        {/* Linhas da divisão da barra — horizontal */}
        <line
          x1="3"
          y1="18"
          x2="33"
          y2="18"
          stroke="#78350f"
          strokeWidth="1.5"
        />
        {/* Linhas da divisão da barra — verticais */}
        <line
          x1="13"
          y1="6"
          x2="13"
          y2="30"
          stroke="#78350f"
          strokeWidth="1.5"
        />
        <line
          x1="23"
          y1="6"
          x2="23"
          y2="30"
          stroke="#78350f"
          strokeWidth="1.5"
        />
        {/* Pequenos brilhos nos quadrantes */}
        <rect
          x="6"
          y="9"
          width="4"
          height="2"
          rx="1"
          fill="#d97706"
          opacity="0.5"
        />
        <rect
          x="16"
          y="9"
          width="4"
          height="2"
          rx="1"
          fill="#d97706"
          opacity="0.5"
        />
        <rect
          x="26"
          y="9"
          width="4"
          height="2"
          rx="1"
          fill="#d97706"
          opacity="0.5"
        />
      </svg>

      {/* Texto da marca */}
      <span className="text-2xl font-extrabold tracking-tight">
        <span className="text-amber-800">Choco</span>
        <span className="text-amber-600">Land</span>
      </span>
    </a>
  );
}

export default Logo;
