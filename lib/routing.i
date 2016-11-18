%module routing
%{
#include "graph.h"
#include "routing.h"
%}

// Include C++ STL headers
// http://www.swig.org/Doc1.3/Library.html#Library_stl_cpp_library
%include "std_string.i"
%include "std_map.i"
%include "std_vector.i"

%include "graph.h"
%include "routing.h"