# Routing Library

This library is part of the GreenNav Green Navigation project

It is a C++ OSM routing application with Python bindings via SWIG

## Description

The `win` folder contains a VS project for easy setup on windows. The
`lib` folder contains all the sources. To add some features, just edit
the `lib/*.cpp` files. To expose the changes to python, add references
in `lib/*.i`.

## Windows setup

For Windows, you'll need to have VS with C++ support installed as well
as Python (any Python will do, 2.7 is tested). SWIG-win needs to be
downloaded and in put in the path. To do so, there is the 
`install-windows.ps1` in the root that will download SWIG and modify the
path accordingly.

The VS project was setup using [this](http://www.matthiaskauer.com/2013/08/tutorial-mixing-c-and-python-on-windows-with-swig-and-visual-studio-express-2012/)
guide.

## Running the project

After a successful build, there will be a `bin` folder created. Just `cd`
into that folder, start `python` and do

```python
import routing

r = routing.routing()

r.inc()
r.counter() # 1

r.inc()
r.counter() # 2
```

# Next steps

The plan is to extend the C++ library to store PBF files into a database,
fetch the OSM data back and to perform some _simple_ A* routing. When this
can be orchestrated via Python, a simple webserver will be written for the
GreenNav frontend to use.