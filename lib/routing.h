class routing
{
private:
	int _counter;
	

public:
	routing() : _counter{0} {};
	~routing() {};

	void inc();
	int counter();
};