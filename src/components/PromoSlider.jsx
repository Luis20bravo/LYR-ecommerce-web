import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PromoSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const promos = [
    {
      id: 1,
      title: "¡MEGA OFERTA ABSORBENTES!",
      subtitle: "Hasta 35% OFF en toda la línea",
      description: "Absorbentes universales, químicos y para hidrocarburos",
      discount: "35% OFF",
      validUntil: "31 Diciembre 2025",
      gradient: "from-blue-600 to-blue-800",
      icon: "🛡️"
    },
    {
      id: 2,
      title: "EPP PREMIUM",
      subtitle: "Equipos de protección certificados",
      description: "Cascos, guantes, mascarillas y trajes de seguridad",
      discount: "25% OFF",
      validUntil: "15 Enero 2026",
      gradient: "from-orange-500 to-red-600",
      icon: "⛑️"
    },
    {
      id: 3,
      title: "LIMPIEZA INDUSTRIAL",
      subtitle: "Productos de alta efectividad",
      description: "Desengrasantes, detergentes y equipos de limpieza",
      discount: "20% OFF",
      validUntil: "28 Febrero 2026",
      gradient: "from-green-500 to-emerald-600",
      icon: "🧽"
    },
    {
      id: 4,
      title: "CONTENCIÓN TOTAL",
      subtitle: "Sistemas anti-derrames",
      description: "Barreras, diques y kits de emergencia completos",
      discount: "30% OFF",
      validUntil: "10 Marzo 2026",
      gradient: "from-purple-600 to-indigo-700",
      icon: "🚧"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Slider {...settings}>
        {promos.map((promo) => (
          <div key={promo.id} className="px-2">
            <div className={`bg-gradient-to-r ${promo.gradient} rounded-xl shadow-2xl overflow-hidden h-[400px] relative`}>
              {/* Patrón de fondo decorativo */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 text-8xl">{promo.icon}</div>
                <div className="absolute bottom-10 right-10 text-6xl opacity-50">{promo.icon}</div>
              </div>
              
              {/* Badge de descuento */}
              <div className="absolute top-6 right-6 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-lg shadow-lg transform rotate-12">
                {promo.discount}
              </div>

              {/* Contenido principal */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-8">
                <div className="mb-4 text-6xl">{promo.icon}</div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {promo.title}
                </h2>
                
                <h3 className="text-xl md:text-2xl font-semibold mb-4 opacity-90">
                  {promo.subtitle}
                </h3>
                
                <p className="text-lg md:text-xl mb-6 opacity-80 max-w-2xl">
                  {promo.description}
                </p>

                {/* Botón de acción */}
                <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg mb-4">
                  ¡APROVECHAR OFERTA!
                </button>

                {/* Validez */}
                <p className="text-sm opacity-75">
                  ⏰ Válido hasta: {promo.validUntil}
                </p>
              </div>

              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 transform -skew-x-12 transition-all duration-1000"></div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Indicador de más ofertas */}
      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm font-medium">
          🔥 ¡4 ofertas increíbles te están esperando! 🔥
        </p>
      </div>
    </div>
  );
}