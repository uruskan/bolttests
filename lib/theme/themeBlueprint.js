/**
 * Theme Blueprint Schema
 * This file defines the canonical JSON structure for the new theme system.
 * This structure defines 100% of menu appearance and replaces the old broken theme system.
 * 
 * The theme blueprint consists of:
 * - presetId: Identifier for the theme preset (currently only "bufibu-klasik-v1")
 * - advancedSettings: Full control for theme customization (11 features)
 * 
 * Note: Simple mode is now just a UI convenience layer that applies bulk changes
 * to advancedSettings. No separate data storage is needed.
 */

/**
 * Theme Blueprint Schema Definition
 * This is the complete structure that defines a restaurant's menu appearance
 */
export const themeBlueprint = {
  // Preset identifier - currently only "bufibu-klasik-v1" is supported
  presetId: "bufibu-klasik-v1",
  
  // Advanced Mode Settings - Full control over 11 features
  // Note: Simple mode is now just a UI convenience that modifies these settings
  advancedSettings: {
    // Feature #6: Layout configuration
    layout: {
      // Order of blocks to render on the page
      // Now includes advertisementHero for hero slider type advertisements
      blocks: ["header", "advertisementHero", "featuredItems", "advertisementButton", "categories", "footer"],
      
      // Category card layout - only "bufibu-klasik" for v1
      categoryLayout: "bufibu-klasik",
      
      // Product card layout - only "bufibu-klasik" for v1
      productLayout: "bufibu-klasik"
    },
    
    // Feature #3: Background images with opacity control
    backgrounds: {
      // Global background that applies to entire page
      global: {
        url: null, // Firebase Storage URL or null
        opacity: 0.3 // 0-1 opacity value
      },
      
      // Section-specific backgrounds
      sections: {
        header: { 
          url: null, 
          opacity: 0.3 
        },
        categories: { 
          url: null, 
          opacity: 0.3 
        }
      }
    },
    
    // Feature #2: Individual color customization for all elements
    colors: {
      // Layout colors
      header: "#FFFFFF",           // Header background
      body: "#FAFAFA",            // Body background
      cards: "#FFFFFF",           // Card backgrounds
      buttons: "#E91E63",         // Button colors
      labels: "#757575",          // Label text colors
      
      // Text colors
      restaurantName: "#212121",   // Restaurant name color
      categoryName: "#FFFFFF",     // Category name color (on image overlay)
      productName: "#212121",      // Product name color
      productPrice: "#E91E63",     // Product price color
      productDescription: "#757575" // Product description color
    },
    
    // Component-specific settings
    components: {
      // Header configuration
      header: {
        // Feature #10: Logo size control
        logoSize: "medium", // "small" | "medium" | "large"
        
        // Feature #5: Social icons configuration
        socialIcons: {
          enabled: true,      // Toggle social icons on/off
          iconPack: "lucide" // Icon pack selection - 3 packs available
          // Icons included: Phone, Location, Instagram, Google
        }
      },
      
      // Feature #7: Featured items section
      featuredSection: {
        enabled: true // Toggle featured items section on/off
      },
      
      // Feature #8: Advertisement button
      advertisementButton: {
        enabled: true // Toggle kampanyalar button on/off
      },
      
      // Feature #4: Category animation type
      categoryAnimation: {
        type: "bufibu-klasik" // Animation type: "none" | "bufibu-klasik"
      }
    },
    
    // Feature #1: Typography settings for all text elements
    typography: {
      // Restaurant name typography
      restaurantName: {
        fontFamily: "Playfair Display", // Google Font family
        fontSize: "2.5rem",             // Font size
        fontWeight: "700",              // Font weight
        alignment: "center"             // Text alignment
      },
      
      // Restaurant slogan typography
      restaurantSlogan: {
        fontFamily: "Open Sans",
        fontSize: "1.1rem",
        fontWeight: "400",
        alignment: "center"
      },
      
      // Category name typography (on category cards)
      categoryName: {
        fontFamily: "Montserrat",
        fontSize: "1.5rem",
        fontWeight: "600",
        alignment: "center"
      },
      
      // Product name typography
      productName: {
        fontFamily: "Open Sans",
        fontSize: "1.1rem",
        fontWeight: "600",
        alignment: "left"
      },
      
      // Product price typography
      productPrice: {
        fontFamily: "Open Sans",
        fontSize: "1.1rem",
        fontWeight: "700",
        alignment: "right"
      },
      
      // Product description typography
      productDescription: {
        fontFamily: "Open Sans",
        fontSize: "0.9rem",
        fontWeight: "400",
        alignment: "left"
      }
    }
  }
};

/**
 * Layout options for categories and products
 */
export const layoutOptions = {
  category: {
    "bufibu-klasik": {
      name: "Bufibu Klasik",
      description: "Görsel arka planlı, genişletilebilir kategori kartları",
      preview: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  },
  product: {
    "bufibu-klasik": {
      name: "Bufibu Klasik", 
      description: "Yan yana görsel ve detay, sağda fiyat gösterimi",
      preview: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  }
};

/**
 * Theme Presets - Complete theme configurations
 */
export const themePresets = {
  "elegant-classic": {
    name: "Elegant Classic",
    description: "Sophisticated and timeless design with serif fonts and neutral colors",
    preview: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400",
    blueprint: {
      presetId: "bufibu-klasik-v1",
      advancedSettings: {
        layout: {
          blocks: ["header", "featuredItems", "categories", "footer"],
          categoryLayout: "bufibu-klasik",
          productLayout: "bufibu-klasik"
        },
        backgrounds: {
          global: { url: null, opacity: 0.1 },
          sections: {
            header: { url: null, opacity: 0.1 },
            categories: { url: null, opacity: 0.1 }
          }
        },
        colors: {
          header: "#F8F9FA",
          body: "#FFFFFF",
          cards: "#FFFFFF",
          buttons: "#6C757D",
          labels: "#6C757D",
          restaurantName: "#212529",
          categoryName: "#FFFFFF",
          productName: "#212529",
          productPrice: "#6C757D",
          productDescription: "#6C757D"
        },
        components: {
          header: {
            logoSize: "large",
            socialIcons: { enabled: true, iconPack: "lucide" }
          },
          featuredSection: { enabled: true },
          advertisementButton: { enabled: false },
          categoryAnimation: { type: "none" }
        },
        typography: {
          restaurantName: {
            fontFamily: "Playfair Display",
            fontSize: "3rem",
            fontWeight: "700",
            alignment: "center"
          },
          restaurantSlogan: {
            fontFamily: "Merriweather",
            fontSize: "1.2rem",
            fontWeight: "300",
            alignment: "center"
          },
          categoryName: {
            fontFamily: "Playfair Display",
            fontSize: "1.8rem",
            fontWeight: "600",
            alignment: "center"
          },
          productName: {
            fontFamily: "Merriweather",
            fontSize: "1.1rem",
            fontWeight: "600",
            alignment: "left"
          },
          productPrice: {
            fontFamily: "Merriweather",
            fontSize: "1.1rem",
            fontWeight: "700",
            alignment: "right"
          },
          productDescription: {
            fontFamily: "Merriweather",
            fontSize: "0.9rem",
            fontWeight: "400",
            alignment: "left"
          }
        }
      }
    }
  },
  "modern-vibrant": {
    name: "Modern Vibrant",
    description: "Bold and colorful design with modern fonts and vibrant accents",
    preview: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400",
    blueprint: {
      presetId: "bufibu-klasik-v1",
      advancedSettings: {
        layout: {
          blocks: ["header", "advertisementHero", "featuredItems", "advertisementButton", "categories", "footer"],
          categoryLayout: "bufibu-klasik",
          productLayout: "bufibu-klasik"
        },
        backgrounds: {
          global: { url: null, opacity: 0.2 },
          sections: {
            header: { url: null, opacity: 0.2 },
            categories: { url: null, opacity: 0.2 }
          }
        },
        colors: {
          header: "#FF6B6B",
          body: "#F8F9FA",
          cards: "#FFFFFF",
          buttons: "#4ECDC4",
          labels: "#45B7D1",
          restaurantName: "#2C3E50",
          categoryName: "#FFFFFF",
          productName: "#2C3E50",
          productPrice: "#E74C3C",
          productDescription: "#7F8C8D"
        },
        components: {
          header: {
            logoSize: "medium",
            socialIcons: { enabled: true, iconPack: "lucide" }
          },
          featuredSection: { enabled: true },
          advertisementButton: { enabled: true },
          categoryAnimation: { type: "bufibu-klasik" }
        },
        typography: {
          restaurantName: {
            fontFamily: "Poppins",
            fontSize: "2.8rem",
            fontWeight: "800",
            alignment: "center"
          },
          restaurantSlogan: {
            fontFamily: "Poppins",
            fontSize: "1.1rem",
            fontWeight: "400",
            alignment: "center"
          },
          categoryName: {
            fontFamily: "Poppins",
            fontSize: "1.6rem",
            fontWeight: "700",
            alignment: "center"
          },
          productName: {
            fontFamily: "Poppins",
            fontSize: "1.1rem",
            fontWeight: "600",
            alignment: "left"
          },
          productPrice: {
            fontFamily: "Poppins",
            fontSize: "1.2rem",
            fontWeight: "800",
            alignment: "right"
          },
          productDescription: {
            fontFamily: "Poppins",
            fontSize: "0.9rem",
            fontWeight: "400",
            alignment: "left"
          }
        }
      }
    }
  },
  "minimalist-clean": {
    name: "Minimalist Clean",
    description: "Clean and simple design with plenty of white space and subtle colors",
    preview: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
    blueprint: {
      presetId: "bufibu-klasik-v1",
      advancedSettings: {
        layout: {
          blocks: ["header", "featuredItems", "categories", "footer"],
          categoryLayout: "bufibu-klasik",
          productLayout: "bufibu-klasik"
        },
        backgrounds: {
          global: { url: null, opacity: 0.05 },
          sections: {
            header: { url: null, opacity: 0.05 },
            categories: { url: null, opacity: 0.05 }
          }
        },
        colors: {
          header: "#FFFFFF",
          body: "#FAFAFA",
          cards: "#FFFFFF",
          buttons: "#000000",
          labels: "#666666",
          restaurantName: "#000000",
          categoryName: "#FFFFFF",
          productName: "#000000",
          productPrice: "#000000",
          productDescription: "#666666"
        },
        components: {
          header: {
            logoSize: "small",
            socialIcons: { enabled: false, iconPack: "lucide" }
          },
          featuredSection: { enabled: false },
          advertisementButton: { enabled: false },
          categoryAnimation: { type: "none" }
        },
        typography: {
          restaurantName: {
            fontFamily: "Inter",
            fontSize: "2.2rem",
            fontWeight: "300",
            alignment: "center"
          },
          restaurantSlogan: {
            fontFamily: "Inter",
            fontSize: "1rem",
            fontWeight: "300",
            alignment: "center"
          },
          categoryName: {
            fontFamily: "Inter",
            fontSize: "1.4rem",
            fontWeight: "500",
            alignment: "center"
          },
          productName: {
            fontFamily: "Inter",
            fontSize: "1rem",
            fontWeight: "500",
            alignment: "left"
          },
          productPrice: {
            fontFamily: "Inter",
            fontSize: "1rem",
            fontWeight: "600",
            alignment: "right"
          },
          productDescription: {
            fontFamily: "Inter",
            fontSize: "0.85rem",
            fontWeight: "400",
            alignment: "left"
          }
        }
      }
    }
  },
  "warm-rustic": {
    name: "Warm Rustic",
    description: "Cozy and inviting design with warm colors and traditional fonts",
    preview: "https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400",
    blueprint: {
      presetId: "bufibu-klasik-v1",
      advancedSettings: {
        layout: {
          blocks: ["header", "featuredItems", "advertisementButton", "categories", "footer"],
          categoryLayout: "bufibu-klasik",
          productLayout: "bufibu-klasik"
        },
        backgrounds: {
          global: { url: null, opacity: 0.4 },
          sections: {
            header: { url: null, opacity: 0.3 },
            categories: { url: null, opacity: 0.3 }
          }
        },
        colors: {
          header: "#8B4513",
          body: "#FFF8DC",
          cards: "#FFFAF0",
          buttons: "#D2691E",
          labels: "#8B4513",
          restaurantName: "#654321",
          categoryName: "#FFFFFF",
          productName: "#654321",
          productPrice: "#B8860B",
          productDescription: "#8B4513"
        },
        components: {
          header: {
            logoSize: "medium",
            socialIcons: { enabled: true, iconPack: "lucide" }
          },
          featuredSection: { enabled: true },
          advertisementButton: { enabled: true },
          categoryAnimation: { type: "bufibu-klasik" }
        },
        typography: {
          restaurantName: {
            fontFamily: "Merriweather",
            fontSize: "2.6rem",
            fontWeight: "700",
            alignment: "center"
          },
          restaurantSlogan: {
            fontFamily: "Merriweather",
            fontSize: "1.1rem",
            fontWeight: "400",
            alignment: "center"
          },
          categoryName: {
            fontFamily: "Merriweather",
            fontSize: "1.5rem",
            fontWeight: "600",
            alignment: "center"
          },
          productName: {
            fontFamily: "Merriweather",
            fontSize: "1.1rem",
            fontWeight: "600",
            alignment: "left"
          },
          productPrice: {
            fontFamily: "Merriweather",
            fontSize: "1.1rem",
            fontWeight: "700",
            alignment: "right"
          },
          productDescription: {
            fontFamily: "Merriweather",
            fontSize: "0.9rem",
            fontWeight: "400",
            alignment: "left"
          }
        }
      }
    }
  }
};

/**
 * Color scheme presets for simple mode
 * Each preset defines a complete color palette
 */
export const colorSchemePresets = {
  "rose-gold": {
    name: "Rose Gold",
    colors: {
      header: "#FFF5F7",
      body: "#FFFAFA",
      cards: "#FFFFFF",
      buttons: "#E91E63",
      labels: "#8B5A6F",
      restaurantName: "#6B2C4A",
      categoryName: "#FFFFFF",
      productName: "#4A1F33",
      productPrice: "#E91E63",
      productDescription: "#8B5A6F"
    }
  },
  "ocean-blue": {
    name: "Ocean Blue",
    colors: {
      header: "#E3F2FD",
      body: "#F5F9FF",
      cards: "#FFFFFF",
      buttons: "#2196F3",
      labels: "#5E7C8B",
      restaurantName: "#1A3A52",
      categoryName: "#FFFFFF",
      productName: "#263238",
      productPrice: "#2196F3",
      productDescription: "#607D8B"
    }
  },
  "forest-green": {
    name: "Forest Green",
    colors: {
      header: "#F1F8E9",
      body: "#FAFFF5",
      cards: "#FFFFFF",
      buttons: "#689F38",
      labels: "#6B7A5F",
      restaurantName: "#2E4A1F",
      categoryName: "#FFFFFF",
      productName: "#33691E",
      productPrice: "#689F38",
      productDescription: "#7A8B6F"
    }
  },
  "sunset-orange": {
    name: "Sunset Orange",
    colors: {
      header: "#FFF3E0",
      body: "#FFFAF5",
      cards: "#FFFFFF",
      buttons: "#FF6F00",
      labels: "#8B6F5A",
      restaurantName: "#6B3A1F",
      categoryName: "#FFFFFF",
      productName: "#4A2F1F",
      productPrice: "#FF6F00",
      productDescription: "#8B6F5A"
    }
  }
};

/**
 * Font size multipliers for simple mode
 * These multiply the base font sizes defined in advanced settings
 */
export const fontSizeMultipliers = {
  small: 0.85,
  medium: 1,
  large: 1.15
};

/**
 * Density (spacing) multipliers for simple mode
 * These affect padding, margins, and gaps
 */
export const densityMultipliers = {
  compact: 0.75,
  regular: 1,
  spacious: 1.25
};

/**
 * Available Google Fonts for typography customization
 * These fonts are loaded dynamically based on usage
 */
export const availableFonts = [
  "Open Sans",
  "Roboto",
  "Playfair Display",
  "Montserrat",
  "Lato",
  "Poppins",
  "Merriweather",
  "Raleway",
  "Oswald",
  "Nunito",
  "Inter"
];

/**
 * Social icon packs available for selection
 * Each pack provides different icon styles for Phone, Location, Instagram, Google
 */
export const socialIconPacks = {
  lucide: "Lucide Icons",           // Clean, minimalist line icons (default)
  material: "Material Icons",       // Material Design - Authentic app store style icons
  heroicons: "Heroicons"      // Beautiful hand-crafted SVG icons by Tailwind team
};

/**
 * Category animation types available for selection
 */
export const categoryAnimationTypes = {
  none: "No Animation",                   // No animation, all categories expanded
  "bufibu-klasik": "Bufibu Classic" // Bufibu classic expand/collapse animation
};

/**
 * Get default theme blueprint
 * Returns a fresh copy of the default theme structure
 */
export function getDefaultThemeBlueprint() {
  return JSON.parse(JSON.stringify(themeBlueprint));
}

/**
 * Validate theme blueprint structure
 * Ensures all required fields are present with correct types
 * @param {Object} blueprint - Theme blueprint to validate
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export function validateThemeBlueprint(blueprint) {
  const errors = [];
  
  // Check top-level structure
  if (!blueprint || typeof blueprint !== 'object') {
    errors.push('Blueprint must be an object');
    return { valid: false, errors };
  }
  
  // Validate presetId
  if (blueprint.presetId !== 'bufibu-klasik-v1') {
    errors.push('Invalid presetId. Only "bufibu-klasik-v1" is supported');
  }
  
  // Validate advancedSettings structure (basic check)
  if (!blueprint.advancedSettings || typeof blueprint.advancedSettings !== 'object') {
    errors.push('advancedSettings is required');
  } else {
    // Check required sections exist
    const requiredSections = ['layout', 'backgrounds', 'colors', 'components', 'typography'];
    requiredSections.forEach(section => {
      if (!blueprint.advancedSettings[section]) {
        errors.push(`advancedSettings.${section} is required`);
      }
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}