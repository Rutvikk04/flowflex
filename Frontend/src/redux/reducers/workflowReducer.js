import { GET_ALL_WORKFLOWS } from "../action.type"

const initialState = {
    allWorkFlows: null
}

export const workflowReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_WORKFLOWS: {
            return {
                allWorkFlows: action.payload
            }
        }
        default:return state
    }
}
