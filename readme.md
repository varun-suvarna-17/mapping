# Smart Route Planner (AI Navigation System)

## Objective

Build an AI-based system that finds the shortest or fastest route between locations and visually displays the selected path using graph-based algorithms and visualization techniques.

---

# Algorithms Used

1. Dijkstra Algorithm
2. A* Algorithm
3. Greedy Technique

---

# Tech Stack

## Frontend

* React
* Tailwind CSS

## Backend

* Python
* FastAPI

## Visualization

* NetworkX
* Matplotlib

---

# Features

* Source & destination input
* Shortest path calculation
* Graph/map visualization
* Traffic or blocked road simulation
* Dynamic rerouting
* Algorithm comparison

---

# Project Structure

backend/

* algorithms/
* graph/
* visualization/
* api/
* utils/

frontend/

* React frontend

documents/

* Team member documentation files

---

# Important Instructions for Team Members

## 1. Work on Your Own File

Each member should write their algorithm or module inside their respective file.

Example:

* dijkstra.py
* astar.py
* greedy.py

---

## 2. Run Files Independently

Each file contains:

```python
if __name__ == "__main__":
```

This allows every member to test their code independently.

Example:

```bash
python algorithms/dijkstra.py
```

---

## 3. Maintain Common Graph Format

All algorithms must use the same graph structure defined inside:

```bash
graph/graph_data.py
```

Do NOT create separate graph formats, otherwise integration will become difficult.

---

# Documentation Rules

A `documents/` folder has been added.

Each member must create an `.md` file containing:

* Your Name
* Algorithm/Module Worked On
* Explanation of your implementation
* Logic/approach used

Example:

* varun_dijkstra.md
* rahul_astar.md

This will help during:

* report preparation
* viva explanation
* final documentation

---

# Setup Instructions

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run Backend Server

```bash
python -m uvicorn main:app --reload
```
