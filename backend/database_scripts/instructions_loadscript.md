## load scripts

### load(file)

Loads and runs a JavaScript file into the current shell environment.

The load() method has the following parameter:

| Parameter        | Type           | Description  |
| ------------- |:-------------:| -----:|
| filename      | string | Specifies the path of a JavaScript file to execute. | 

Specify filenames with relative or absolute paths. When using relative path names,
confirm the current directory using the **pwd()** method.

After executing a file with **load()**, you may reference any functions or variables
defined the file from the mongo shell environment.

### Example

Consider the following examples of the load() method:

```$xslt
> mongod
> pwd()
/Users/zack/VirtualBoxSharedFolder/csci235/A3
> load("location.js")
true
```

depending where you open the terminal, the pwd (file path) will be different.


