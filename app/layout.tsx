import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/Headers/AppHeader";
import LinksContainer from "@/components/Headers/LinksContainer";

export const metadata: Metadata = {
  title: "Mainstack Exercise",
  description:
    "Frontend Engineering Exercise for Mainstack | Exercise carried out by George Akande",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-[1440px] mx-auto h-screen">
          {/* Fixed Header */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-white">
            <div className="max-w-[1440px] mx-auto p-4">
              <AppHeader />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="pt-[80px]">
            <div className="grid grid-cols-1 lg:grid-cols-10">
              {/* Fixed Sidebar - Hidden on mobile */}
              <div className="hidden lg:block lg:col-span-1 fixed left-0 top-[80px] h-[calc(100vh-80px)] w-[50px] flex justify-center items-start pt-36 bg-white z-40 pl-2">
                <LinksContainer />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-8 lg:col-start-2 lg:pl-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
