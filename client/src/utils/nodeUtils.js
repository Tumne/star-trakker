/**
 * Recursively searches node tree by array of ids, inserting new connection
 *
 * @param   {array} currNodes
 * @param   {array} ids
 * @param   {array} connection
 * @return  {array}
 */
export const insertNewConnections = (currNodes, ids, connections = []) => {
  if (ids.length) {
    const [selectedId, ...rest] = ids;
    return currNodes.map((node) => ({
      ...node,
      connections:
        node.id.toString() === selectedId
          ? insertNewConnections(node.connections, rest, connections)
          : [],
    }));
  }
  return connections;
};
