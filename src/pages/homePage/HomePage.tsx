import AdsList from "@/components/adsList/AdsList";
import FiltersPanel from "@/components/filters/FiltersPanel";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <>
      <FiltersPanel />
      <AdsList />
    </>
  );
};

export default HomePage;
