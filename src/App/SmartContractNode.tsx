import { FC, memo, useEffect } from 'react';
import { Connection, Edge, Handle, NodeProps, Position } from 'reactflow';

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const SmartContractNode: FC<NodeProps> = ({ data, isConnectable }) => {
  useEffect(() => {
    if (data.value) {
      try {
        const msg = JSON.parse(data.value);
        (async () => {
          data.onOutput(await window.tokenContract.balance(msg));
        })();
      } catch (ex) {
        console.log(ex);
      }
    }
  }, [data.value]);

  return (
    <>
      <Handle type="target" position={Position.Left} onConnect={onConnect} />
      <div>
        <label htmlFor="text">Address:</label>
        {window.tokenContract.contractAddress}
      </div>
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </>
  );
};

export default memo(SmartContractNode);
