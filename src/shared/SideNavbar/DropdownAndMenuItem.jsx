import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

export const MenuItem = ({ to, icon: Icon, label, isActive, onClick }) => (
  <>
    <li>
      <Link
        to={to}
        onClick={onClick} // Collapse all dropdowns when a menu item is clicked
        className={`flex items-center h-11 pr-6 pl-4 hover:bg-secondaryNavBarColor hover:border-navBorderColor hover:border-l-4 cursor-pointer border-l-4 border-transparent  text-white ${
          isActive &&
          "bg-secondaryNavBarColor border-red-200 border-l-4 text-white"
        }`}
      >
        <Icon size={25} className="" />
        <span className="ml-2 tracking-wide truncate sm:font-bold uppercase">
          {label}
        </span>
      </Link>
    </li>
  </>
);

export const DropdownMenu = ({ label, icon: Icon, isOpen, onClick, children }) => (
  <>
    <li
      className={`flex items-center justify-between w-full  px-4 py-2 text-white hover:bg-secondaryNavBarColor  hover:border-navBorderColor border-l-4 border-transparent hover:border-l-4 cursor-pointer hover:text-white ${
        isOpen
          ? "bg-secondaryNavBarColor  border-navBorderColor border-l-4 text-white"
          : ""
      }`}
      onClick={onClick} // Toggle the dropdown
    >
      <span className="flex items-center gap-2 sm:font-bold uppercase">
        <Icon size={25} className="" />
        {label}
      </span>
      <FiChevronDown
        size={20}
        className={`transition-transform duration-300 ${
          isOpen ? "-rotate-180" : ""
        }`}
      />
    </li>
    <li
      className={`bg-[#eadfd3] overflow-hidden duration-300 ease-in-out transition-all ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <ul className="space-y-1.5 py-1 pb-2 list-none sm:font-bold">
        {children}
      </ul>
    </li>
  </>
);
// export const ChildDropdownMenu = ({
//   label,
//   icon: Icon,
//   isOpen,
//   onClick,
//   children,
// }) => (
//   <>
//     <li
//       className={`flex items-center justify-between w-full  pr-4 pl-8 py-2 text-white hover:bg-success-50  hover:border-primaryVariant-100 hover:border-l-2 cursor-pointer ${
//         isOpen
//           ? "bg-success-50 border-primaryVariant-100 border-l-2"
//           : ""
//       }`}
//       onClick={onClick} // Toggle the dropdown
//     >
//       <span className="flex items-center gap-2">
//         <Icon size={20} className="text-white" />
//         {label}
//       </span>
//       <FiChevronDown
//         size={20}
//         className={`transition-transform duration-300 ${
//           isOpen ? "-rotate-180" : ""
//         }`}
//       />
//     </li>
//     <li
//       className={` overflow-hidden duration-300 ease-in-out transition-all ${
//         isOpen ? "max-h-screen" : "max-h-0"
//       }`}
//     >
//       <ul className="space-y-1.5 py-1 pb-2 list-none">{children}</ul>
//     </li>
//   </>
// );

export const ChildMenuItem = ({ to, icon: Icon, label, isActive, onClick }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center h-[34px] pr-6 pl-8 hover:bg-secondaryNavBarColor hover:border-navBorderColor hover:border-l-4 cursor-pointer border-l-4 border-transparent hover:text-white  ${
        isActive &&
        " bg-secondaryNavBarColor border-red-200 border-l-4 text-white"
      }`}
    >
      <Icon size={25} className="font-bold" />
      <span className="ml-2 text-sm tracking-wide truncate uppercase">{label}</span>
    </Link>
  </li>
);
// export const SubChildMenuItem = ({ to, icon: Icon, label, isActive }) => (
//   <li>
//     <Link
//       to={to}
//       className={`flex items-center h-[34px] pr-6 pl-12 bg-secondaryNavBarColor hover:text-white ${
//         isActive && "text-white"
//       }`}
//     >
//       <Icon size={20} className="" />
//       <span className="ml-2 text-xs tracking-wide truncate ">{label}</span>
//     </Link>
//   </li>
// );
