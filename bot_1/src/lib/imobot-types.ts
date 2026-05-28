export type Agent = {
  id: string;
  name: string;
  whatsapp_bot_number: string;
  email: string | null;
  status: string | null;
  google_calendar_id: string | null;
  evolution_api_key: string | null;
  evolution_api_url: string | null;
  created_at: string;
};

export type Property = {
  id: string;
  agent_id: string | null;
  title: string;
  location: string | null;
  price: number | null;
  property_type: string | null;
  contract_type: string | null;
  url_anuncio: string | null;
  link_remax: string | null;
  image_url: string | null;
  created_at: string;
};

export type Lead = {
  whatsapp: string;
  name: string | null;
  status: string;
  objective: string;
  property_type: string | null;
  budget: number | null;
  agent_id: string | null;
  summary: string;
  created_at: string;
};
