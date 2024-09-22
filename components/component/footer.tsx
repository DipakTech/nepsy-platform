// import Newsletter from "../ui/newsletter";

import BackgroundDots from "../ui/dot-background-pattern";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-500 transition-all duration-300 dark:bg-gray-900">
      <div className="w-screen overflow-hidden ">
        <BackgroundDots dotColor="blue" />
      </div>

      <div className="container mx-auto px-4 py-10 ">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative z-10 space-y-4">
            <h2 className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent dark:from-blue-400 dark:to-purple-500">
              Dipak Giri
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Empowering your digital journey with web tools.
            </p>
            <div className="flex space-x-4">
              <a
                href=""
                target="_blank"
                className="transform text-blue-500 transition-colors duration-200 hover:scale-110 hover:text-blue-400"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href=""
                target="_blank"
                className="transform text-pink-500 transition-colors duration-200 hover:scale-110 hover:text-pink-400"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                className="transform text-blue-400 transition-colors duration-200 hover:scale-110 hover:text-blue-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black dark:text-white"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  viewBox="0 0 512 462.799"
                >
                  <path
                    fillRule="nonzero"
                    d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              Popular Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors duration-200 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-gray-600 transition-colors duration-200 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="relative z-10">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://courses.dipakgiri12.com.np"
                  className="text-gray-600 transition-colors duration-200 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="https://portfolio.dipakgiri12.com.np/"
                  className="text-gray-600 transition-colors duration-200 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
          <div className="relative z-10">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Stay updated with our latest tools and features.
            </p>
            {/* <Newsletter /> */}
          </div>
        </div>
      </div>
      <div className=" border-t border-gray-200 pt-8 pb-5 dark:border-gray-700">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
          <div className="mb-4 text-sm text-gray-600 md:mb-0 dark:text-gray-400">
            © 2024 Dipak. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-2 z-30">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Crafted with ❤️ by Dipak Giri
            </span>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 h-full w-full opacity-10 dark:opacity-20">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-blue-500 blur-3xl filter"></div>
        <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-purple-500 blur-3xl filter"></div>
      </div>
    </footer>
  );
}
