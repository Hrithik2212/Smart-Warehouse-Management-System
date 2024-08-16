import React, { useRef, useEffect } from 'react';
import { DataSet, Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css'; // Import the necessary CSS

const NetworkGraph = () => {
  const networkRef = useRef(null);

  useEffect(() => {
    // Define nodes and edges
    const nodes = new DataSet([
      { id: 1, label: 'Warehouse 1', title: 'Warehouse 1' },
      { id: 2, label: 'Warehouse 2', title: 'Warehouse 2' },
      { id: 3, label: 'Ds 1', title: 'Ds 1' },
      { id: 4, label: 'Ds 2', title: 'Ds 2' },
      { id: 5, label: 'Ds 3', title: 'Ds 3' },
      { id: 6, label: 'Ds 4', title: 'Ds 4' },
      { id: 7, label: 'Ds 5', title: 'Ds 5' },
      { id: 8, label: 'Ds 6', title: 'Ds 6' },
      { id: 9, label: 'Ds 7', title: 'Ds 7' },
      { id: 10, label: 'Ds 8', title: 'Ds 8' },
      { id: 11, label: 'Ds 9', title: 'Ds 9' },
    ]);

    const edges = new DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 3 },

      { from: 1, to: 5 },
      { from: 8, to: 6 },
      { from: 2, to: 8 },
      { from: 8, to: 9},
      { from: 3, to: 7},
      { from: 3, to: 11},
      { from: 5, to: 10},
      { from: 8, to: 4},
      
    ]);

    const data = {
      nodes: nodes,
      edges: edges
    };

    const options = {
      layout: {
        hierarchical: true
      },
      edges: {
        color: '#000000'
      }
    };

    // Create the network
    if (networkRef.current) {
      new Network(networkRef.current, data, options);
    }

    // Cleanup function to destroy the network instance
    return () => {
      networkRef.current && networkRef.current.destroy();
    };
  }, []);

  return <div ref={networkRef} style={{ height: '500px' }}></div>;
};

export default NetworkGraph;
