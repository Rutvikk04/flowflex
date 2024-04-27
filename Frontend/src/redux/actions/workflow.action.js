import Api from "../../utils/api"

export const saveWorkflow = (workflowName, nodes, edges) => {
    return async dispatch => {
        await Api.post("/workflow/create-workflow", {
            workflowName, nodes, edges
        })
    }
}

export const getAllWorkflows = () => {
    return async dispatch => {
        let res = await Api.get('/workflow/get-workflows')
        if (res.status === 200) {
            dispatch({
                type: "GET_ALL_WORKFLOWS",
                payload: res.data
            })
        }
    }
}

export const workflowExecutor = (formData) => {
    return async dispatch => {
        let res=await Api.post("/workflow/workflow-action", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res
    }
}