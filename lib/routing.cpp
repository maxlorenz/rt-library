#include <iostream>

#include "routing.h"

void Routing::inc()
{
	_counter++;
}

int Routing::get_counter()
{
	return _counter;
}

int main(int argc, char *argv[])
{
	std::cout << "Hello, world" << "\n";
	return 0;
}