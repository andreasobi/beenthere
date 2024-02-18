import "@styles/globals.css";
import { Inter as FontSans } from "next/font/google"

import Nav from "@components/Nav";
import Provider from "@components/Provider";

import { cn } from "../lib/utils"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Beenthere",
  description: "Discover and share experiences",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >

      { /* Login Session */ }
        <Provider>

          { /* Background */ }
          <div className="main">
            <div className="grandient"></div>
          </div>

          <main className="app">

          { /* Navigationbar */ }
            <Nav>
            </Nav>
            
            {children}

          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
