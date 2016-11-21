#include <iostream>

#include "graph.h"

void Graph::insert_node(int id, int lat, int lon)
{
	vertices.at(id) = Vertex { id, lat, lon };
}

void Graph::insert_way(std::vector<int> node_ids)
{
	edges.push_back(node_ids);
}

void Graph::connect(int from_id, int to_id)
{
	auto from = vertices.find(from_id);
	auto to = vertices.find(to_id);

	if (from != vertices.end() && to != vertices.end()) {
		it->edges.push_back(Edge { distance(*from, *to), *to });
	}
}

double distance(const Vertex* from, const Vertex* to)
{
	// TODO implement
	return 42;
}

Vertex Graph::get_vertex(int id)
{
	return vertices.find(id);
}

int main()
{
	std::cout << "Hello, world" << "\n";
}
