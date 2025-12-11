import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-maroon">
        Welcome to the Admin Dashboard
      </h2>
      <p className="text-gray-600">Manage your site from here.</p>
    </div>
  );
};

export default Home;
