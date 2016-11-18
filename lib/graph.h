#pragma once

#include <map>
#include <vector>
#include <memory>

struct Node
{
	int id;
	int lat;
	int lon;

	std::map<std::string, std::string> tags;
};

struct Way
{
	int id;

	std::vector<int> nodes;
	std::map<std::string, std::string> tags; 
};

struct Vertice
{
	int id;
	std::vector<Vertice *> connected;
};

class Graph
{
private:
	std::map<int, Node> nodes;
	std::map<int, Way> ways;

public:
	Graph();
	~Graph();

	void addNode(int id, int lat, int lon);
	void addWay(int id, std::vector<int> node_ids);

	Vertice create();
};

