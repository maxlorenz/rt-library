#include "graph.h"


Graph::Graph()
{
}


Graph::~Graph()
{
}

void Graph::insert_node(int id, int lat, int lon)
{
	vertices.at(id) = Vertex { id, lat, lon };
}

void Graph::insert_way(std::vector<int> node_ids)
{
	edges.push_back(node_ids);
}

Vertex Graph::get_vertex(int id)
{
	return vertices.find(id);
}
