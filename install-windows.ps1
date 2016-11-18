# Download SWIG executable
$swig_source = "https://netcologne.dl.sourceforge.net/project/swig/swigwin/swigwin-3.0.10/swigwin-3.0.10.zip"
$target = $PSScriptRoot + "\swigwin.zip"

Invoke-WebRequest -Uri $swig_source -OutFile $target

# Extract zip
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($target, $PSScriptRoot)

# Set Python paths
[System.Environment]::SetEnvironmentVariable("PYTHON_INCLUDE", "C:\Python27\include", "User")
[System.Environment]::SetEnvironmentVariable("PYTHON_LIB", "C:\Python27\libs\python27.lib", "User")

# Set SWIG path
echo $env:Path + ";" + $PSScriptRoot
[System.Environment]::SetEnvironmentVariable("PATH", $env:Path + ";" + $PSScriptRoot + "\swigwin-3.0.10\", "User")