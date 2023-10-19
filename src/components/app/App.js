import AppHeader from "../appHeader/AppHeader";
import AppHeaderNavigation from "../appHeaderNavigation/AppHeaderNavigation";
import MainMenuPanel from "../mainMenuPanel/MainMenuPanel";
import Footer from "../footer/Footer";

import "./app.sass";

const App = () => {
  return (
    <div className="container">
      <AppHeader />
      <AppHeaderNavigation />
      <main className="main">
        <MainMenuPanel />
      </main>
      <Footer />
    </div>
  );
};

export default App;
