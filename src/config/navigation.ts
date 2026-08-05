export interface Subcategory {
  name: string;
  href: string;
}

export interface Category {
  name: string;
  href: string;
  subcategories?: Subcategory[];
}

export const CATEGORIES: Category[] = [
  {
    name: "Incense",
    href: "/incense",
    subcategories: [
      { name: "Tibetan Incense", href: "/incense/tibetan" },
      { name: "Bhutanese Incense", href: "/incense/bhutanese" },
      { name: "Japanese Incense", href: "/incense/japanese" },
      { name: "Raw Powder Incense", href: "/incense/raw-powder" },
      { name: "Himalayan Incense Sticks", href: "/incense/himalayan-sticks" },
      { name: "Cone Incense", href: "/incense/cone" },
      { name: "Rope Incense", href: "/incense/rope" },
      { name: "Flora Incense Sticks", href: "/incense/flora" },
      { name: "Incense Gift Set", href: "/incense/gift-set" },
      { name: "Incense Burner", href: "/incense/burner" },
    ],
  },
  {
    name: "Prayer Flags",
    href: "/prayer-flags",
    subcategories: [
      { name: "Tibetan Prayer Flags", href: "/prayer-flags/tibetan" },
      { name: "Nepali Prayer Flags", href: "/prayer-flags/nepali" },
      { name: "Windhorse Flags", href: "/prayer-flags/windhorse" },
    ],
  },
  {
    name: "Statues",
    href: "/statues",
    subcategories: [
      { name: "Buddha Statues", href: "/statues/buddha" },
      { name: "Bodhisattva Statues", href: "/statues/bodhisattva" },
      { name: "Tara Statues", href: "/statues/tara" },
      { name: "Monk Statues", href: "/statues/monk" },
    ],
  },
  {
    name: "Thangka",
    href: "/thangka",
    subcategories: [
      { name: "Buddha Thangka", href: "/thangka/buddha" },
      { name: "Mandala Thangka", href: "/thangka/mandala" },
      { name: "Wheel of Life Thangka", href: "/thangka/wheel-of-life" },
    ],
  },
  {
    name: "Sound Healing",
    href: "/sound-healing",
    subcategories: [
      { name: "Singing Bowls", href: "/sound-healing/singing-bowls" },
      { name: "Tingsha Bells", href: "/sound-healing/tingsha" },
      { name: "Gongs", href: "/sound-healing/gongs" },
    ],
  },
  {
    name: "Ritual Items",
    href: "/ritual-items",
    subcategories: [
      { name: "Mala Beads", href: "/ritual-items/mala" },
      { name: "Prayer Wheels", href: "/ritual-items/prayer-wheels" },
      { name: "Offerings", href: "/ritual-items/offerings" },
    ],
  },
  {
    name: "Home & Living",
    href: "/home-living",
    subcategories: [
      { name: "Cushions", href: "/home-living/cushions" },
      { name: "Wall Hangings", href: "/home-living/wall-hangings" },
      { name: "Rugs", href: "/home-living/rugs" },
    ],
  },
  {
    name: "Wellness",
    href: "/wellness",
    subcategories: [
      { name: "Herbal Teas", href: "/wellness/teas" },
      { name: "Essential Oils", href: "/wellness/oils" },
      { name: "Herbal Remedies", href: "/wellness/remedies" },
    ],
  },
  {
    name: "Clothing",
    href: "/clothing",
    subcategories: [
      { name: "Tibetan Jewelry", href: "/clothing/jewelry" },
      { name: "Scarves", href: "/clothing/scarves" },
      { name: "Hats", href: "/clothing/hats" },
    ],
  },
  {
    name: "Jewelry",
    href: "/jewelry",
    subcategories: [
      { name: "Beaded Jewelry", href: "/jewelry/beaded" },
      { name: "Pearl Jewelry", href: "/jewelry/pearl" },
      { name: "Zodiac Jewelry", href: "/jewelry/zodiac" },
      { name: "Diamond Jewelry", href: "/jewelry/diamond" },
    ],
  },
  {
    name: "Books",
    href: "/books",
    subcategories: [
      { name: "Buddhist Teachings", href: "/books/buddhist" },
      { name: "Meditation Guides", href: "/books/meditation" },
      { name: "Culture & History", href: "/books/culture" },
    ],
  },
  {
    name: "Gifts",
    href: "/gifts",
    subcategories: [
      { name: "Gift Sets", href: "/gifts/sets" },
      { name: "Corporate Gifts", href: "/gifts/corporate" },
      { name: "Wedding Gifts", href: "/gifts/wedding" },
    ],
  },
];

export const PRIMARY_NAV_ITEMS = [
  { name: "shop", href: "/shop" },
];