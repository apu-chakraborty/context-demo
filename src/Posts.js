import React, { useContext } from "react";
import { CountContext, UserContext } from "./contexts/postsContext";
import { Card, Space, Button } from "antd";

function Posts() {
  const { state, addUser } = useContext(UserContext);

  return (
    <div>
      <Button
        onClick={() =>
          addUser({
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: { lat: "-37.3159", lng: "81.1496" }
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets"
            }
          })
        }
        type="primary"
      >
        {" "}
        Add
      </Button>

      <br />
      <br />

      <Space direction="vertical" size={16}>
        {state?.users?.map((user, i) => (
          <Card
            title={user?.name}
            extra={<a href="#">Edit</a>}
            style={{ width: "100%" }}
          >
            <p>{user?.username}</p>
            <p>{user?.city}</p>
            <p>{user?.phone}</p>
          </Card>
        ))}
      </Space>

      {/* {JSON.stringify(state)} */}

      {/* <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button> */}
    </div>
  );
}

export default Posts;
