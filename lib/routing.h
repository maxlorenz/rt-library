#pragma once

#include "graph.h"

class Routing
{
private:
	int _counter;
	

public:
	Routing() : _counter{0} {};
	~Routing() {};

	void inc();
	int get_counter();
};