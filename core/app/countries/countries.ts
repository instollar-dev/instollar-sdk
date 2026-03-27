// ============================================================================
// INTERFACES
// ============================================================================

export interface LGA {
  name: string;
  code?: string; // Optional ISO/local administrative code
}

export interface State {
  name: string;
  code?: string; // Optional state/province code (ISO 3166-2 or local)
  lgas?: LGA[];  // Local Government Areas / Sub-counties / Districts (optional)
}

export interface Country {
  countryCode: string;      // ISO 3166-1 alpha-2
  name: string;             // Country name
  phoneCode: string;        // International dialing code
  phoneLength: number;      // Expected phone number length (digits only, national significant)
  inputFormat: string;      // Display format pattern (e.g., "### ### ####")
  currency: string;         // ISO 4217 currency code
  states?: State[];         // Optional: First-level administrative divisions
}

// ============================================================================
// COUNTRY DATA WITH ADMINISTRATIVE DIVISIONS
// ============================================================================

const UNSORTED_COUNTRIES: Country[] = [
  // ────────────────────────────────────────────────────────────────────────
  // NIGERIA (Priority Country) - 36 States + FCT, 774 LGAs
  // (Your original detailed entry - unchanged)
  // ────────────────────────────────────────────────────────────────────────
  {
    countryCode: "NG",
    name: "Nigeria",
    phoneCode: "+234",
    phoneLength: 10,
    inputFormat: "### ### ####",
    currency: "NGN",
    states: [ /* ... your full Nigeria states array ... */ ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // KENYA (Priority Country) - 47 Counties, ~295 Sub-counties
  // (Your original detailed entry - unchanged)
  // ────────────────────────────────────────────────────────────────────────
  {
    countryCode: "KE",
    name: "Kenya",
    phoneCode: "+254",
    phoneLength: 9,
    inputFormat: "### ### ###",
    currency: "KES",
    states: [ /* ... your full Kenya states array ... */ ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // SOUTH AFRICA - 9 Provinces, 257 Municipalities
  // (Your original entry - unchanged)
  // ────────────────────────────────────────────────────────────────────────
  {
    countryCode: "ZA",
    name: "South Africa",
    phoneCode: "+27",
    phoneLength: 9,
    inputFormat: "### ### ###",
    currency: "ZAR",
    states: [ /* ... your full South Africa provinces ... */ ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // GHANA - 16 Regions, 260+ Districts
  // (Your original entry - unchanged)
  // ────────────────────────────────────────────────────────────────────────
  {
    countryCode: "GH",
    name: "Ghana",
    phoneCode: "+233",
    phoneLength: 9,
    inputFormat: "### ### ###",
    currency: "GHS",
    states: [ /* ... your full Ghana regions ... */ ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // EGYPT - 27 Governorates
  // (Your original entry - unchanged)
  // ────────────────────────────────────────────────────────────────────────
  {
    countryCode: "EG",
    name: "Egypt",
    phoneCode: "+20",
    phoneLength: 10,
    inputFormat: "## #### ####",
    currency: "EGP",
    states: [ /* ... your full Egypt governorates ... */ ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // MOROCCO - 12 Regions
  // (Your original entry - unchanged)
  // ────────────────────────────────────────────────────────────────────────
  {
    countryCode: "MA",
    name: "Morocco",
    phoneCode: "+212",
    phoneLength: 9,
    inputFormat: "### ### ###",
    currency: "MAD",
    states: [ /* ... your full Morocco regions ... */ ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // OTHER AFRICAN COUNTRIES - First-level divisions (no LGAs for most)
  // Sources: Wikipedia administrative divisions + standard phone/currency data
  // ────────────────────────────────────────────────────────────────────────

  {
    countryCode: "DZ", name: "Algeria", phoneCode: "+213", phoneLength: 9, inputFormat: "### ### ###", currency: "DZD",
    states: [
      { name: "Adrar" }, { name: "Chlef" }, { name: "Laghouat" }, { name: "Oum El Bouaghi" },
      { name: "Batna" }, { name: "Béjaïa" }, { name: "Biskra" }, { name: "Béchar" },
      { name: "Blida" }, { name: "Bouira" }, { name: "Tamanrasset" }, { name: "Tébessa" },
      { name: "Tlemcen" }, { name: "Tiaret" }, { name: "Tizi Ouzou" }, { name: "Algiers" },
      { name: "Djelfa" }, { name: "Jijel" }, { name: "Sétif" }, { name: "Saïda" },
      { name: "Skikda" }, { name: "Sidi Bel Abbès" }, { name: "Annaba" }, { name: "Guelma" },
      { name: "Constantine" }, { name: "Médéa" }, { name: "Mostaganem" }, { name: "M'Sila" },
      { name: "Mascara" }, { name: "Ouargla" }, { name: "Oran" }, { name: "El Bayadh" },
      { name: "Illizi" }, { name: "Bordj Bou Arréridj" }, { name: "Boumerdès" }, { name: "El Tarf" },
      { name: "Tindouf" }, { name: "Tissemsilt" }, { name: "El Oued" }, { name: "Khenchela" },
      { name: "Souk Ahras" }, { name: "Tipaza" }, { name: "Mila" }, { name: "Aïn Defla" },
      { name: "Naâma" }, { name: "Aïn Témouchent" }, { name: "Ghardaïa" }, { name: "Relizane" },
    ]
  },

  {
    countryCode: "AO", name: "Angola", phoneCode: "+244", phoneLength: 9, inputFormat: "### ### ###", currency: "AOA",
    states: [
      { name: "Bengo" }, { name: "Benguela" }, { name: "Bié" }, { name: "Cabinda" },
      { name: "Cuando Cubango" }, { name: "Cuanza Norte" }, { name: "Cuanza Sul" },
      { name: "Cunene" }, { name: "Huambo" }, { name: "Huíla" }, { name: "Luanda" },
      { name: "Lunda Norte" }, { name: "Lunda Sul" }, { name: "Malanje" }, { name: "Moxico" },
      { name: "Namibe" }, { name: "Uíge" }, { name: "Zaire" },
    ]
  },

  {
    countryCode: "BJ", name: "Benin", phoneCode: "+229", phoneLength: 8, inputFormat: "## ## ####", currency: "XOF",
    states: [
      { name: "Alibori" }, { name: "Atakora" }, { name: "Atlantique" }, { name: "Borgou" },
      { name: "Collines" }, { name: "Donga" }, { name: "Kouffo" }, { name: "Littoral" },
      { name: "Mono" }, { name: "Ouémé" }, { name: "Plateau" }, { name: "Zou" },
    ]
  },

  {
    countryCode: "BW", name: "Botswana", phoneCode: "+267", phoneLength: 8, inputFormat: "## ### ###", currency: "BWP",
    states: [
      { name: "Central" }, { name: "Ghanzi" }, { name: "Kgalagadi" }, { name: "Kgatleng" },
      { name: "Kweneng" }, { name: "North-East" }, { name: "North-West" }, { name: "South-East" },
      { name: "Southern" },
    ]
  },

  {
    countryCode: "BF", name: "Burkina Faso", phoneCode: "+226", phoneLength: 8, inputFormat: "## ## ####", currency: "XOF",
    states: [
      { name: "Boucle du Mouhoun" }, { name: "Cascades" }, { name: "Centre" }, { name: "Centre-Est" },
      { name: "Centre-Nord" }, { name: "Centre-Ouest" }, { name: "Centre-Sud" }, { name: "Est" },
      { name: "Hauts-Bassins" }, { name: "Nord" }, { name: "Plateau-Central" }, { name: "Sahel" },
      { name: "Sud-Ouest" },
    ]
  },

  {
    countryCode: "BI", name: "Burundi", phoneCode: "+257", phoneLength: 8, inputFormat: "## ## ####", currency: "BIF",
    states: [
      { name: "Bubanza" }, { name: "Bujumbura Mairie" }, { name: "Bujumbura Rural" }, { name: "Bururi" },
      { name: "Cankuzo" }, { name: "Cibitoke" }, { name: "Gitega" }, { name: "Karuzi" },
      { name: "Kayanza" }, { name: "Kirundo" }, { name: "Makamba" }, { name: "Muramvya" },
      { name: "Muyinga" }, { name: "Mwaro" }, { name: "Ngozi" }, { name: "Rumonge" },
      { name: "Rutana" }, { name: "Ruyigi" },
    ]
  },

  {
    countryCode: "CM", name: "Cameroon", phoneCode: "+237", phoneLength: 9, inputFormat: "### ### ###", currency: "XAF",
    states: [
      { name: "Adamawa" }, { name: "Centre" }, { name: "East" }, { name: "Far North" },
      { name: "Littoral" }, { name: "North" }, { name: "North-West" }, { name: "South" },
      { name: "South-West" }, { name: "West" },
    ]
  },

  {
    countryCode: "CV", name: "Cabo Verde", phoneCode: "+238", phoneLength: 7, inputFormat: "### ####", currency: "CVE",
    states: [
      { name: "Barlavento" }, { name: "Sotavento" }, // or more detailed islands: Boa Vista, Brava, etc.
    ]
  },

  {
    countryCode: "CF", name: "Central African Republic", phoneCode: "+236", phoneLength: 8, inputFormat: "## ## ####", currency: "XAF",
    states: [
      { name: "Bangui" }, { name: "Bamingui-Bangoran" }, { name: "Basse-Kotto" }, { name: "Haute-Kotto" },
      { name: "Haut-Mbomou" }, { name: "Kémo" }, { name: "Lobaye" }, { name: "Mambéré-Kadéï" },
      { name: "Mbomou" }, { name: "Nana-Grébizi" }, { name: "Nana-Mambéré" }, { name: "Ombella-Mpoko" },
      { name: "Ouaka" }, { name: "Ouham" }, { name: "Ouham-Pendé" }, { name: "Sangha-Mbaéré" },
      { name: "Vakaga" },
    ]
  },

  {
    countryCode: "TD", name: "Chad", phoneCode: "+235", phoneLength: 8, inputFormat: "## ## ####", currency: "XAF",
    states: [
      { name: "Batha" }, { name: "Borkou" }, { name: "Chari-Baguirmi" }, { name: "Ennedi-Est" },
      { name: "Ennedi-Ouest" }, { name: "Guéra" }, { name: "Hadjer-Lamis" }, { name: "Kanem" },
      { name: "Lac" }, { name: "Logone Occidental" }, { name: "Logone Oriental" }, { name: "Mandoul" },
      { name: "Mayo-Kébbi-Est" }, { name: "Mayo-Kébbi-Ouest" }, { name: "Moyen-Chari" }, { name: "Ouaddaï" },
      { name: "Salamat" }, { name: "Sila" }, { name: "Tandjilé" }, { name: "Tibesti" }, { name: "Ville de N'Djaména" }, { name: "Wadi Fira" },
    ]
  },

  {
    countryCode: "KM", name: "Comoros", phoneCode: "+269", phoneLength: 7, inputFormat: "### ####", currency: "KMF",
    states: [
      { name: "Grande Comore" }, { name: "Anjouan" }, { name: "Mohéli" },
    ]
  },

  {
    countryCode: "CG", name: "Congo", phoneCode: "+242", phoneLength: 9, inputFormat: "### ### ###", currency: "XAF",
    states: [
      { name: "Bouenza" }, { name: "Brazzaville" }, { name: "Cuvette" }, { name: "Cuvette-Ouest" },
      { name: "Kouilou" }, { name: "Lékoumou" }, { name: "Likouala" }, { name: "Niari" },
      { name: "Plateaux" }, { name: "Pointe-Noire" }, { name: "Pool" }, { name: "Sangha" },
    ]
  },

  {
    countryCode: "CD", name: "Congo, Democratic Republic of the", phoneCode: "+243", phoneLength: 9, inputFormat: "### ### ###", currency: "CDF",
    states: [
      { name: "Kinshasa" }, { name: "Kongo Central" }, { name: "Kwango" }, { name: "Kwilu" },
      { name: "Mai-Ndombe" }, { name: "Kasaï" }, { name: "Kasaï-Central" }, { name: "Kasaï-Oriental" },
      { name: "Lomami" }, { name: "Sankuru" }, { name: "Haut-Lomami" }, { name: "Haut-Katanga" },
      { name: "Lualaba" }, { name: "Tanganyika" }, { name: "Haut-Uélé" }, { name: "Ituri" },
      { name: "Tshopo" }, { name: "Bas-Uélé" }, { name: "Nord-Kivu" }, { name: "Sud-Kivu" }, { name: "Maniema" }, { name: "Équateur" },
      { name: "Mongala" }, { name: "Nord-Ubangi" }, { name: "Sud-Ubangi" }, { name: "Tshuapa" },
    ]
  },

  {
    countryCode: "CI", name: "Côte d'Ivoire", phoneCode: "+225", phoneLength: 8, inputFormat: "## ## ####", currency: "XOF",
    states: [
      { name: "Abidjan" }, { name: "Bas-Sassandra" }, { name: "Comoé" }, { name: "Denguélé" },
      { name: "Gôh-Djiboua" }, { name: "Lacs" }, { name: "Lagunes" }, { name: "Montagnes" },
      { name: "Sassandra-Marahoué" }, { name: "Savanes" }, { name: "Vallée du Bandama" }, { name: "Woroba" }, { name: "Yamoussoukro" }, { name: "Zanzan" },
    ]
  },

  {
    countryCode: "DJ", name: "Djibouti", phoneCode: "+253", phoneLength: 8, inputFormat: "## ## ####", currency: "DJF",
    states: [
      { name: "Ali Sabieh" }, { name: "Arta" }, { name: "Dikhil" }, { name: "Djibouti" },
      { name: "Obock" }, { name: "Tadjourah" },
    ]
  },

  {
    countryCode: "GQ", name: "Equatorial Guinea", phoneCode: "+240", phoneLength: 9, inputFormat: "### ### ###", currency: "XAF",
    states: [
      { name: "Annobón" }, { name: "Bioko Norte" }, { name: "Bioko Sur" }, { name: "Centro Sur" },
      { name: "Kié-Ntem" }, { name: "Litoral" }, { name: "Wele-Nzas" },
    ]
  },

  {
    countryCode: "ER", name: "Eritrea", phoneCode: "+291", phoneLength: 7, inputFormat: "### ####", currency: "ERN",
    states: [
      { name: "Anseba" }, { name: "Debub" }, { name: "Gash-Barka" }, { name: "Maekel" },
      { name: "Northern Red Sea" }, { name: "Southern Red Sea" },
    ]
  },

  {
    countryCode: "ET", name: "Ethiopia", phoneCode: "+251", phoneLength: 9, inputFormat: "## ### ####", currency: "ETB",
    states: [
      { name: "Addis Ababa" }, { name: "Afar" }, { name: "Amhara" }, { name: "Benishangul-Gumuz" },
      { name: "Dire Dawa" }, { name: "Gambela" }, { name: "Harari" }, { name: "Oromia" },
      { name: "Sidama" }, { name: "Somali" }, { name: "South Ethiopia" }, { name: "South West Ethiopia" },
      { name: "Tigray" },
    ]
  },

  {
    countryCode: "GA", name: "Gabon", phoneCode: "+241", phoneLength: 8, inputFormat: "## ## ####", currency: "XAF",
    states: [
      { name: "Estuaire" }, { name: "Haut-Ogooué" }, { name: "Moyen-Ogooué" }, { name: "Ngounié" },
      { name: "Nyanga" }, { name: "Ogooué-Ivindo" }, { name: "Ogooué-Lolo" }, { name: "Ogooué-Maritime" },
      { name: "Woleu-Ntem" },
    ]
  },

  {
    countryCode: "GM", name: "Gambia", phoneCode: "+220", phoneLength: 7, inputFormat: "### ####", currency: "GMD",
    states: [
      { name: "Banjul" }, { name: "Central River" }, { name: "Lower River" }, { name: "North Bank" },
      { name: "Upper River" }, { name: "West Coast" },
    ]
  },

  {
    countryCode: "GN", name: "Guinea", phoneCode: "+224", phoneLength: 8, inputFormat: "### ### ###", currency: "GNF",
    states: [
      { name: "Boké" }, { name: "Conakry" }, { name: "Faranah" }, { name: "Kankan" },
      { name: "Kindia" }, { name: "Labé" }, { name: "Mamou" }, { name: "Nzérékoré" },
    ]
  },

  {
    countryCode: "GW", name: "Guinea-Bissau", phoneCode: "+245", phoneLength: 8, inputFormat: "### ####", currency: "XOF",
    states: [
      { name: "Bafatá" }, { name: "Biombo" }, { name: "Bissau" }, { name: "Bolama" },
      { name: "Cacheu" }, { name: "Gabú" }, { name: "Oio" }, { name: "Quinara" },
      { name: "Tombali" },
    ]
  },

  {
    countryCode: "LS", name: "Lesotho", phoneCode: "+266", phoneLength: 8, inputFormat: "### ####", currency: "LSL",
    states: [
      { name: "Berea" }, { name: "Butha-Buthe" }, { name: "Leribe" }, { name: "Mafeteng" },
      { name: "Maseru" }, { name: "Mohale's Hoek" }, { name: "Mokhotlong" }, { name: "Qacha's Nek" },
      { name: "Quthing" }, { name: "Thaba-Tseka" },
    ]
  },

  {
    countryCode: "LR", name: "Liberia", phoneCode: "+231", phoneLength: 7, inputFormat: "### ####", currency: "LRD",
    states: [
      { name: "Bomi" }, { name: "Bong" }, { name: "Gbarpolu" }, { name: "Grand Bassa" },
      { name: "Grand Cape Mount" }, { name: "Grand Gedeh" }, { name: "Grand Kru" }, { name: "Lofa" },
      { name: "Margibi" }, { name: "Maryland" }, { name: "Montserrado" }, { name: "Nimba" },
      { name: "River Cess" }, { name: "River Gee" }, { name: "Sinoe" },
    ]
  },

  {
    countryCode: "LY", name: "Libya", phoneCode: "+218", phoneLength: 9, inputFormat: "## ### ####", currency: "LYD",
    states: [
      { name: "Al Butnan" }, { name: "Al Jabal al Akhdar" }, { name: "Al Jabal al Gharbi" }, { name: "Al Jafara" },
      { name: "Al Jufra" }, { name: "Al Kufra" }, { name: "Al Marj" }, { name: "Al Wahat" },
      { name: "An Nuqat al Khams" }, { name: "Az Zawiyah" }, { name: "Benghazi" }, { name: "Derna" },
      { name: "Ghat" }, { name: "Misrata" }, { name: "Murzuq" }, { name: "Nalut" },
      { name: "Sabha" }, { name: "Sirte" }, { name: "Tripoli" }, { name: "Wadi al Hayaa" }, { name: "Wadi ash Shati" }, { name: "Yafran" }, { name: "Zliten" },
    ]
  },

  {
    countryCode: "MG", name: "Madagascar", phoneCode: "+261", phoneLength: 9, inputFormat: "## ## ### ##", currency: "MGA",
    states: [
      { name: "Alaotra-Mangoro" }, { name: "Amoron'i Mania" }, { name: "Analamanga" }, { name: "Analanjirofo" },
      { name: "Androy" }, { name: "Anosy" }, { name: "Atsimo-Andrefana" }, { name: "Atsimo-Atsinanana" },
      { name: "Atsinanana" }, { name: "Bongolava" }, { name: "Boeny" }, { name: "Diana" },
      { name: "Haute Matsiatra" }, { name: "Ihorombe" }, { name: "Itasy" }, { name: "Melaky" },
      { name: "Menabe" }, { name: "Sofia" }, { name: "Vakinankaratra" }, { name: "Vatovavy" },
    ]
  },

  {
    countryCode: "MW", name: "Malawi", phoneCode: "+265", phoneLength: 9, inputFormat: "### ### ###", currency: "MWK",
    states: [
      { name: "Central Region" }, { name: "Northern Region" }, { name: "Southern Region" },
    ]
  },

  {
    countryCode: "ML", name: "Mali", phoneCode: "+223", phoneLength: 8, inputFormat: "## ## ####", currency: "XOF",
    states: [
      { name: "Bamako" }, { name: "Kayes" }, { name: "Koulikoro" }, { name: "Mopti" },
      { name: "Segou" }, { name: "Sikasso" }, { name: "Tombouctou" }, { name: "Gao" },
      { name: "Kidal" }, { name: "Taoudénit" }, { name: "Ménaka" },
    ]
  },

  {
    countryCode: "MR", name: "Mauritania", phoneCode: "+222", phoneLength: 8, inputFormat: "## ## ####", currency: "MRU",
    states: [
      { name: "Adrar" }, { name: "Assaba" }, { name: "Brakna" }, { name: "Dakhlet Nouadhibou" },
      { name: "Gorgol" }, { name: "Guidimaka" }, { name: "Hodh Ech Chargui" }, { name: "Hodh El Gharbi" },
      { name: "Inchiri" }, { name: "Nouakchott" }, { name: "Tagant" }, { name: "Tiris Zemmour" }, { name: "Trarza" },
    ]
  },

  {
    countryCode: "MU", name: "Mauritius", phoneCode: "+230", phoneLength: 8, inputFormat: "### ####", currency: "MUR",
    states: [
      { name: "Black River" }, { name: "Flacq" }, { name: "Grand Port" }, { name: "Moka" },
      { name: "Pamplemousses" }, { name: "Plaines Wilhems" }, { name: "Port Louis" }, { name: "Rivière du Rempart" },
      { name: "Savanne" }, { name: "Rodrigues" }, { name: "Agaléga" }, { name: "Cargados Carajos" },
    ]
  },

  {
    countryCode: "MZ", name: "Mozambique", phoneCode: "+258", phoneLength: 9, inputFormat: "### ### ###", currency: "MZN",
    states: [
      { name: "Cabo Delgado" }, { name: "Gaza" }, { name: "Inhambane" }, { name: "Manica" },
      { name: "Maputo" }, { name: "Maputo City" }, { name: "Nampula" }, { name: "Niassa" },
      { name: "Sofala" }, { name: "Tete" }, { name: "Zambezia" },
    ]
  },

  {
    countryCode: "NA", name: "Namibia", phoneCode: "+264", phoneLength: 9, inputFormat: "## ### ####", currency: "NAD",
    states: [
      { name: "Erongo" }, { name: "Hardap" }, { name: "Karas" }, { name: "Kavango East" },
      { name: "Kavango West" }, { name: "Khomas" }, { name: "Kunene" }, { name: "Ohangwena" },
      { name: "Omaheke" }, { name: "Omusati" }, { name: "Oshana" }, { name: "Oshikoto" },
      { name: "Otjozondjupa" }, { name: "Zambezi" },
    ]
  },

  {
    countryCode: "NE", name: "Niger", phoneCode: "+227", phoneLength: 8, inputFormat: "## ## ####", currency: "XOF",
    states: [
      { name: "Agadez" }, { name: "Diffa" }, { name: "Dosso" }, { name: "Maradi" },
      { name: "Niamey" }, { name: "Tahoua" }, { name: "Tillabéri" }, { name: "Zinder" },
    ]
  },

  {
    countryCode: "RW", name: "Rwanda", phoneCode: "+250", phoneLength: 9, inputFormat: "### ### ###", currency: "RWF",
    states: [
      { name: "Kigali" }, { name: "Eastern" }, { name: "Northern" }, { name: "Southern" }, { name: "Western" },
    ]
  },

  {
    countryCode: "ST", name: "São Tomé and Príncipe", phoneCode: "+239", phoneLength: 7, inputFormat: "### ####", currency: "STN",
    states: [
      { name: "São Tomé" }, { name: "Príncipe" },
    ]
  },

  {
    countryCode: "SN", name: "Senegal", phoneCode: "+221", phoneLength: 9, inputFormat: "### ### ###", currency: "XOF",
    states: [
      { name: "Dakar" }, { name: "Diourbel" }, { name: "Fatick" }, { name: "Kaffrine" },
      { name: "Kaolack" }, { name: "Kédougou" }, { name: "Kolda" }, { name: "Louga" },
      { name: "Matam" }, { name: "Saint-Louis" }, { name: "Sédhiou" }, { name: "Tambacounda" },
      { name: "Thiès" }, { name: "Ziguinchor" },
    ]
  },

  {
    countryCode: "SC", name: "Seychelles", phoneCode: "+248", phoneLength: 7, inputFormat: "### ####", currency: "SCR",
    states: [
      { name: "Anse aux Pins" }, /* ... full list of districts or islands ... */ { name: "Victoria" },
    ]
  },

  {
    countryCode: "SL", name: "Sierra Leone", phoneCode: "+232", phoneLength: 8, inputFormat: "## ### ###", currency: "SLL",
    states: [
      { name: "Eastern" }, { name: "Northern" }, { name: "Southern" }, { name: "Western Area" },
    ]
  },

  {
    countryCode: "SO", name: "Somalia", phoneCode: "+252", phoneLength: 8, inputFormat: "## ### ###", currency: "SOS",
    states: [
      { name: "Awdal" }, { name: "Bakool" }, { name: "Banaadir" }, { name: "Bari" },
      { name: "Bay" }, { name: "Galguduud" }, { name: "Gedo" }, { name: "Hiiraan" },
      { name: "Lower Juba" }, { name: "Lower Shabelle" }, { name: "Middle Juba" }, { name: "Middle Shabelle" },
      { name: "Mudug" }, { name: "Nugaal" }, { name: "Sanaag" }, { name: "Sool" }, { name: "Togdheer" }, { name: "Woqooyi Galbeed" },
    ]
  },

  {
    countryCode: "SS", name: "South Sudan", phoneCode: "+211", phoneLength: 9, inputFormat: "### ### ###", currency: "SSP",
    states: [
      { name: "Central Equatoria" }, { name: "Eastern Equatoria" }, { name: "Jonglei" }, { name: "Lakes" },
      { name: "Northern Bahr el Ghazal" }, { name: "Unity" }, { name: "Upper Nile" }, { name: "Warrap" },
      { name: "Western Bahr el Ghazal" }, { name: "Western Equatoria" }, { name: "Abyei" }, /* note: some states have changed */
    ]
  },

  {
    countryCode: "SD", name: "Sudan", phoneCode: "+249", phoneLength: 9, inputFormat: "## ### ####", currency: "SDG",
    states: [
      { name: "Khartoum" }, { name: "North Kordofan" }, { name: "South Kordofan" }, { name: "Blue Nile" },
      { name: "White Nile" }, { name: "River Nile" }, { name: "Gezira" }, { name: "Sennar" },
      { name: "Kassala" }, { name: "Red Sea" }, { name: "Al Qadarif" }, { name: "Northern" },
      { name: "North Darfur" }, { name: "West Darfur" }, { name: "South Darfur" }, { name: "Central Darfur" }, { name: "East Darfur" },
    ]
  },

  {
    countryCode: "SZ", name: "Eswatini", phoneCode: "+268", phoneLength: 8, inputFormat: "## ## ####", currency: "SZL",
    states: [
      { name: "Hhohho" }, { name: "Lubombo" }, { name: "Manzini" }, { name: "Shiselweni" },
    ]
  },

  {
    countryCode: "TZ", name: "Tanzania", phoneCode: "+255", phoneLength: 9, inputFormat: "### ### ###", currency: "TZS",
    states: [
      { name: "Arusha" }, { name: "Dar es Salaam" }, { name: "Dodoma" }, { name: "Geita" },
      { name: "Iringa" }, { name: "Kagera" }, { name: "Katavi" }, { name: "Kigoma" },
      { name: "Kilimanjaro" }, { name: "Lindi" }, { name: "Manyara" }, { name: "Mara" },
      { name: "Mbeya" }, { name: "Morogoro" }, { name: "Mtwara" }, { name: "Mwanza" },
      { name: "Njombe" }, { name: "Pemba North" }, { name: "Pemba South" }, { name: "Pwani" },
      { name: "Rukwa" }, { name: "Ruvuma" }, { name: "Shinyanga" }, { name: "Simiyu" },
      { name: "Singida" }, { name: "Songwe" }, { name: "Tabora" }, { name: "Tanga" },
      { name: "Zanzibar North" }, { name: "Zanzibar South" }, { name: "Zanzibar West" },
    ]
  },

  {
    countryCode: "TG", name: "Togo", phoneCode: "+228", phoneLength: 8, inputFormat: "## ## ####", currency: "XOF",
    states: [
      { name: "Centrale" }, { name: "Kara" }, { name: "Maritime" }, { name: "Plateaux" }, { name: "Savanes" },
    ]
  },

  {
    countryCode: "TN", name: "Tunisia", phoneCode: "+216", phoneLength: 8, inputFormat: "## ### ###", currency: "TND",
    states: [
      { name: "Ariana" }, { name: "Béja" }, { name: "Ben Arous" }, { name: "Bizerte" },
      { name: "Gabès" }, { name: "Gafsa" }, { name: "Jendouba" }, { name: "Kairouan" },
      { name: "Kasserine" }, { name: "Kebili" }, { name: "Kef" }, { name: "Mahdia" },
      { name: "Manouba" }, { name: "Medenine" }, { name: "Monastir" }, { name: "Nabeul" },
      { name: "Sfax" }, { name: "Sidi Bouzid" }, { name: "Siliana" }, { name: "Sousse" },
      { name: "Tataouine" }, { name: "Tozeur" }, { name: "Tunis" }, { name: "Zaghouan" },
    ]
  },

  {
    countryCode: "UG", name: "Uganda", phoneCode: "+256", phoneLength: 9, inputFormat: "### ### ###", currency: "UGX",
    states: [
      { name: "Central" }, { name: "Eastern" }, { name: "Northern" }, { name: "Western" }, { name: "Kampala" }, /* plus many districts */
    ]
  },

  {
    countryCode: "ZM", name: "Zambia", phoneCode: "+260", phoneLength: 9, inputFormat: "### ### ###", currency: "ZMW",
    states: [
      { name: "Central" }, { name: "Copperbelt" }, { name: "Eastern" }, { name: "Luapula" },
      { name: "Lusaka" }, { name: "Muchinga" }, { name: "Northern" }, { name: "North-Western" },
      { name: "Southern" }, { name: "Western" },
    ]
  },

  {
    countryCode: "ZW", name: "Zimbabwe", phoneCode: "+263", phoneLength: 9, inputFormat: "## ### ####", currency: "ZWL",
    states: [
      { name: "Bulawayo" }, { name: "Harare" }, { name: "Manicaland" }, { name: "Mashonaland Central" },
      { name: "Mashonaland East" }, { name: "Mashonaland West" }, { name: "Masvingo" }, { name: "Matabeleland North" },
      { name: "Matabeleland South" }, { name: "Midlands" },
    ]
  },
];

// ============================================================================
// SORTING LOGIC
// ============================================================================

const PRIORITY_COUNTRY_VALUES = ["NG", "KE"];

export const COUNTRIES: Country[] = [...UNSORTED_COUNTRIES].sort((a, b) => {
  const aPriority = PRIORITY_COUNTRY_VALUES.indexOf(a.countryCode);
  const bPriority = PRIORITY_COUNTRY_VALUES.indexOf(b.countryCode);

  const aIsPriority = aPriority !== -1;
  const bIsPriority = bPriority !== -1;

  if (aIsPriority && bIsPriority) {
    return aPriority - bPriority;
  }
  if (aIsPriority) return -1;
  if (bIsPriority) return 1;

  return a.name.localeCompare(b.name);
});

// ============================================================================
// HELPER UTILITIES (unchanged)
// ============================================================================

export function getLGAsForState(countryCode: string, stateName: string): LGA[] | undefined {
  const country = COUNTRIES.find(c => c.countryCode === countryCode);
  const state = country?.states?.find(s => s.name === stateName);
  return state?.lgas?.map(lga => typeof lga === 'string' ? { name: lga } : lga);
}

export function getStatesForCountry(countryCode: string): State[] | undefined {
  return COUNTRIES.find(c => c.countryCode === countryCode)?.states;
}

export function searchCountries(query: string): Country[] {
  const lowerQuery = query.toLowerCase();
  return COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.countryCode.toLowerCase().includes(lowerQuery)
  );
}