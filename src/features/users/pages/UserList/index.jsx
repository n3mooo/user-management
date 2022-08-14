import React from "react";
import { Card, Table, Button } from "antd";
import { connect } from "react-redux";
import { GET_USER_SELECTED, DELETE_USER } from "features/users/action";

function UserList(props) {
    const getUserSelected = (userItem) => {
        props.dispatch(GET_USER_SELECTED(userItem));
    };

    const deleteUser = (id) => {
        props.dispatch(DELETE_USER(id));
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "",
            key: "action",
            render: (_, userItem) => {
                return (
                    <>
                        <Button
                            type='primary'
                            style={{ margin: "0 5px" }}
                            onClick={() => getUserSelected(userItem)}>
                            Chỉnh sửa
                        </Button>
                        <Button type='primary' danger onClick={() => deleteUser(userItem.id)}>
                            Xoá
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <Card title='Danh sách người dùng' headStyle={{ backgroundColor: "#fff", color: "fff" }}>
            <Table
                dataSource={props.userList.map((user) => {
                    return { ...user, key: user.id };
                })}
                columns={columns}></Table>
        </Card>
    );
}

const mapStateToProp = (state) => {
    return {
        userList: state.user.userList,
    };
};

export default connect(mapStateToProp)(UserList);
