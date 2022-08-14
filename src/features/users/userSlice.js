const initialState = {
    userList: [],
    userSelected: null,
};

const reducer = (currentState = initialState, action) => {
    switch (action.type) {
        case "CREATE_USER": {
            let cloneUserList = [...currentState.userList];

            let index = cloneUserList.findIndex((item) => item.id === action.payload.id);

            if (index === -1) {
                cloneUserList.push(action.payload);
            } else {
                cloneUserList[index] = action.payload;
            }

            return { ...currentState, userList: cloneUserList, userSelected: null };
        }

        case "GET_USER_SELECTED": {
            currentState.userSelected = action.payload;
            return { ...currentState };
        }

        case "UPDATE_USER": {
            let cloneUserList = [...currentState.userList];

            let index = cloneUserList.findIndex((item) => item.id === action.payload.id);

            if (index !== -1) cloneUserList[index] = action.payload;

            return { ...currentState, userList: cloneUserList, userSelected: null };
        }

        case "DELETE_USER": {
            let cloneUserList = [...currentState.userList];

            let index = cloneUserList.findIndex((item) => item.id === action.payload);

            if (index !== -1) cloneUserList.splice(index, 1);

            return { ...currentState, userList: cloneUserList, userSelected: null };
        }

        default:
            return currentState;
    }
};

export default reducer;
