import TokenInfo from "./TokenInfo";
import ProtectedMessage from "./ProtectedMessage";
import Moods from "./Moods";
import Users from "./Users";

const Dashboard = () => {
  return (
    <div>
      <hr />
      <h1>Dashboard</h1>
      <TokenInfo />
      <ProtectedMessage />
      <Moods />
      <Users />
    </div>
  );
};

export default Dashboard;
