// Every photo and clip on the Explore page, in one place.
// To add one: drop the file in assets/images/explore/<city>/ (or assets/videos/...)
// and add a line below. Captions are shown under each tile and in the lightbox.
// type: "sight" or "food" (shown as a tag on each photo).

const photo = (city, file, caption, type = "sight", badge = "") => ({
  city, kind: "photo", type, badge,
  src: `assets/images/explore/${city}/${file}`,
  caption,
});

const clip = (city, file, caption) => ({
  city, kind: "video", type: "sight", badge: "",
  src: `assets/videos/explore/${city}/${file}`,
  caption,
});

const EXPLORE_ITEMS = [
  // Tokyo
  photo("tokyo", "ramen-1.jpg", "First ramen in Tokyo", "food"),
  photo("tokyo", "izakaya-drinks.jpg", "First night drinks at an izakaya", "food"),
  photo("tokyo", "asakusa-snack.jpg", "Street snack near Senso-ji, Asakusa", "food"),
  photo("tokyo", "asakusa-hozomon-pagoda.jpg", "Senso-ji's Hozomon gate and pagoda"),
  photo("tokyo", "asakusa-hozomon-gate.jpg", "Hozomon gate, busy even in the rain"),
  photo("tokyo", "asakusa-pagoda.jpg", "Five-storey pagoda at Senso-ji"),
  photo("tokyo", "ueno-park-rain.jpg", "Ueno Park on a rainy day"),
  photo("tokyo", "ueno-park-fountain.jpg", "Ueno Park fountain with the museum behind"),
  photo("tokyo", "akihabara-figures.jpg", "Anime figures with price tags, Akihabara"),
  photo("tokyo", "akihabara-street.jpg", "Akihabara street after rain"),
  photo("tokyo", "shibuya-hachiko.jpg", "Hachiko statue, Shibuya"),
  clip("tokyo", "shibuya-crossing.mp4", "Shibuya Scramble Crossing"),
  photo("tokyo", "harry-potter-studio-entrance.jpg", "Entrance to the Harry Potter studio tour"),
  photo("tokyo", "harry-potter-studio-riddle-grave.jpg", "The Riddle grave set at the Harry Potter studio"),
  photo("tokyo", "blue-rabbit-sculpture.jpg", "A geometric blue rabbit on the lawn"),
  clip("tokyo", "harry-potter-studio.mp4", "At the Harry Potter studio"),
  photo("tokyo", "tokyo-station-night.jpg", "Tokyo Station lit up at night"),

  // Hakone
  photo("hakone", "hakone-shrine-torii.jpg", "Torii in Lake Ashi at Hakone Shrine"),
  photo("hakone", "hakone-big-torii.jpg", "Giant torii near Lake Ashi"),
  photo("hakone", "lake-ashi-boat.jpg", "Lake Ashi from the boat"),
  photo("hakone", "owakudani-path.jpg", "Walking up to Owakudani"),
  photo("hakone", "owakudani-steam.jpg", "Steam from the Owakudani valley"),
  photo("hakone", "fuji-above-clouds.jpg", "Fuji's peak above the clouds"),
  photo("hakone", "fuji-roadside.jpg", "Mt Fuji behind a roadside sign"),
  photo("hakone", "fuji-ai-edited.jpg", "Mt Fuji. AI-edited image (my phone added the label)", "sight", "AI-edited"),
  clip("hakone", "hakone-tour.mp4", "A clip from the Hakone tour"),

  // Kamakura
  photo("kamakura", "great-buddha.jpg", "The Great Buddha at Kotoku-in"),
  photo("kamakura", "hase-dera-hall.jpg", "Hase-dera main hall"),

  // Kyoto
  photo("kyoto", "gion-pine-house.jpg", "Pine tree over a teahouse, Gion"),
  photo("kyoto", "gion-lanterns.jpg", "Lanterns on Hanamikoji Street at night"),
  photo("kyoto", "night-street-car.jpg", "A modified car with red underglow on a night street"),
  photo("kyoto", "tofuku-ji-gate-rain.jpg", "Tofuku-ji in the rain"),
  photo("kyoto", "tsuten-kyo-bridge.jpg", "Tsuten-kyo bridge over the green maples"),
  photo("kyoto", "fushimi-inari-shrine.jpg", "Fushimi Inari main shrine in the drizzle"),
  photo("kyoto", "fushimi-inari-torii.jpg", "Torii tunnel at Fushimi Inari"),
  photo("kyoto", "teamlab-mirror-room.jpg", "teamLab Kyoto mirror room"),
  clip("kyoto", "teamlab-1.mp4", "teamLab Kyoto (1 of 2)"),
  clip("kyoto", "teamlab-2.mp4", "teamLab Kyoto (2 of 2)"),

  // Nara
  photo("nara", "nara-deer-rain.jpg", "Deer on a wet Nara street"),
  photo("nara", "todai-ji-lawn.jpg", "Todai-ji from across the lawn"),
  photo("nara", "todai-ji-front.jpg", "Front of the Great Buddha Hall"),
  photo("nara", "todai-ji-guardian.jpg", "Guardian statue behind wire mesh"),
  photo("nara", "todai-ji-kokuzo-bosatsu.jpg", "Kokuzo Bosatsu inside Todai-ji"),

  // Osaka
  photo("osaka", "osaka-castle.jpg", "Osaka Castle"),
  photo("osaka", "osaka-castle-moat.jpg", "The moat and a corner turret"),
  photo("osaka", "dotonbori-glico-sign.jpg", "Glico sign, Dotonbori, Namba"),
  photo("osaka", "kaiyukan-jellyfish.jpg", "Jellyfish at Kaiyukan"),
  photo("osaka", "kaiyukan-penguin.jpg", "Penguin behind wet glass"),
  photo("osaka", "kaiyukan-heron.jpg", "A heron on a rock"),
  clip("osaka", "kaiyukan.mp4", "Inside Kaiyukan"),
  photo("osaka", "tempozan-wheel-view.jpg", "View from the giant wheel, Kaiyukan below"),
  photo("osaka", "tempozan-wheel-night.jpg", "The giant wheel lit up at night"),
];
