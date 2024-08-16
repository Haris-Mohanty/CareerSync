import logo from "../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className="pt-8 pb-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-24 pb-14 border-b-2 border-gray-200">
            {/* Left Side  */}
            <div className="block w-full lg:max-w-full max-lg:mx-auto">
              <div className="flex flex-col gap-8 w-full lg:max-w-xs ">
                <img src={logo} alt="Career Sync" />
                <p className="text-base font-normal text-gray-600 max-[470px]:text-center">
                  Trusted in more than 50 companies &amp; 5 thousand customers.
                  Follow us on social media.
                </p>
                <div className="flex flex-col min-[470px]:flex-row max-[470px]:gap-4 items-center max-[470px]:justify-center">
                  <div className="flex items-center ml-4 md:ml-0 md:justify-start mb-2">
                    <Avatar className="-mr-1">
                      <AvatarImage src={user1} alt="User 1" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar className="-mr-1">
                      <AvatarImage src={user2} alt="User 2" />
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src={user3} alt="User 3" />
                      <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                    <p className="text-gray-500 text-base font-normal ml-2">
                      <span className="text-gray-900 font-medium">1K+ </span>
                      Members Join
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full mx-auto flex flex-col min-[470px]:flex-row max-[470px]:items-center min-[470px]:justify-between gap-6 sm:gap-10 xl:gap-24">
              {/* Career Sync */}
              <div>
                <h6 className="text-lg font-medium text-gray-900 mb-7 max-[470px]:text-center">
                  CareerSync
                </h6>
                <ul className="flex flex-col max-[470px]:items-center gap-6">
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="about"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="contact"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Products */}
              <div>
                <h6 className="text-lg font-medium text-gray-900 max-[470px]:text-center mb-7">
                  Products
                </h6>
                <ul className="flex flex-col max-[470px]:items-center gap-6">
                  <li>
                    <Link
                      to="job"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600"
                    >
                      Add Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600"
                    >
                      View Profile
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h6 className="text-lg font-medium text-gray-900 max-[470px]:text-center mb-7">
                  Resources
                </h6>
                <ul className="flex flex-col max-[470px]:items-center gap-6">
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600"
                    >
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600"
                    >
                      Quick Start
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600"
                    >
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-5 md:flex-row items-center first-letter:items-center justify-between pt-7">
            <p className="font-normal text-sm text-gray-500">
              ©<a href="https://pagedone.io/">Career Sync </a>2024, All rights
              reserved.
            </p>
            <ul className="flex items-center gap-9">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0"
                >
                  Cookies
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <button className="w-9 h-9 flex items-center relative border border-gray-300 overflow-hidden justify-center rounded-full bg-white shadow-sm shadow-gray-200 group transition-all duration-300 focus-within:outline-0">
                <svg
                  className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white group-focus-within:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path
                    d="M29.3522 14.55C29.3522 18.4089 27.8124 22.1097 25.0717 24.8384C22.3309 27.5671 18.6136 29.1 14.7376 29.1C10.8616 29.1 7.14432 27.5671 4.40356 24.8384C1.66279 22.1097 0.123047 18.4089 0.123047 14.55C0.123047 10.6911 1.66279 6.99025 4.40356 4.2616C7.14432 1.53294 10.8616 0 14.7376 0C18.6136 0 22.3309 1.53294 25.0717 4.2616C27.8124 6.99025 29.3522 10.6911 29.3522 14.55Z"
                    fill
                  />
                  <path
                    d="M49.7196 35.445C49.7196 37.3564 49.3415 39.2491 48.6068 41.015C47.8721 42.7809 46.7952 44.3854 45.4376 45.737C44.0801 47.0885 42.4684 48.1606 40.6947 48.8921C38.921 49.6235 37.0199 50 35.1 50C31.2227 50 27.5041 48.4665 24.7624 45.737C22.0207 43.0074 20.4805 39.3052 20.4805 35.445C20.4805 31.5848 22.0207 27.8827 24.7624 25.1531C27.5041 22.4235 31.2227 20.89 35.1 20.89C37.0199 20.89 38.921 21.2665 40.6947 21.9979C42.4684 22.7294 44.0801 23.8015 45.4376 25.1531C46.7952 26.5046 47.8721 28.1092 48.6068 29.8751C49.3415 31.641 49.7196 33.5336 49.7196 35.445Z"
                    fill
                  />
                  <path
                    opacity="0.05"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.176758 15.795C0.40376 18.5441 1.40597 21.1727 3.06724 23.3762C4.72852 25.5797 6.98086 27.2679 9.56328 28.2451C12.1457 29.2224 14.9525 29.4487 17.6584 28.8978C20.3643 28.347 22.8585 27.0415 24.8521 25.1327C26.8457 23.2239 28.257 20.7899 28.9225 18.1127C29.5879 15.4356 29.4804 12.6248 28.6122 10.0062C27.744 7.38765 26.1508 5.06839 24.0171 3.3172C21.8835 1.56601 19.2967 0.454576 16.5566 0.111694C12.8361 1.35488 9.43753 3.4061 6.60533 6.11786C3.77313 8.82962 1.57765 12.1346 0.176758 15.795Z"
                    fill
                  />
                  <path
                    opacity="0.05"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M49.6811 34.4C49.4902 31.6174 48.5055 28.9476 46.8434 26.7064C45.1813 24.4652 42.9113 22.7464 40.302 21.7534C37.6928 20.7603 34.8534 20.5345 32.1197 21.1027C29.386 21.6708 26.8724 23.0092 24.8762 24.9594C22.88 26.9097 21.4848 29.3902 20.8555 32.1076C20.2263 34.825 20.3893 37.6656 21.3254 40.2933C22.2615 42.9211 23.9315 45.226 26.1377 46.9356C28.344 48.6451 30.9943 49.6877 33.7751 49.94C37.394 48.6528 40.6902 46.5967 43.4363 43.9135C46.1824 41.2303 48.313 37.9839 49.6811 34.3983V34.4Z"
                    fill
                  />
                  <path
                    opacity="0.1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.860352 19.1216C1.62798 21.4673 2.97863 23.5801 4.78599 25.2626C6.59336 26.9451 8.79838 28.1422 11.1948 28.742C13.5913 29.3418 16.1009 29.3246 18.4889 28.6922C20.877 28.0597 23.0654 26.8326 24.8496 25.1257C26.6337 23.4187 27.9554 21.2876 28.6908 18.9317C29.4263 16.5758 29.5516 14.072 29.0549 11.6546C28.5583 9.23718 27.456 6.98506 25.8511 5.10889C24.2462 3.23271 22.1911 1.79377 19.8781 0.926636C15.32 1.8752 11.1204 4.08384 7.75796 7.30082C4.3955 10.5178 2.00549 14.6137 0.860352 19.1216Z"
                    fill
                  />
                  <path
                    opacity="0.1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M49.0178 30.98C48.2615 28.6066 46.9097 26.466 45.0911 24.7619C43.2726 23.0578 41.0477 21.8469 38.6282 21.2444C36.2088 20.6419 33.6752 20.6678 31.2686 21.3198C28.8621 21.9717 26.6625 23.2279 24.8793 24.9689C23.0961 26.7098 21.7885 28.8777 21.081 31.266C20.3735 33.6544 20.2896 36.1839 20.8374 38.6138C21.3851 41.0437 22.5462 43.2932 24.2101 45.1483C25.8741 47.0033 27.9856 48.4021 30.3437 49.2117C34.8435 48.203 38.9734 45.9634 42.2714 42.7435C45.5694 39.5236 47.9054 35.4505 49.0178 30.98Z"
                    fill
                  />
                  <path
                    opacity="0.1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.39746 20.5016C2.34836 22.6419 3.80103 24.522 5.63274 25.9832C7.46445 27.4444 9.62136 28.4437 11.9212 28.8967C14.2211 29.3497 16.5963 29.243 18.8462 28.5857C21.0961 27.9284 23.1545 26.7397 24.8475 25.1203C26.5406 23.5008 27.8185 21.498 28.5733 19.2811C29.328 17.0643 29.5375 14.6985 29.184 12.3838C28.8304 10.069 27.9243 7.8733 26.5421 5.98211C25.1599 4.09093 23.3423 2.55987 21.2428 1.51831C16.3875 2.27323 11.881 4.49834 8.33208 7.89315C4.78311 11.288 2.36261 15.6889 1.39746 20.5016Z"
                    fill
                  />
                  <path
                    opacity="0.1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.4788 29.5717C47.5328 27.4066 46.0747 25.5033 44.2299 24.0253C42.385 22.5473 40.2086 21.5387 37.8874 21.0863C35.5663 20.6338 33.1699 20.7509 30.9041 21.4276C28.6383 22.1043 26.5708 23.3203 24.8792 24.9712C23.1877 26.622 21.9226 28.6584 21.1927 30.9054C20.4628 33.1524 20.2899 35.5427 20.6889 37.8712C21.0878 40.1996 22.0467 42.3965 23.4831 44.2731C24.9195 46.1497 26.7905 47.65 28.9354 48.645C33.7482 47.8281 38.1973 45.5648 41.6891 42.157C45.1809 38.7492 47.5494 34.3589 48.4788 29.5717Z"
                    fill
                  />
                  <path
                    d="M48.0711 25.1084C48.0711 28.1347 47.4724 31.1313 46.3092 33.9273C45.1459 36.7232 43.4409 39.2637 41.2914 41.4036C39.142 43.5436 36.5903 45.241 33.7819 46.3992C30.9735 47.5573 27.9635 48.1534 24.9238 48.1534C21.884 48.1534 18.874 47.5573 16.0656 46.3992C13.2573 45.241 10.7055 43.5436 8.55608 41.4036C6.40665 39.2637 4.70162 36.7232 3.53836 33.9273C2.37509 31.1313 1.77637 28.1347 1.77637 25.1084C1.77637 22.082 2.37509 19.0854 3.53836 16.2894C4.70162 13.4935 6.40665 10.953 8.55608 8.81308C10.7055 6.67315 13.2573 4.97567 16.0656 3.81755C18.874 2.65943 21.884 2.06335 24.9238 2.06335C27.9635 2.06335 30.9735 2.65943 33.7819 3.81755C36.5903 4.97567 39.142 6.67315 41.2914 8.81308C43.4409 10.953 45.1459 13.4935 46.3092 16.2894C47.4724 19.0854 48.0711 22.082 48.0711 25.1084Z"
                    fill
                  />
                  <path
                    className="fill-white group-hover:fill-sky-500 group-focus-within:fill-sky-500"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.4151 24.3084C17.4797 23.6934 16.6991 22.8709 16.1343 21.905C15.5889 20.8846 15.3197 19.7396 15.3534 18.5834C15.3121 17.116 15.8134 15.6849 16.7616 14.5634C17.7471 13.4371 19.0136 12.5918 20.4324 12.1134C21.9754 11.5688 23.6012 11.2954 25.2377 11.305C26.3084 11.2949 27.378 11.3769 28.4346 11.55C29.1909 11.6667 29.9337 11.8582 30.6521 12.1217C31.3117 12.3447 31.9072 12.7245 32.3873 13.2284C32.7411 13.6429 32.9315 14.172 32.9229 14.7167C32.9355 14.9997 32.8922 15.2823 32.7954 15.5486C32.6987 15.8148 32.5504 16.0594 32.359 16.2684C32.1778 16.4609 31.958 16.6131 31.7139 16.7147C31.4697 16.8164 31.2068 16.8654 30.9424 16.8584C30.5786 16.8554 30.2196 16.7747 29.8895 16.6217C29.0761 16.258 28.2381 15.9517 27.3818 15.705C26.5935 15.4974 25.7809 15.3965 24.9657 15.405C23.9033 15.366 22.8522 15.6345 21.939 16.1784C21.5537 16.4122 21.2383 16.7452 21.0258 17.1425C20.8133 17.5397 20.7115 17.9867 20.731 18.4367C20.7254 19.0275 20.9505 19.5972 21.3584 20.025C21.8431 20.5276 22.416 20.9371 23.0486 21.2334C23.7572 21.5845 24.8139 22.05 26.2188 22.63C26.3744 22.6792 26.5261 22.74 26.6726 22.8117C28.0436 23.3534 29.3581 24.0283 30.597 24.8267C31.5755 25.464 32.4006 26.3098 33.013 27.3034C33.6161 28.3476 33.9181 29.5382 33.8857 30.7434C33.9363 32.2189 33.513 33.672 32.6776 34.89C31.827 36.0433 30.6503 36.9157 29.2989 37.395C27.6702 37.9763 25.9491 38.2564 24.2199 38.2217C21.8437 38.3048 19.4788 37.8578 17.2972 36.9134C16.7395 36.6653 16.2505 36.2855 15.8723 35.8067C15.5583 35.368 15.3955 34.8392 15.4085 34.3C15.3929 34.0157 15.4393 33.7313 15.5444 33.4666C15.6495 33.2018 15.8109 32.9631 16.0175 32.7667C16.4504 32.388 17.0125 32.1899 17.5875 32.2134C18.2282 32.2221 18.8576 32.3838 19.4229 32.685C20.1259 33.0361 20.6804 33.2995 21.0864 33.475C21.5501 33.6689 22.0304 33.8207 22.5214 33.9284C23.1268 34.061 23.7453 34.1248 24.3651 34.1184C25.4611 34.1965 26.5518 33.9061 27.4635 33.2934C27.8048 33.0266 28.0776 32.6825 28.2592 32.2895C28.4408 31.8964 28.5261 31.4659 28.508 31.0334C28.509 30.4201 28.275 29.8297 27.854 29.3834C27.2975 28.8095 26.6461 28.3359 25.9285 27.9834C25.0798 27.5367 23.8862 26.9923 22.3478 26.35C20.972 25.8024 19.6545 25.1184 18.4151 24.3084Z"
                    fill
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_7092_54073"
                      x1="12.4584"
                      y1="0.176667"
                      x2="17.0069"
                      y2="28.9249"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.012" stopColor="#00B7F0" />
                      <stop offset="0.339" stopColor="#009DE5" />
                      <stop offset="0.755" stopColor="#0082D9" />
                      <stop offset={1} stopColor="#0078D4" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_7092_54073"
                      x1="22.446"
                      y1="42.7417"
                      x2="47.7384"
                      y2="28.124"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0078D4" />
                      <stop offset="0.37" stopColor="#007AD5" />
                      <stop offset="0.573" stopColor="#0082D9" />
                      <stop offset="0.735" stopColor="#0090DF" />
                      <stop offset="0.875" stopColor="#00A3E7" />
                      <stop offset={1} stopColor="#00BCF2" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_7092_54073"
                      x1="15.8904"
                      y1="9.48169"
                      x2="38.9459"
                      y2="49.4589"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#00B7F0" />
                      <stop offset={1} stopColor="#007CC1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute top-full left-0 w-full h-full rounded-full bg-sky-500 z-0 transition-all duration-500 group-hover:top-0 group-focus-within:top-0"></div>
              </button>

              <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full relative overflow-hidden bg-white shadow-sm shadow-gray-200 group transition-all duration-300 focus-within:outline-0">
                <svg
                  className="fill-black z-10 transition-all duration-300 group-hover:fill-white group-focus-within:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 72 72"
                  fill="none"
                >
                  <path
                    d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z"
                    fill
                  />
                </svg>
                <div className="absolute top-full left-0 w-full h-full rounded-full bg-black z-0 transition-all duration-500 group-hover:top-0 group-focus-within:top-0"></div>
              </button>
              
              <button className="w-9 h-9 flex items-center justify-center border border-gray-300 relative overflow-hidden rounded-full bg-white shadow-sm shadow-gray-200 group transition-all duration-300 focus-within:outline-0">
                <svg
                  className="relative z-10 fill-gray-900 transition-all duration-300 group-hover:fill-white group-focus-within:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 72 72"
                  fill="none"
                >
                  <path
                    d="M46.4927 38.6403L47.7973 30.3588H39.7611V24.9759C39.7611 22.7114 40.883 20.4987 44.4706 20.4987H48.1756V13.4465C46.018 13.1028 43.8378 12.9168 41.6527 12.8901C35.0385 12.8901 30.7204 16.8626 30.7204 24.0442V30.3588H23.3887V38.6403H30.7204V58.671H39.7611V38.6403H46.4927Z"
                    fill
                  />
                </svg>
                <div className="absolute top-full left-0 w-full h-full rounded-full bg-blue-500 z-0 transition-all duration-500 group-hover:top-0 group-focus-within:top-0"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
