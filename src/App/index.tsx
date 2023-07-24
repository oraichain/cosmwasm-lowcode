import { useEffect, MouseEvent, ChangeEvent, useCallback } from 'react';
import ReactFlow, { Controls, addEdge, Node, ReactFlowInstance, Position, SnapGrid, Connection, useNodesState, useEdgesState } from 'reactflow';

import MessagetNode from './MessageNode';
import SmartContractNode from './SmartContractNode';



const onNodeDragStop = (_: MouseEvent, node: Node) => {};
const onNodeClick = (_: MouseEvent, node: Node) => {};

const snapGrid: SnapGrid = [16, 16];

const nodeTypes = {
  messageNode:MessagetNode,
  contractNode: SmartContractNode
};

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onOutput = (result:any)=>{    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === 'output') {
          return {...node,
            data:{
              ...node.data,
              label:JSON.stringify(result)
            }
          };
        }                

        return node;
      
      })
    );
  }

  const onChange = (value:string) => {    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === 'output') {
          return node;
        }                

        return {
          ...node,
          data: {
            ...node.data,
            value
          }
        };
      
      })
    );
  };

  useEffect(() => {
    

    setNodes([
      {
        id: '1',
        type: 'messageNode',
        data: { onChange:(event: ChangeEvent<HTMLInputElement>)=>onChange(event.target.value) },      
        position: { x: 0, y: 50 },        
      },
      {
        id: '2',
        type: 'contractNode',
        data: { onOutput:onOutput },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 250, y: 50 },        
      },
      {
        id: '3',
        type: 'output',
        data: {  },
        position: { x: 550, y: 250 },        
      },    
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        sourceHandle: 'a',
        animated: true,        
      },    
      {
        id: 'e2b-4',
        source: '2',
        target: '3',
        sourceHandle: 'b',        
        animated: true,        
      }
    ]);
  }, []);

  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge({ ...connection, animated: true, style: { stroke: '#fff' } }, eds)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}      
      onInit={(reactFlowInstance: ReactFlowInstance) => {
        onChange(`{"decimals": 6, "name": "cw20 orai", "symbol": "orai", "initial_balances": [ { "address": "orai1hz4kkphvt0smw4wd9uusuxjwkp604u7m4akyzv", "amount": "10000000" } ] }`)
      }}
      nodeTypes={nodeTypes}      
      snapToGrid={true}
      snapGrid={snapGrid}
      fitView
      minZoom={0.3}
      maxZoom={2}
    >
      <Controls />
    </ReactFlow>
  );
};

export default App;
