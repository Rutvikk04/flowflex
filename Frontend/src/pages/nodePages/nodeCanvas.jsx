import React, { Fragment, useCallback, useState } from 'react';
import ReactFlow, {
  useNodesState, useEdgesState, addEdge, MiniMap,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import AddNewNode from './addNewNode';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { saveWorkflow } from '../../redux/actions/workflow.action';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NodeCanvas() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const styles = {
    background: 'rgb(49, 143, 58)',
  };

  const [workflowName, setWorkflowName] = useState(location.state?.node?.workflowName || '')
  const [nodes, setNodes, onNodesChange] = useNodesState(location.state?.node?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(location.state?.node?.edges || []);
  const [newNode, setNewNode] = useState({ id: '', data: { label: '' } })
  const { id, data } = newNode
  //add new Node
  const addNewNode = () => {
    const randomPosition = Math.floor(Math.random() * 400) + 1
    setNodes([...nodes, { id, position: { x: 0, y: randomPosition }, data: { label: data.label } }])
    setNewNode({ id: '', data: { label: '' } })
  }

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  //save workflow
  const saveWorkFlow = () => {
    if (workflowName == '') {
      toast.warn("workflow name is required")
    }
    else if (!nodes.length || !edges?.length) {
      toast.warn("please add Nodes and edges..")
    }
    else {
      dispatch(saveWorkflow(workflowName, nodes, edges))
        .then(() => {
          toast.success("workflow created successfully")
          navigate("/all-workflow")
        })
        .catch((e) => console.log("something went wrong while creating workflow", e))
    }
  }




  return (
    <div className="bg-cover bg-slate-900 grid place-content-center h-screen max-md:p-2">
      <div className=" w-screen bg-slate-900  rounded-md ">
        <div className=' pt-8 max-md:pt-80 border-b border-white flex items-center px-3 justify-between w-full'>
          <h1 className='hero-text'>Canvas</h1>
          {
            !location?.state?.node ?
              <button className='hero-btn my-2 mx-0' onClick={saveWorkFlow}>Save Workflow</button> : <></>
          }
        </div>
        <div className='flex max-md:items-center max-md:flex-col-reverse space-x-2 mt-1'>

          <div className='max-md:border m-2 rounded-md'>
            <label className='text-white mx-2'>Workflow Name:</label>
            <input  type='text' disabled={location.state?.node} value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} className='input w-fit m-2' placeholder='workflow name here..' />
            {
              !location?.state?.node ?
                <AddNewNode newNode={newNode} setNewNode={setNewNode} addNewNode={addNewNode} /> :
                <></>
            }
          </div>
          <div className=' w-screen flex-0 h-[30rem] border rounded-lg p-1'>
            <ReactFlow
              nodes={nodes}
              style={styles}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
            >
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </div>

      </div>
    </div>
  );

}