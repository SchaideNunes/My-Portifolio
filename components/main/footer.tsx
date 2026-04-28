"use client";

import Link from "next/link";
import { FOOTER_DATA } from "@/constants";
import { useLang } from "@/lib/lang-context";
import { TRANSLATIONS } from "@/constants/translations";

export const Footer = () => {
  const { lang } = useLang();

  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg px-[10%] md:px-10 py-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
          {FOOTER_DATA.map((column) => (
            <div
              key={column.title}
              className="min-w-[200px] h-auto flex flex-col items-center justify-start"
            >
              <h3 className="font-bold text-[16px]">
                {column.title === "Connect" ? (lang === "PT" ? "Conectar" : "Connect") : column.title === "Social" ? "Social" : (lang === "PT" ? "Contato" : "Contact")}
              </h3>
              {column.data.map(({ icon: Icon, name, link }) => (
                <Link
                  key={`${column.title}-${name}`}
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-row items-center my-[15px]"
                >
                  {Icon && <Icon />}
                  <span className="text-[15px] ml-[6px]">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mb-[20px] text-[15px] text-center">
          {TRANSLATIONS[lang].footer.rights}
        </div>
      </div>
    </div>
  );
};
