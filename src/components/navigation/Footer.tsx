import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1f2937] text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-bold mb-4">BuitenBijOns</h3>
          <p className="text-sm">Discover the best camping spots, reconnect with nature, and create unforgettable memories.</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Stay Connected</h4>
          <p className="text-sm mb-2">Follow us on social media:</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:scale-110 transition">
              <span>🌿</span>
            </Link>
            <Link href="#" className="hover:scale-110 transition">
              <span>📸</span>
            </Link>
            <Link href="#" className="hover:scale-110 transition">
              <span>📧</span>
            </Link>
          </div>
          {/* <div className="flex space-x-4">
            <Link href="/cookiepage" className="hover:underline">
              <span>Cookies</span>
            </Link>
            <Link href="privacypage" className="hover:underline">
              <span>Privacy Policy</span>
            </Link>
          </div> */}
        </div>
      </div>
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BuitenBijOns. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
