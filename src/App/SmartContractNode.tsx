import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'reactflow';
import { OraiswapTokenClient } from '@oraichain/oraidex-contracts-sdk';

const sender = 'orai1hz4kkphvt0smw4wd9uusuxjwkp604u7m4akyzv';
const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const SmartContractNode: FC<NodeProps> = ({ data, isConnectable }) => {
  const [contractAddress, setContractAddress] = useState('');
  useEffect(() => {
    if (data.value) {
      try {
        const msg = JSON.parse(data.value);

        (async () => {
          const { contractAddress } = await window.client.instantiate(sender, window.codeId, msg, 'oraichain token', 'auto');
          const tokenContract = new OraiswapTokenClient(window.client, sender, contractAddress);
          setContractAddress(contractAddress);
          data.onOutput(await tokenContract.balance({ address: sender }));
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
        {contractAddress}
      </div>
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </>
  );
};

export default memo(SmartContractNode);
