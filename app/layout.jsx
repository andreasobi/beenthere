import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Beenthere",
  description: "Discover and share experiences",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        
        <div className="main">
          <div className="grandient"></div>
        </div>

        <main className="app">
          <Nav>

          </Nav>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
