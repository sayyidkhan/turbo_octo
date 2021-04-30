## load scripts

### Run the scripts for our project

1.open terminal in the folder which you going to run the script.
eg. location (folder)

```$xslt
(base) zack@zack-MacBook-Pro location % ls
locations_template.js location_dataset_generated.js location_datasets.csv location_mongodbscript.txt
```

2.run mongo in the terminal. you should be welcomed with the mongo cli

```$xslt
mongo
```

3. run "load('locations_dataset_generated.js')" in the terminal, true means successful insert

```$xslt
load('locations_dataset_generated.js')
true
```

after step 3 u are done, u can check mongodb compass if the file have been loaded.

###More Explainations on how to custom load(file)

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
> mongo
> pwd()
/Users/zack/VirtualBoxSharedFolder/csci235/A3
> load("locations_template.js")
true
```

depending where you open the terminal, the pwd (file path) will be different.




