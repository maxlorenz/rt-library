#pragma once

#include "graph.h"

class routing
{
private:
	int _counter;
	

public:
	routing() : _counter{0} {};
	~routing() {};

	Graph createGraph();
};