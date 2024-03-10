import "@styles/globals.css";
import { Poppins } from "next/font/google"

import Nav from "@components/Nav";
import Provider from "@components/Provider";

import { cn } from "../lib/utils"

export const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

export const metadata = {
  title: "Beenthere",
  description: "Discover and share experiences",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>

      { /* Login Session */ }
        <Provider>

          { /* Background */ }
          <div className="main">
            <div className="grandient"></div>
          </div>

          <main className="app" >

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
