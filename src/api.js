const fallback = {
  shop: {
    name: "Vila do Cavaleiro Barbearia",
    phone: "(62) 99421-9965",
    whatsapp: "5562994219965",
    instagram: "heryque_barbeiroo",
    address: "R. R-10, Quadra 4 lote 11, Lot. Porto das Pedras, Aparecida de Goiânia-GO",
    rating: 5.0,
    reviewCount: 7
  },
  services: [
    {
      id: "corte",
      name: "Corte de cabelo",
      duration: 30,
      price: 45,
      description: "Corte moderno alinhado ao seu estilo, com finalizacao precisa.",
      image: "/img/corte.png"
    },
    {
      id: "navalha",
      name: "Corte com navalha",
      duration: 60,
      price: 60,
      description: "Acabamento classico na navalha, contornos nitidos e visual premium.",
      image: "/img/navalha.png"
    },
    {
      id: "social",
      name: "Corte social",
      duration: 30,
      price: 40,
      description: "Corte limpo e elegante para o dia a dia, reunioes e ocasioes.",
      image: "/img/social.png"
    }
  ],
  barbers: [
    {
      id: "heryque",
      name: "Heryque",
      role: "Mestre barbeiro",
      bio: "Frente da Vila do Cavaleiro. Tecnica, estilo e atendimento de casa.",
      image: "/img/heryque.png"
    },
    {
      id: "rafael",
      name: "Rafael",
      role: "Barbeiro",
      bio: "Cortes sociais e degradas com acabamento alinhado ao padrao da casa.",
      image: "/img/rafael.png"
    }
  ],
  reviews: [
    { id: "r1", name: "Lucas Andrade", rating: 5, text: "Melhor corte que ja fiz em Aparecida. Atendimento de cavaleiro de verdade." },
    { id: "r2", name: "Bruno Ferreira", rating: 5, text: "Navalha impecavel. Sai da cadeira outro homem. Recomendo demais." },
    { id: "r3", name: "Thiago Mendes", rating: 5, text: "Ambiente top, pontualidade e acabamento fino. Virou minha barbearia." },
    { id: "r4", name: "Pedro Henrique", rating: 5, text: "Heryque entende o que voce quer so de olhar. Corte social perfeito." },
    { id: "r5", name: "Rafael Souza", rating: 5, text: "Cinco estrelas sem pensar. Preco justo e resultado de revista." },
    { id: "r6", name: "Gabriel Lima", rating: 5, text: "Fui indicado por um amigo e agora eu que indico. Excelente." },
    { id: "r7", name: "Matheus Oliveira", rating: 5, text: "Do agendamento ao cafezinho, tudo no nivel. Voltarei sempre." }
  ]
};

const serviceImages = {
  corte: "/img/corte.png",
  navalha: "/img/navalha.png",
  social: "/img/social.png"
};

const barberImages = {
  heryque: "/img/heryque.png",
  rafael: "/img/rafael.png"
};

function addMissingImages(items, images) {
  return items.map((item) => ({
    ...item,
    image: images[item.id] || item.image
  }));
}

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("fail");
  return res.json();
}

export async function loadCatalog() {
  try {
    const [shop, services, barbers, reviewData] = await Promise.all([
      getJson("/api/shop"),
      getJson("/api/services"),
      getJson("/api/barbers"),
      getJson("/api/reviews")
    ]);
    return {
      shop,
      services: addMissingImages(services, serviceImages),
      barbers: addMissingImages(barbers, barberImages),
      reviews: reviewData.items || fallback.reviews,
      rating: reviewData.rating ?? shop.rating,
      reviewCount: reviewData.count ?? shop.reviewCount
    };
  } catch {
    return {
      ...fallback,
      rating: fallback.shop.rating,
      reviewCount: fallback.shop.reviewCount
    };
  }
}

export async function getAvailability(params) {
  const q = new URLSearchParams(params);
  const res = await fetch(`/api/availability?${q}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Falha ao carregar horarios");
  return data;
}

export async function createAppointment(payload) {
  const res = await fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Nao foi possivel confirmar");
  return data;
}
