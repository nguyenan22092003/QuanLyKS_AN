import { IoHome } from "react-icons/io5";
import { ROUTER } from "../../../router/Router";
import { BsCardHeading } from "react-icons/bs";

export const menuItems = [
  {
    label: 'Trang chủ',
    key: ROUTER.HOME,
    icon: <IoHome style={{color: "#fff"}} />
  },
  {
    label: 'Flashcard',
    key: ROUTER.FLASH_CARD,
    icon: <BsCardHeading style={{color: "#fff"}} />
  },
];