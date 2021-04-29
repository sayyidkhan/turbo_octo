# Reading an excel file using Python
import csv
import json

def main():
    # Give the location of the file, must be stored in the sub-folder or the code will break
    csv_filepath = "location/location_datasets.csv"
    mongodbtxt_filepath = "location/location_mongodbscript.txt"

    #logic for the program
    my_output = read_csvfile(csv_filepath, mongodbtxt_filepath)
    write_file(my_output,mongodbtxt_filepath)

def readList(mylist):
    for row in mylist:
        print(row)

def read_txtfile(mongodbtxt_filepath):
    f = open(mongodbtxt_filepath,"r")
    myresult = f.read()
    f.close()
    return myresult

def read_csvfile(csv_filepath, mongodbtxt_filepath):
    def transformToDict(mylist):
        headers = next(mylist)
        return [dict(zip(headers, i)) for i in mylist]

    def transformToString(mydict):
        return [json.dumps(i) for i in mydict]

    def transformToTemplate(myscriptfile,mydict):
        def writeIntoTemplate(myscriptfile,replacement_text):
            text_to_search = "REPLACE_OBJECT_HERE"
            #replacement_text = "{ \"helloworld\" : \"my value\" }"
            myscriptfile = myscriptfile.replace(text_to_search, replacement_text)
            return myscriptfile

        return [writeIntoTemplate(myscriptfile,stringjson_rows) for stringjson_rows in mydict]

    # code logic begins here
    with open(csv_filepath) as file:
        reader = csv.reader(file)

        #1. transform into dict, key & value pair
        myDict = transformToDict(reader)
        #2. transform dict into lines of string (to be inserted into template)
        myDict = transformToString(myDict)
        #3. read text file for the mongodb script template
        txtfile = read_txtfile(mongodbtxt_filepath)
        #4. transform the template to put the json object into the template
        myscript_list = transformToTemplate(txtfile, myDict)
        return myscript_list

def write_file(myprocessedlist,csv_filepath):
    #1. join all the text obj
    mytextObj = "\n".join(myprocessedlist)
    #2. create & set a destination file path
    destination_filepath = csv_filepath.split("/")[0]
    destination_filepath = f"{destination_filepath}/{destination_filepath}_dataset_generated.js"
    #3. write into a text file
    f = open(destination_filepath,"w")
    f.write(mytextObj)
    f.close()
    #4. change the file extension

if __name__ == '__main__':
    main()