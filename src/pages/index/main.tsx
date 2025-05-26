import { useData } from "@/store/store";
import Dashboard from "./dashboard";
import { Navigation } from "./navigation";
import { Welcome } from "./welcome";

const Main = () => {
  const { user } = useData();
  return (
    <div className="h-screen w-full bg-gray-100">
      {!user ? (
        <Welcome />
      ) : (
        <>
          <Navigation />
          <Dashboard />
        </>
      )}
    </div>
  );
};

export { Main };
