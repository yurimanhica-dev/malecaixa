const Testimonials = () => {
  // Depoimentos de clientes
  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      role: "Pequena Empresária",
      content:
        "A MALECaixa transformou meu negócio! Com o microcrédito que obtive, pude expandir minha loja de artesanato e hoje empregro 3 pessoas na minha comunidade.",
      rating: 5,
      avatar: "/avatars/maria-silva.jpg", // Substitua pelo caminho real
    },
    {
      id: 2,
      name: "João Mendes",
      role: "Agricultor",
      content:
        "Depois de 25 anos no mercado, a MALECaixa continua sendo a mais confiável. Me ajudaram nos momentos mais difíceis da minha lavoura com condições justas.",
      rating: 4,
      avatar: "/avatars/joao-mendes.jpg",
    },
    {
      id: 3,
      name: "Ana Oliveira",
      role: "Costureira",
      content:
        "O processo foi tão simples que pensei que era bom demais para ser verdade. Em 48 horas tinha o crédito aprovado para comprar novas máquinas. Recomendo!",
      rating: 5,
      avatar: "/avatars/ana-oliveira.jpg",
    },
  ];

  // Renderizar estrelas de avaliação
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Mais de 250.000 histórias de sucesso em 25 anos de experiência
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-900/5"
            >
              <div>
                {renderStars(testimonial.rating)}
                <p className="mt-6 text-lg leading-7 text-gray-600">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="mt-8 flex items-center gap-x-4">
                <img
                  className="h-12 w-12 rounded-full bg-gray-50"
                  src={testimonial.avatar}
                  alt={`Foto de ${testimonial.name}`}
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de confiança/marcas (opcional) */}
        <div className="mt-24">
          <h3 className="text-center text-sm font-semibold leading-6 text-gray-600">
            Confiado por instituições financeiras líderes
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            {[
              { name: "Banco Central", logo: "/logos/banco-central.svg" },
              { name: "APB", logo: "/logos/apb.svg" },
              { name: "IMF", logo: "/logos/imf.svg" },
              { name: "World Bank", logo: "/logos/world-bank.svg" },
              { name: "UE", logo: "/logos/ue.svg" },
            ].map((company) => (
              <img
                key={company.name}
                className="col-span-1 max-h-12 w-full object-contain grayscale hover:grayscale-0 transition-all"
                src={company.logo}
                alt={company.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
