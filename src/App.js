import "./styles.css";
import Posts from "./Posts";
import { UserProvider } from "./contexts/postsContext";

import { Typography, Divider } from "antd";

const { Text, Link } = Typography;

export default function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Users</h1>

      <Divider />
      <UserProvider>
        {" "}
        <Posts />
      </UserProvider>
    </div>
  );
}
