import { FETCHED } from "../arsVariables";

const initialState = {
    images: [],
    fetched: false
};

const fetch_reducer = (state = initialState, action) => {
    const { type, data } = action;
    console.log({ action });
    switch (type) {
        case FETCHED:
            return {
                ...state,
                url: data.url,
                error: data.error,
                fetched: true
            };

        default:
            return state;
    }
};

export default fetch_reducer;
