import React from "react";
import Form from "features/users/pages/Form";
import UserList from "features/users/pages/UserList";

function Home() {

    return (
        <div style={{ maxWidth: "1400px", width: "100%", margin: "auto" }}>
            <h1>Quản lý User</h1>
            <Form />
            <UserList />
        </div>
    );
}

export default Home;
