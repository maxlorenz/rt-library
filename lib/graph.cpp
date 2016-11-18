#include "graph.h"


Graph::Graph()
{
}


Graph::~Graph()
{
}

void Graph::addNode(int id, int lat, int lon)
{
	nodes.insert(std::pair<int, Node>(id, Node { id, lat, lon }));
}

void Graph::addWay(int id, std::vector<int> node_ids)
{
	ways.insert(std::pair<int, Way>(id, Way{ id, node_ids }));
}

Vertice Graph::create()
{
	// TODO create Graph structure based on nodes and ways
	return Vertice();
}
