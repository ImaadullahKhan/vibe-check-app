/**
 * Menu Item Image Mapping and Resolution Utility
 * STRICTLY uses only the images provided in the user's /public/images/menu and /public/menu directories.
 * Standardizes filename resolution for new category-prefixed convention and backward-compatible fallbacks.
 * Absolutely NO external stock images or unapproved fallbacks.
 */

export interface MenuItemImageConfig {
  id: number;
  name: string;
  expectedFilename: string;
  category: 'burgers' | 'wiches' | 'sides' | 'wraps' | 'shakes' | 'coolers';
  altFilenames?: string[];
}

export const MENU_IMAGE_REGISTRY: Record<number, MenuItemImageConfig> = {
  // --- 1. BURGERS ---
  1: {
    id: 1,
    name: "OG Crispy Chicken",
    category: "burgers",
    expectedFilename: "burgers_OG-Crispy-Chicken-Single.jpeg",
    altFilenames: [
      "burgers_OG-Crispy-Chicken-Single.jpeg",
      "burgers_OG_Crispy_Chicken_Single.jpeg",
      "burgers_OG-Crispy-Chicken-(Single).jpeg",
      "OG-Crispy-Chicken-Single.jpeg",
      "OG-Crispy-Chicken-(Single).jpeg",
      "OG Crispy Chicken (Single).jpeg",
      "og-crispy-chicken-single.jpeg",
      "OG_Crispy_Chicken_Single.jpeg",
      "OG-Crispy-Chicken.jpeg"
    ],
  },
  2: {
    id: 2,
    name: "Crispy Chicken Double",
    category: "burgers",
    expectedFilename: "burgers_Crispy-Chicken-Double.jpeg",
    altFilenames: [
      "burgers_Crispy-Chicken-Double.jpeg",
      "burgers_Crispy_Chicken_Double.jpeg",
      "Crispy-Chicken-Double.jpeg",
      "crispy-chicken-double.jpeg",
      "Crispy_Chicken_Double.jpeg",
      "Crispy-Chicken-Double.jpg",
      "Crispy Chicken Double.jpeg"
    ],
  },
  3: {
    id: 3,
    name: "OG Nashville Chicken",
    category: "burgers",
    expectedFilename: "burgers_OG-Nashville-Chicken-Single.jpeg",
    altFilenames: [
      "burgers_OG-Nashville-Chicken-Single.jpeg",
      "burgers_OG_Nashville_Chicken_Single.jpeg",
      "burgers_OG-Nashville-Chicken-(Single).jpeg",
      "OG-Nashville-Chicken-Single.jpeg",
      "OG-Nashville-Chicken-(Single).jpeg",
      "OG Nashville Chicken (Single).jpeg",
      "og-nashville-chicken-single.jpeg",
      "OG_Nashville_Chicken_Single.jpeg",
      "OG-Nashville-Chicken.jpeg"
    ],
  },
  4: {
    id: 4,
    name: "Nashville Chicken Double",
    category: "burgers",
    expectedFilename: "burgers_Nashville-Chicken-Double.jpeg",
    altFilenames: [
      "burgers_Nashville-Chicken-Double.jpeg",
      "burgers_Nashville_Chicken_Double.jpeg",
      "Nashville-Chicken-Double.jpeg",
      "nashville-chicken-double.jpeg",
      "Nashville_Chicken_Double.jpeg",
      "Nashville-Chicken-Double.jpg",
      "Nashville Chicken Double.jpeg"
    ],
  },
  5: {
    id: 5,
    name: "Lamb Smash OG",
    category: "burgers",
    expectedFilename: "burgers_Lamb-Smash-OG-Single.jpeg",
    altFilenames: [
      "burgers_Lamb-Smash-OG-Single.jpeg",
      "burgers_Lamb_Smash_OG_Single.jpeg",
      "burgers_Lamb-Smash-OG-(Single).jpeg",
      "Lamb-Smash-OG-Single.jpeg",
      "Lamb-Smash-OG-(Single).jpeg",
      "Lamb Smash OG (Single).jpeg",
      "lamb-smash-og-single.jpeg",
      "Lamb_Smash_OG_Single.jpeg",
      "Lamb-Smash-OG.jpeg"
    ],
  },
  6: {
    id: 6,
    name: "Double Smash Lamb",
    category: "burgers",
    expectedFilename: "burgers_Double-Smash-Lamb.jpeg",
    altFilenames: [
      "burgers_Double-Smash-Lamb.jpeg",
      "burgers_Double_Smash_Lamb.jpeg",
      "Double-Smash-Lamb.jpeg",
      "double-smash-lamb.jpeg",
      "Double_Smash_Lamb.jpeg",
      "Double-Smash-Lamb.jpg",
      "Double Smash Lamb.jpeg"
    ],
  },
  7: {
    id: 7,
    name: "B**F Smash OG",
    category: "burgers",
    expectedFilename: "burgers_BF-Smash-OG-Single-Beef.jpeg",
    altFilenames: [
      "burgers_BF-Smash-OG-Single-Beef.jpeg",
      "burgers_BF_Smash_OG_Single_Beef.jpeg",
      "burgers_BF-Smash-OG-(Single-Beef).jpeg",
      "BF-Smash-OG-Single-Beef.jpeg",
      "BF-Smash-OG-(Single-Beef).jpeg",
      "BF Smash OG (Single Beef).jpeg",
      "bf-smash-og-single-beef.jpeg",
      "BF_Smash_OG_Single_Beef.jpeg",
      "BF-Smash-OG.jpeg"
    ],
  },
  8: {
    id: 8,
    name: "Double Smash B**F",
    category: "burgers",
    expectedFilename: "burgers_Double-Smash-Beef.jpeg",
    altFilenames: [
      "burgers_Double-Smash-Beef.jpeg",
      "burgers_Double-Smash-BF.jpeg",
      "burgers_Double_Smash_Beef.jpeg",
      "burgers_Double_Smash_BF.jpeg",
      "Double-Smash-BF.jpeg",
      "double-smash-bf.jpeg",
      "Double_Smash_BF.jpeg",
      "Double-Smash-BF.jpg",
      "Double Smash BF.jpeg"
    ],
  },

  // --- 2. SANDWICHES - 'WICHES ---
  9: {
    id: 9,
    name: "Crispy Chicken 'Wich",
    category: "wiches",
    expectedFilename: "sandwiches_OG-Chicken.jpeg",
    altFilenames: [
      "sandwiches_OG-Chicken.jpeg",
      "sandwiches_OG_Chicken.jpeg",
      "sandwiches_Crispy-Chicken.jpeg",
      "sandwiches_Crispy-Chicken-Wich.jpeg",
      "Crispy-Chicken-Wich.jpeg",
      "hot-crispy-wich.jpeg",
      "crispy-chicken-wich.jpeg",
      "Crispy_Chicken_Wich.jpeg",
      "Crispy Chicken _Wich.jpeg"
    ],
  },
  10: {
    id: 10,
    name: "Loaded Chicken & Cheese 'Wich",
    category: "wiches",
    expectedFilename: "sandwiches_Loaded-Chicken-Cheese.jpeg",
    altFilenames: [
      "sandwiches_Loaded-Chicken-Cheese.jpeg",
      "sandwiches_Loaded_Chicken_Cheese.jpeg",
      "Loaded-Wich-Chicken-Cheese.jpeg",
      "loaded-chicken-cheese-wich.jpeg",
      "Loaded-Chicken-Cheese-Wich.jpeg",
      "Loaded_Wich_Chicken_Cheese.jpeg",
      "Loaded _Wich (Chicken & Cheese).jpeg",
      "Loaded-Wich-(Chicken-&-Cheese).jpeg"
    ],
  },
  11: {
    id: 11,
    name: "Hot & Crispy Chicken 'Wich",
    category: "wiches",
    expectedFilename: "sandwiches_Hot-Crispy-Chicken.jpeg",
    altFilenames: [
      "sandwiches_Hot-Crispy-Chicken.jpeg",
      "sandwiches_Hot_Crispy_Chicken.jpeg",
      "hot-crispy-wich.jpeg",
      "Hot-Crispy-Chicken-Wich.jpeg",
      "hot-crispy-chicken-wich.jpeg",
      "Hot & Crispy Chicken _Wich.jpeg"
    ],
  },
  12: {
    id: 12,
    name: "Spicy & Smoked Cheese 'Wich",
    category: "wiches",
    expectedFilename: "sandwiches_Spicy-Smoked-Cheese.jpeg",
    altFilenames: [
      "sandwiches_Spicy-Smoked-Cheese.jpeg",
      "sandwiches_Spicy_Smoked_Cheese.jpeg",
      "Spicy-Smoked-Cheese-Wich.jpeg",
      "spicy-smoked-cheese-wich.jpeg",
      "Spicy_Smoked_Cheese_Wich.jpeg",
      "Spicy & Smoked Cheese _Wich.jpeg",
      "Spicy-&-Smoked-Cheese-Wich.jpeg"
    ],
  },
  13: {
    id: 13,
    name: "Smoked’ Shroom & Cheese 'Wich",
    category: "wiches",
    expectedFilename: "sandwiches_Smoked-Shroom-Cheese-Vegetarian.jpeg",
    altFilenames: [
      "sandwiches_Smoked-Shroom-Cheese-Vegetarian.jpeg",
      "sandwiches_Smoked_Shroom_Cheese_Vegetarian.jpeg",
      "Smoked-Shroom-Cheese-Wich-Vegetarian.jpeg",
      "smoked-shroom-cheese-wich.jpeg",
      "Smoked-Shroom-Cheese-Wich.jpeg",
      "Smoked_Shroom_Cheese_Wich.jpeg",
      "Smoked’ Shroom & Cheese _Wich (Vegetarian).jpeg",
      "Smoked’-Shroom-&-Cheese-Wich-(Vegetarian).jpeg"
    ],
  },

  // --- 3. SIDES ---
  14: {
    id: 14,
    name: "B**F Loaded Fries",
    category: "sides",
    expectedFilename: "sides_BF-Loaded-Fries.jpeg",
    altFilenames: [
      "sides_BF-Loaded-Fries.jpeg",
      "sides_BF_Loaded_Fries.jpeg",
      "BF-Loaded-Fries.jpeg",
      "bf-loaded-fries.jpeg",
      "BF_Loaded_Fries.jpeg",
      "BF-Loaded-Fries.jpg",
      "BF Loaded Fries.jpeg"
    ],
  },
  15: {
    id: 15,
    name: "Chicken Loaded Fries",
    category: "sides",
    expectedFilename: "sides_Chicken-Loaded-Fries.jpeg",
    altFilenames: [
      "sides_Chicken-Loaded-Fries.jpeg",
      "sides_Chicken_Loaded_Fries.jpeg",
      "Chicken-Loaded-Fries.jpeg",
      "chicken-loaded-fries.jpeg",
      "Chicken_Loaded_Fries.jpeg",
      "Chicken-Loaded-Fries.jpg",
      "Chicken Loaded Fries.jpeg"
    ],
  },
  16: {
    id: 16,
    name: "Cheezy Chicken Tenders",
    category: "sides",
    expectedFilename: "sides_Cheezy-Chicken-Tenders.jpeg",
    altFilenames: [
      "sides_Cheezy-Chicken-Tenders.jpeg",
      "sides_Cheezy_Chicken_Tenders.jpeg",
      "Cheezy-Chicken-Tenders.jpeg",
      "cheezy-chicken-tenders.jpeg",
      "Cheezy_Chicken_Tenders.jpeg",
      "Cheezy-Chicken-Tenders.jpg",
      "Cheezy Chicken Tenders.jpeg"
    ],
  },
  17: {
    id: 17,
    name: "Fiery Chicken Tenders",
    category: "sides",
    expectedFilename: "sides_Fiery-Chicken-Tenders.jpeg",
    altFilenames: [
      "sides_Fiery-Chicken-Tenders.jpeg",
      "sides_Fiery_Chicken_Tenders.jpeg",
      "Fiery-Chicken-Tenders.jpeg",
      "fiery-chicken-tenders.jpeg",
      "Fiery_Chicken_Tenders.jpeg",
      "Fiery-Chicken-Tenders.jpg",
      "Fiery Chicken Tenders.jpeg"
    ],
  },
  18: {
    id: 18,
    name: "Crinkle Fries",
    category: "sides",
    expectedFilename: "sides_Crinkle-Fries.jpeg",
    altFilenames: [
      "sides_Crinkle-Fries.jpeg",
      "sides_Crinkle_Fries.jpeg",
      "Crinkle-Fries.jpeg",
      "crinkle-fries.jpeg",
      "Crinkle_Fries.jpeg",
      "Crinkle-Fries.jpg",
      "Crinkle Fries.jpeg"
    ],
  },
  19: {
    id: 19,
    name: "French Fries",
    category: "sides",
    expectedFilename: "sides_French-Fries-Classic-Thin-Cut.jpeg",
    altFilenames: [
      "sides_French-Fries-Classic-Thin-Cut.jpeg",
      "sides_French_Fries_Classic_Thin_Cut.jpeg",
      "French-Fries-Classic-Thin-Cut.jpeg",
      "French-Fries-(Classic-Thin-Cut).jpeg",
      "French Fries (Classic Thin Cut).jpeg",
      "french-fries-classic-thin-cut.jpeg",
      "French_Fries_Classic_Thin_Cut.jpeg",
      "French-Fries.jpeg",
      "french-fries.jpeg"
    ],
  },

  // --- 4. WRAPS ---
  20: {
    id: 20,
    name: "Crispy Chicken Wrap",
    category: "wraps",
    expectedFilename: "wraps_Crispy-Chicken.jpeg",
    altFilenames: [
      "wraps_Crispy-Chicken.jpeg",
      "wraps_Crispy_Chicken.jpeg",
      "wraps_Crispy-Chicken-Wrap.jpeg",
      "Crispy-Chicken-Wrap.jpeg",
      "crispy-chicken-wrap.jpeg",
      "Crispy_Chicken_Wrap.jpeg",
      "Crispy-Chicken-Wrap.jpg",
      "Crispy Chicken Wrap.jpeg"
    ],
  },
  21: {
    id: 21,
    name: "Loaded Chicken & Cheese Wrap",
    category: "wraps",
    expectedFilename: "wraps_Loaded-Chicken-Cheese.jpeg",
    altFilenames: [
      "wraps_Loaded-Chicken-Cheese.jpeg",
      "wraps_Loaded_Chicken_Cheese.jpeg",
      "Loaded-Wich-Chicken-Cheese.jpeg",
      "loaded-chicken-cheese-wich.jpeg",
      "Loaded-Chicken-Cheese-Wrap.jpeg",
      "loaded-chicken-cheese-wrap.jpeg",
      "Loaded _Wich (Chicken & Cheese).jpeg",
      "Loaded-Wich-(Chicken-&-Cheese).jpeg"
    ],
  },
  22: {
    id: 22,
    name: "Hot & Crispy Chicken Wrap",
    category: "wraps",
    expectedFilename: "wraps_Hot-Crispy-Chicken.jpeg",
    altFilenames: [
      "wraps_Hot-Crispy-Chicken.jpeg",
      "wraps_Hot_Crispy_Chicken.jpeg",
      "hot-crispy-wich.jpeg",
      "Hot-Crispy-Chicken-Wrap.jpeg",
      "hot-crispy-chicken-wrap.jpeg",
      "Hot & Crispy Chicken _Wich.jpeg"
    ],
  },
  23: {
    id: 23,
    name: "Smoked’ Shroom & Cheese Wrap",
    category: "wraps",
    expectedFilename: "wraps_Smoked-Shroom-Cheese-Vegetarian.jpeg",
    altFilenames: [
      "wraps_Smoked-Shroom-Cheese-Vegetarian.jpeg",
      "wraps_Smoked_Shroom_Cheese_Vegetarian.jpeg",
      "Smoked-Shroom-Cheese-Wrap-Vegetarian.jpeg",
      "Smoked’ Shroom & Cheese Wrap (Vegetarian).jpeg",
      "Smoked’-Shroom-&-Cheese-Wrap-(Vegetarian).jpeg",
      "smoked-shroom-cheese-wrap-vegetarian.jpeg",
      "Smoked-Shroom-Cheese-Wich-Vegetarian.jpeg"
    ],
  },
  24: {
    id: 24,
    name: "Nashville Chicken Wrap",
    category: "wraps",
    expectedFilename: "wraps_Nashville-Chicken.jpeg",
    altFilenames: [
      "wraps_Nashville-Chicken.jpeg",
      "wraps_Nashville_Chicken.jpeg",
      "Nashville-Chicken-Wrap.jpeg",
      "nashville-chicken-wrap.jpeg",
      "Nashville_Chicken_Wrap.jpeg",
      "Nashville-Chicken-Wrap.jpg",
      "Nashville Chicken Wrap.jpeg"
    ],
  },
  25: {
    id: 25,
    name: "Arabian Falafel Wrap",
    category: "wraps",
    expectedFilename: "wraps_Arabian-Falafel-Vegetarian.jpeg",
    altFilenames: [
      "wraps_Arabian-Falafel-Vegetarian.jpeg",
      "wraps_Arabian_Falafel_Vegetarian.jpeg",
      "Arabian-Falafel-Wrap-Vegetarian.jpeg",
      "Arabian-Falafel-Wrap-(Vegetarian).jpeg",
      "Arabian Falafel Wrap (Vegetarian).jpeg",
      "arabian-falafel-wrap.jpeg",
      "Arabian-Falafel-Wrap.jpeg",
      "Arabian_Falafel_Wrap_Vegetarian.jpeg"
    ],
  },

  // --- 5. SUGAR RUSH (SHAKES) ---
  26: {
    id: 26,
    name: "Kitkat Shake",
    category: "shakes",
    expectedFilename: "sugar_rush_Kitkat-Shake.jpeg",
    altFilenames: [
      "sugar_rush_Kitkat-Shake.jpeg",
      "sugar_rush_Kitkat_Shake.jpeg",
      "Kitkat-Shake-Sugar-Rush.jpeg",
      "Kitkat-Shake-(Sugar-Rush).jpeg",
      "Kitkat Shake (Sugar Rush).jpeg",
      "kitkat-shake-sugar-rush.jpeg",
      "Kitkat_Shake_Sugar_Rush.jpeg",
      "Kitkat-Shake.jpeg",
      "kitkat-shake.jpeg"
    ],
  },
  27: {
    id: 27,
    name: "OREO Shake",
    category: "shakes",
    expectedFilename: "sugar_rush_OREO-Shake.jpeg",
    altFilenames: [
      "sugar_rush_OREO-Shake.jpeg",
      "sugar_rush_OREO_Shake.jpeg",
      "sugar_rush_Oreo-Shake.jpeg",
      "OREO-Shake-Sugar-Rush.jpeg",
      "OREO-Shake-(Sugar-Rush).jpeg",
      "OREO Shake (Sugar Rush).jpeg",
      "oreo-shake-sugar-rush.jpeg",
      "OREO_Shake_Sugar_Rush.jpeg",
      "OREO-Shake.jpeg",
      "oreo-shake.jpeg"
    ],
  },
  28: {
    id: 28,
    name: "Choco Chip Shake",
    category: "shakes",
    expectedFilename: "sugar_rush_Choco-Chip-Shake.jpeg",
    altFilenames: [
      "sugar_rush_Choco-Chip-Shake.jpeg",
      "sugar_rush_Choco_Chip_Shake.jpeg",
      "Choco-Chip-Shake-Sugar-Rush.jpeg",
      "Choco-Chip-Shake-(Sugar-Rush).jpeg",
      "Choco Chip Shake (Sugar Rush).jpeg",
      "choco-chip-shake-sugar-rush.jpeg",
      "Choco_Chip_Shake_Sugar_Rush.jpeg",
      "Choco-Chip-Shake.jpeg",
      "choco-chip-shake.jpeg"
    ],
  },
  29: {
    id: 29,
    name: "Biscoff Shake",
    category: "shakes",
    expectedFilename: "sugar_rush_Biscoff-Shake.jpeg",
    altFilenames: [
      "sugar_rush_Biscoff-Shake.jpeg",
      "sugar_rush_Biscoff_Shake.jpeg",
      "Biscoff-Shake-Sugar-Rush.jpeg",
      "Biscoff-Shake-(Sugar-Rush).jpeg",
      "Biscoff Shake (Sugar Rush).jpeg",
      "biscoff-shake-sugar-rush.jpeg",
      "Biscoff_Shake_Sugar_Rush.jpeg",
      "Biscoff-Shake.jpeg",
      "biscoff-shake.jpeg"
    ],
  },

  // --- 6. SPILLS (COOLERS) ---
  30: {
    id: 30,
    name: "Veryberry Soda",
    category: "coolers",
    expectedFilename: "spill_Veryberry-Soda.jpeg",
    altFilenames: [
      "spill_Veryberry-Soda.jpeg",
      "spill_Veryberry_Soda.jpeg",
      "Veryberry-Soda-Spills.jpeg",
      "Veryberry-Soda-(Spills).jpeg",
      "Veryberry Soda (Spills).jpeg",
      "veryberry-soda-spills.jpeg",
      "Veryberry_Soda_(Spills).jpeg",
      "Veryberry-Soda.jpeg",
      "veryberry-soda.jpeg"
    ],
  },
  31: {
    id: 31,
    name: "Virgin Mojito",
    category: "coolers",
    expectedFilename: "spill_Virgin-Mojito.jpeg",
    altFilenames: [
      "spill_Virgin-Mojito.jpeg",
      "spill_Virgin_Mojito.jpeg",
      "Virgin-Mojito-Spills.jpeg",
      "Virgin-Mojito-(Spills).jpeg",
      "Virgin Mojito (Spills).jpeg",
      "virgin-mojito-spills.jpeg",
      "Virgin_Mojito_(Spills).jpeg",
      "Virgin-Mojito.jpeg",
      "virgin-mojito.jpeg"
    ],
  },
  32: {
    id: 32,
    name: "Passion Fizz",
    category: "coolers",
    expectedFilename: "spill_Passion-Fizz.jpeg",
    altFilenames: [
      "spill_Passion-Fizz.jpeg",
      "spill_Passion_Fizz.jpeg",
      "Passion-Fizz-Spills.jpeg",
      "Passion-Fizz-(Spills).jpeg",
      "Passion Fizz (Spills).jpeg",
      "passion-fizz-spills.jpeg",
      "Passion_Fizz_(Spills).jpeg",
      "Passion-Fizz.jpeg",
      "passion-fizz.jpeg"
    ],
  },
  33: {
    id: 33,
    name: "Fizzy Jamun",
    category: "coolers",
    expectedFilename: "spill_Fizzy-Jamun.jpeg",
    altFilenames: [
      "spill_Fizzy-Jamun.jpeg",
      "spill_Fizzy_Jamun.jpeg",
      "Fizzy-Jamun-Spills.jpeg",
      "Fizzy-Jamun-(Spills).jpeg",
      "Fizzy Jamun (Spills).jpeg",
      "fizzy-jamun-spills.jpeg",
      "Fizzy_Jamun_Spills.jpeg",
      "Fizzy-Jamun.jpeg",
      "fizzy-jamun.jpeg"
    ],
  },
  34: {
    id: 34,
    name: "Virgin Appletini",
    category: "coolers",
    expectedFilename: "spill_Virgin-Appletinin.jpeg",
    altFilenames: [
      "spill_Virgin-Appletinin.jpeg",
      "spill_Virgin-Appletini.jpeg",
      "spill_Virgin_Appletinin.jpeg",
      "spill_Virgin_Appletini.jpeg",
      "Virgin-Appletini-Spills.jpeg",
      "Virgin-Appletini-(Spills).jpeg",
      "Virgin Appletini (Spills).jpeg",
      "Virgin-Appletinin-(Spills).jpeg",
      "Virgin Appletinin (Spills).jpeg",
      "Virgin-Appletinin-Spills.jpeg",
      "virgin-appletinin-spills.jpeg",
      "Virgin-Appletini.jpeg",
      "virgin-appletini.jpeg"
    ],
  }
};

import { getCustomImage } from './imageStore';

/**
 * Normalizes item name to find a match in the registry if ID is unknown.
 */
export function findMappingByName(name: string): MenuItemImageConfig | undefined {
  const clean = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return Object.values(MENU_IMAGE_REGISTRY).find((item) => {
    const itemClean = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return itemClean === clean || itemClean.includes(clean) || clean.includes(itemClean);
  });
}

/**
 * Strictly searches ONLY in user's custom in-app uploads and /images/menu/ directories.
 * Returns candidate URLs in priority order.
 */
export function getItemImageCandidates(
  item: { id: number; name: string; image?: string }
): {
  primaryUrl: string;
  expectedPath: string;
  candidateUrls: string[];
  config?: MenuItemImageConfig;
} {
  const config = MENU_IMAGE_REGISTRY[item.id] || findMappingByName(item.name);
  const candidates: string[] = [];
  
  // 0. Check custom in-app uploaded image store (IndexedDB / memory) first
  const customById = getCustomImage(item.id);
  if (customById) candidates.push(customById);

  if (config?.expectedFilename) {
    const customByFilename = getCustomImage(config.expectedFilename);
    if (customByFilename && !candidates.includes(customByFilename)) {
      candidates.push(customByFilename);
    }
  }

  const customByName = getCustomImage(item.name);
  if (customByName && !candidates.includes(customByName)) {
    candidates.push(customByName);
  }

  // Default dashed filename from item name if no explicit config
  const sanitizedName = item.name.replace(/[^a-zA-Z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const expectedFilename = config ? config.expectedFilename : `${sanitizedName}.jpeg`;
  const expectedPath = `/images/menu/${expectedFilename}`;

  const addFilenameVariations = (filename: string) => {
    if (!filename) return;
    const base = filename.replace(/\.[^/.]+$/, "");
    const ext = filename.split('.').pop() || 'jpeg';
    
    // Check if filename exists in custom store
    const custom = getCustomImage(filename);
    if (custom && !candidates.includes(custom)) {
      candidates.push(custom);
    }

    // Variations: exact, dashed, underscored, lowercase-dashed, lowercase-underscored
    const variations = [
      filename,
      `${base.replace(/[\s_]+/g, '-')}.${ext}`,
      `${base.replace(/[^a-zA-Z0-9]+/g, '-').replace(/(^-|-$)/g, '')}.${ext}`,
      `${base.replace(/[\s-]+/g, '_')}.${ext}`,
      `${base.toLowerCase().replace(/[\s_]+/g, '-')}.${ext}`,
      `${base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}.${ext}`,
      `${base.toLowerCase()}.${ext}`,
    ];

    variations.forEach(v => {
      candidates.push(encodeURI(`/images/menu/${v}`));
      candidates.push(encodeURI(`/menu/${v}`));
      candidates.push(encodeURI(`/${v}`));
    });
  };

  // 1. User configured path in menu item if local (high priority)
  if (item.image && (item.image.startsWith('/images/menu/') || item.image.startsWith('/menu/'))) {
    const filename = item.image.split('/').pop() || '';
    addFilenameVariations(filename);
  }

  // 2. Expected filename
  addFilenameVariations(expectedFilename);

  // 3. Alt local filenames if defined
  if (config?.altFilenames) {
    config.altFilenames.forEach((alt) => {
      addFilenameVariations(alt);
    });
  }

  return {
    primaryUrl: candidates[0] || expectedPath,
    expectedPath,
    candidateUrls: Array.from(new Set(candidates)),
    config,
  };
}
