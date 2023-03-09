import React from "react";
import { BsCashStack } from "react-icons/bs";
import { BiDish } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";
import { FaHandsWash } from "react-icons/fa";
import { MdOutlineBadge } from "react-icons/md";
import { FaToiletPaper } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Header() {
  const [listItemSelected, setListItemSelected] = React.useState<null | number>(
    null
  );

  const icon = {
    size: 24,
    color: "#828282",
    colorActive: "#772d2e",
  };

  const menuItems = [
    {
      name: "Caixa",
      icon: (
        <BsCashStack size={icon.size} color={icon.color} className="icon" />
      ),
      adress: "/caixa",
    },
    {
      name: "Pratos",
      icon: <BiDish size={icon.size} color={icon.color} className="icon" />,
      adress: "/pratos",
    },
    {
      name: "Alimentos",
      icon: (
        <GiKnifeFork size={icon.size} color={icon.color} className="icon" />
      ),
      adress: "/alimentos",
    },
    // {
    //   name: "Descartáveis",
    //   icon: (
    //     <FaToiletPaper size={icon.size} color={icon.color} className="icon" />
    //   ),
    //   adress: "/descartaveis",
    // },
    // {
    //   name: "Produtos de limpeza",
    //   icon: (
    //     <FaHandsWash size={icon.size} color={icon.color} className="icon" />
    //   ),
    //   adress: "/produtos-de-limpeza",
    // },
    // {
    //   name: "Colaboradores",
    //   icon: (
    //     <MdOutlineBadge size={icon.size} color={icon.color} className="icon" />
    //   ),
    //   adress: "/colaboradores",
    // },
  ];

  return (
    <>
      <header>
        <div className="system-header">
          <div className="pt-20">
            <ul className="bg-[#ffffff]">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={
                    "item" + (listItemSelected === index ? " active" : "")
                  }
                  onClick={() => setListItemSelected(index)}
                >
                  <Link
                    to={item.adress}
                    className="flex gap-4 pr-8 w-full h-full items-center"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
9;
