export default function Footer() {
  return (
    <footer className="w-full py-6 bg-[#111827] text-gray-300">
      <div className="px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 items-center">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">About Us</h3>
            <ul className="space-y-2">
              <li>
                <div className="hover:text-blue-400" href="#">
                  Our Story
                </div>
              </li>
              <li>
                <div className="hover:text-blue-400" href="#">
                  Team
                </div>
              </li>
              <li>
                <div className="hover:text-blue-400" href="#">
                  Careers
                </div>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <div className="hover:text-blue-400" href="#">
                  FAQs
                </div>
              </li>
              <li>
                <div className="hover:text-blue-400" href="#">
                  Contact Us
                </div>
              </li>
              <li>
                <div className="hover:text-blue-400" href="#">
                  Shipping
                </div>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <div className="hover:text-blue-400" href="#">
                  Terms of Service
                </div>
              </li>
              <li>
                <div className="hover:text-blue-400" href="#">
                  Privacy Policy
                </div>
              </li>
              <li>
                <div className="hover:text-blue-400" href="#">
                  Cookie Policy
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p>&copy; 2024 S&D. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
