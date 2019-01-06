import { FETCH } from "../arsVariables";

const fetch = payload => {
    return {
        type: FETCH,
        payload
    };
};

export default fetch;
