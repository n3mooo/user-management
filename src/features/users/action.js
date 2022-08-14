export const CREATE_USER = (data) => {
    const createAction = {
        type: "CREATE_USER",
        payload: data,
    };
    return createAction;
};

export const GET_USER_SELECTED = (data) => {
    const getUserSelectedAction = {
        type: "GET_USER_SELECTED",
        payload: data,
    };
    return getUserSelectedAction;
};

export const UPDATE_USER = (data) => {
    const updateAction = {
        type: "UPDATE_USER",
        payload: data,
    };
    return updateAction;
};

export const DELETE_USER = (id) => {
    const deleteAction = {
        type: "DELETE_USER",
        payload: id,
    };
    return deleteAction;
};
