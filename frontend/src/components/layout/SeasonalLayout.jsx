import React from "react"
// import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import "@/index.css"
import DefaultLayout from "./DefaultLayout";
import { SeasonalDecoration, DecorationThemeSwitcher } from "@/components/layout/Decoration/seasonal-decoration"

// const _geist = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })


export default function SeasonalLayout({ children }) {
  return (
    <>
      <SeasonalDecoration />
      <DecorationThemeSwitcher />
      <DefaultLayout>
      {children}
      </DefaultLayout>
      {/* <Analytics /> */}
    </>
  );
};
