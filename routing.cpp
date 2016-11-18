#include "routing.h"



Routing::Routing()
{
}


Routing::~Routing()
{
}

void Routing::print_hello_world()
{
	std::cout << "Hello, world" << "\n";
}

int main() {
	Routing r;
	r.print_hello_world();
}
