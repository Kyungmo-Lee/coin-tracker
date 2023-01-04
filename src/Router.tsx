import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import HomeBtn from "./components/HomeBtn";

interface IHome {
  isDarkMode: boolean;
  toggleDarkMode: React.MouseEventHandler<HTMLButtonElement>;
}

function Router({ isDarkMode, toggleDarkMode }: IHome) {
  return (
    <BrowserRouter>
      <HomeBtn isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
