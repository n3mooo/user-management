import styles from "./style.module.css";
import React, { useState, useEffect } from "react";
import { Card, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { CREATE_USER, UPDATE_USER } from "features/users/action";
import * as yup from "yup";
import isEmpty from "lodash.isempty";

const userSchema = yup.object().shape({
    fullName: yup.string().required("* This field is required"),
    phone: yup
        .string()
        .required("* This field is required")
        .matches(/^[0-9]+$/g, "* Please enter the correct phone number format"),
    email: yup
        .string()
        .required("* This field is required")
        .email("* Please enter correct email format"),
});

function Form(props) {
    const [user, setUser] = useState({
        id: "",
        fullName: "",
        phone: "",
        email: "",
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (props.userSelected && props.userSelected.id !== user.id) setUser(props.userSelected);
    }, [props.userSelected, user.id]);

    const handleChange = (e) => {
        const eValue = e.target.value;
        const eName = e.target.name;

        setUser({ ...user, [eName]: eValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) return;

        if (props.userSelected) {
            props.dispatch(UPDATE_USER({ ...user }));
        } else {
            props.dispatch(CREATE_USER({ ...user, id: Math.floor(Math.random() * 100 + 1) }));
        }

        resetForm();
    };

    const resetForm = () => {
        setUser({
            id: "",
            fullName: "",
            phone: "",
            email: "",
        });

        setErrors([]);
    };

    const validateForm = async () => {
        const validationErrors = {};
        try {
            await userSchema.validate(user, { abortEarly: false });
        } catch (err) {
            const errObj = { ...err };

            errObj.inner.forEach((err) => {
                if (!validationErrors[err.path])
                    validationErrors[err.path] = err.message;
            });

            console.log(validationErrors)
            setErrors(validationErrors);
        }

        return isEmpty(validationErrors);
    };

    return (
        <Card title='Form Đăng Ký' headStyle={{ backgroundColor: "#000", color: "#fff" }}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor='id'>Id</label>
                    <Input
                        value={user.id}
                        name='id'
                        prefix={<LockOutlined />}
                        onChange={handleChange}
                        disabled={true}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='fullName'>Full name</label>
                    <Input
                        value={user.fullName}
                        name='fullName'
                        prefix={<UserOutlined />}
                        onChange={handleChange}
                    />
                    <span>{errors.fullName}</span>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='phone'>Phone</label>
                    <Input
                        value={user.phone}
                        name='phone'
                        prefix={<MobileOutlined />}
                        onChange={handleChange}
                    />
                    <span>{errors.phone}</span>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='email'>Email</label>
                    <Input
                        value={user.email}
                        name='email'
                        prefix={<MailOutlined />}
                        onChange={handleChange}
                    />
                    <span>{errors.email}</span>
                </div>

                <div className={styles.btnGroup}>
                    <Button type='primary' className={styles.btn} htmlType='submit'>
                        Submit
                    </Button>
                    <Button type='default' className={styles.btn} onClick={resetForm}>
                        Reset
                    </Button>
                </div>
            </form>
        </Card>
    );
}

const mapStateToProp = (state) => {
    return {
        userSelected: state.user.userSelected,
    };
};

export default connect(mapStateToProp)(Form);
