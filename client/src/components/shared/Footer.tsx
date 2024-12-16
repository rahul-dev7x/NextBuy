
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    // Footer Data
    const footerData = [
        {
            title: "Quick Links",
            links: [
                { name: "Home", href: "/" },
                { name: "Shop", href: "/shop" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
            ],
        },
        {
            title: "Customer Support",
            links: [
                { name: "FAQs", href: "/faq" },
                { name: "Returns & Refunds", href: "/returns" },
                { name: "Shipping Info", href: "/shipping" },
                { name: "Terms & Conditions", href: "/terms" },
            ],
        },
    ];

    // Social Media Data
    const socialMedia = [
        { icon: <FaFacebookF />, href: "https://facebook.com" },
        { icon: <FaTwitter />, href: "https://twitter.com" },
        { icon: <FaInstagram />, href: "https://instagram.com" },
        { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
    ];

    return (
        <>
            <footer className="bg-gray-100 text-gray-800 py-10 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">NextBuy</h3>
                        <p className="text-sm">
                            Discover the best deals and shop for your favorite products with ease. Experience seamless shopping with NextBuy.
                        </p>
                    </div>

                    {/* Dynamic Footer Links */}
                    {footerData.map((section, index) => (
                        <div key={index}>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href={link.href}
                                            className="hover:text-gray-600 text-gray-800"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter */}
                    
                    <div>
  <h4 className="text-lg font-semibold text-gray-900 mb-4">Subscribe</h4>
  <p className="text-sm mb-4 text-gray-700">
    Stay updated with our latest products and offers. Subscribe to our newsletter!
  </p>
  <form className="flex shadow-md rounded-lg overflow-hidden">
    <input
      type="email"
      placeholder="Enter your email"
      className="flex-grow px-4 py-3 border-none bg-slate-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
    <button
      type="submit"
      className="bg-teal-600 text-white px-5 py-3 hover:bg-teal-700 transition-all"
    >
      Subscribe
    </button>
  </form>
</div>


                    {/* Social Media */}
                    <div className="mt-8 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">&copy; {new Date().getFullYear()} NextBuy. All rights reserved.</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            {socialMedia.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-800 hover:text-blue-500"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    </div>
            </footer>
        </>
    )
}



export default Footer;
