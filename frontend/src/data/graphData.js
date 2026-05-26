// Graphic layout and adjacency structure for nodes A, B, C, D, E.
// Matches the exact backend graph data structure, enriched with visual coordinates for high-fidelity SVG rendering.

export const graphData = {
  nodes: [
    { id: 'A', label: 'Terminal A', x: 100, y: 200 },
    { id: 'B', label: 'Station B', x: 250, y: 80 },
    { id: 'C', label: 'Hub C', x: 240, y: 320 },
    { id: 'D', label: 'Central D', x: 420, y: 140 },
    { id: 'E', label: 'Gateway E', x: 400, y: 300 }
  ],
  edges: [
    { source: 'A', target: 'B', weight: 4 },
    { source: 'A', target: 'C', weight: 2 },
    { source: 'B', target: 'C', weight: 5 },
    { source: 'B', target: 'D', weight: 10 },
    { source: 'C', target: 'D', weight: 3 },
    { source: 'C', target: 'E', weight: 8 },
    { source: 'D', target: 'E', weight: 2 }
  ]
};

export const graphAdjacency = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3, E: 8 },
  D: { B: 10, C: 3, E: 2 },
  E: { C: 8, D: 2 }
};

// Euclidean heuristic for A* and Greedy Search
// h(n) = distance(n, goal) / 40 (scaled for weight compatibility)
export const getHeuristic = (nodeId, targetId) => {
  const node = graphData.nodes.find(n => n.id === nodeId);
  const target = graphData.nodes.find(n => n.id === targetId);
  if (!node || !target) return 0;
  
  const dx = node.x - target.x;
  const dy = node.y - target.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return parseFloat((distance / 35).toFixed(1)); // matching reasonable heuristic weights
};

/**
 * JS Dijkstra Implementation
 */
export function solveDijkstra(start, end) {
  const nodes = Object.keys(graphAdjacency);
  const distances = {};
  const previous = {};
  const visited = new Set();
  const visitedOrder = []; // tracking exact order of visited nodes for animations

  nodes.forEach(n => {
    distances[n] = Infinity;
    previous[n] = null;
  });
  distances[start] = 0;

  while (visited.size < nodes.length) {
    // Find unvisited node with smallest distance
    let minNode = null;
    let minDistance = Infinity;

    nodes.forEach(n => {
      if (!visited.has(n) && distances[n] < minDistance) {
        minNode = n;
        minDistance = distances[n];
      }
    });

    if (minNode === null || minDistance === Infinity) break;

    visited.add(minNode);
    visitedOrder.push(minNode);

    if (minNode === end) break;

    const neighbors = graphAdjacency[minNode];
    for (const neighbor in neighbors) {
      if (visited.has(neighbor)) continue;
      
      const newDist = distances[minNode] + neighbors[neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = minNode;
      }
    }
  }

  // Reconstruct path
  const path = [];
  let curr = end;
  while (curr !== null) {
    path.unshift(curr);
    curr = previous[curr];
  }

  const validPath = path[0] === start;
  return {
    algorithm: 'Dijkstra',
    path: validPath ? path : [],
    cost: validPath ? distances[end] : -1,
    visitedNodesCount: visited.size,
    visitedOrder
  };
}

/**
 * JS A* Implementation
 */
export function solveAStar(start, end) {
  const nodes = Object.keys(graphAdjacency);
  const gScores = {}; // exact distance from start
  const fScores = {}; // gScore + heuristic
  const previous = {};
  const visited = new Set();
  const openSet = new Set([start]);
  const visitedOrder = [];

  nodes.forEach(n => {
    gScores[n] = Infinity;
    fScores[n] = Infinity;
    previous[n] = null;
  });

  gScores[start] = 0;
  fScores[start] = getHeuristic(start, end);

  while (openSet.size > 0) {
    // Find node in openSet with lowest fScore
    let current = null;
    let minF = Infinity;

    openSet.forEach(n => {
      if (fScores[n] < minF) {
        current = n;
        minF = fScores[n];
      }
    });

    if (current === end) {
      visited.add(current);
      visitedOrder.push(current);
      break;
    }

    openSet.delete(current);
    visited.add(current);
    visitedOrder.push(current);

    const neighbors = graphAdjacency[current];
    for (const neighbor in neighbors) {
      if (visited.has(neighbor)) continue;

      const tentativeG = gScores[current] + neighbors[neighbor];
      if (tentativeG < gScores[neighbor]) {
        previous[neighbor] = current;
        gScores[neighbor] = tentativeG;
        fScores[neighbor] = tentativeG + getHeuristic(neighbor, end);
        openSet.add(neighbor);
      }
    }
  }

  const path = [];
  let curr = end;
  while (curr !== null) {
    path.unshift(curr);
    curr = previous[curr];
  }

  const validPath = path[0] === start;
  return {
    algorithm: 'A*',
    path: validPath ? path : [],
    cost: validPath ? gScores[end] : -1,
    visitedNodesCount: visited.size,
    visitedOrder
  };
}

/**
 * JS Greedy Best-First Search Implementation
 * Focuses purely on minimizing heuristic value h(n)
 */
export function solveGreedy(start, end) {
  const visited = new Set();
  const visitedOrder = [];
  const previous = {};
  
  // Custom PQ structure storing [node, heuristic]
  const openSet = [{ id: start, h: getHeuristic(start, end) }];
  const pathCosts = {}; // tracking costs along the constructed path
  pathCosts[start] = 0;

  let current = null;

  while (openSet.length > 0) {
    // Sort ascending by heuristic h
    openSet.sort((a, b) => a.h - b.h);
    const item = openSet.shift();
    current = item.id;

    if (visited.has(current)) continue;
    visited.add(current);
    visitedOrder.push(current);

    if (current === end) break;

    const neighbors = graphAdjacency[current];
    for (const neighbor in neighbors) {
      if (!visited.has(neighbor) && !openSet.some(o => o.id === neighbor)) {
        previous[neighbor] = current;
        pathCosts[neighbor] = pathCosts[current] + neighbors[neighbor];
        openSet.push({ id: neighbor, h: getHeuristic(neighbor, end) });
      }
    }
  }

  const path = [];
  let curr = end;
  while (curr !== undefined && curr !== null) {
    path.unshift(curr);
    curr = previous[curr];
  }

  const validPath = path[0] === start;
  
  // Find final route weight manually along path
  let pathWeight = 0;
  if (validPath) {
    for (let i = 0; i < path.length - 1; i++) {
      pathWeight += graphAdjacency[path[i]][path[i+1]];
    }
  }

  return {
    algorithm: 'Greedy',
    path: validPath ? path : [],
    cost: validPath ? pathWeight : -1,
    visitedNodesCount: visited.size,
    visitedOrder
  };
}

// Orchestrator for fallbacks
export function solveLocal(start, end, algorithm) {
  const algoLower = algorithm.toLowerCase();
  if (algoLower.includes('dijkstra')) {
    return solveDijkstra(start, end);
  } else if (algoLower.includes('a*') || algoLower.includes('astar')) {
    return solveAStar(start, end);
  } else if (algoLower.includes('greedy')) {
    return solveGreedy(start, end);
  }
  return solveDijkstra(start, end);
}
