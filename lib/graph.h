#pragma once

#include <map>
#include <vector>

struct Vertex
{
	int id;

	int lon;
	int lat;

	struct Edge
	{
		double distance;
		Vertex * target;
	};

	std::vector<Edge> edges;
};


class Graph
{
private:
	std::map<int, Vertex> vertices;
	std::vector<std::vector<int>> edges;

public:
	Graph() {}
	~Graph() {}

	void insert_node(int id, int lat, int lon);
	void insert_way(std::vector<int> node_ids);

	Vertex get_vertex(int id);

private:
	void connect(int from_id, int to_id);
	double distance(const Vertex* from, const Vertex* to);
};

