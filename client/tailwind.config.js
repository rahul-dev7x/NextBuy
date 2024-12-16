/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
		extend: {
		  colors: {
			primary: {
			  DEFAULT: "#1E3A8A", // Deep Blue for branding
			  light: "#3B82F6",   // Lighter Blue for accents or hover states
			  dark: "#1E293B",    // Darker Blue for strong visual impact
			},
			secondary: {
			  DEFAULT: "#F59E0B", // Amber for highlighting key elements
			  light: "#FDE68A",   // Light Amber for subtle accents
			  dark: "#B45309",    // Dark Amber for shadows or borders
			},
			neutral: {
			  light: "#F9FAFB",  // Light Gray for backgrounds
			  DEFAULT: "#6B7280", // Neutral Gray for text
			  dark: "#111827",    // Almost Black for text and strong contrast
			},
			success: "#10B981", // Green for success messages
			warning: "#F59E0B", // Orange for warnings
			error: "#EF4444",   // Red for errors
			info: "#3B82F6",    // Blue for informational messages
		  },
		  fontSize: {
			xs: ["0.75rem", "1rem"], // For small text like captions
			sm: ["0.875rem", "1.25rem"], // For body text
			base: ["1rem", "1.5rem"], // Default body text
			lg: ["1.125rem", "1.75rem"], // Larger text for emphasis
			xl: ["1.25rem", "1.75rem"], // Section headings
			"2xl": ["1.5rem", "2rem"], // Subheadings
			"3xl": ["1.875rem", "2.25rem"], // Main headings
			"4xl": ["2.25rem", "2.5rem"], // Large titles
			"5xl": ["3rem", "1"], // Hero titles
			"6xl": ["3.75rem", "1"], // Extra-large hero titles
		  },
		  boxShadow: {
			card: "0 4px 6px rgba(0, 0, 0, 0.1)", // For product or package cards
			button: "0 2px 4px rgba(0, 0, 0, 0.1)", // Button shadow
			nav: "0 2px 4px rgba(0, 0, 0, 0.2)", // Navbar shadow
		  },
		  spacing: {
			18: "4.5rem", // Custom spacing for layouts
			22: "5.5rem",
			36: "9rem",
			72: "18rem",
			96: "24rem",
		  },
		  borderRadius: {
			xl: "1rem", // For cards or buttons
			"2xl": "1.5rem", // For modal/dialog boxes
		  },
		},
	  },
	
  plugins: [require("tailwindcss-animate")],
}
