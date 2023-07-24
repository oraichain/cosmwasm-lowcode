import { FC, memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const MessageNode: FC<NodeProps> = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Msg:</label>
        <textarea onChange={data.onChange} rows={10} value={data.value} className="nodrag"></textarea>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
};

export default memo(MessageNode);
