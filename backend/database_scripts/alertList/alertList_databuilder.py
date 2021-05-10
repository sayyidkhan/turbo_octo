# Reading an excel file using Python
import csv
import json
import os

#filepath setup
script_dir = os.path.dirname(__file__)

def main():
    # Give the alertList of the file, must be stored in the sub-folder or the code will break
    csv_filepath = "alertList_datasets.csv"
    mongodbtxt_filepath = "alertList_mongodbscript.txt"
    #alertList_name should be the table alertList_name in mongodb
    js_filename = "alertList"

    #logic for the program
    my_output = read_csvfile(csv_filepath, mongodbtxt_filepath)
    write_file(my_output,js_filename)
    print("successful run")

def readList(mylist):
    for row in mylist:
        print(row)

def read_txtfile(mongodbtxt_filepath):
    mongodbtxt_filepath = os.path.join(script_dir, mongodbtxt_filepath)
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
            #remove the { from the string
            replacement_text = replacement_text[1:]
            #remove the } from the string
            replacement_text = replacement_text[:-1]
            myscriptfile = myscriptfile.replace(text_to_search, replacement_text)
            return myscriptfile

        return [writeIntoTemplate(myscriptfile,stringjson_rows) for stringjson_rows in mydict]

    # code logic begins here
    csv_filepath = os.path.join(script_dir, csv_filepath)
    with open(csv_filepath, 'r') as file:
        reader = csv.reader(file)

        #1. transform into dict, key & value pair
        myDict = transformToDict(reader)
        ########################################
        '''do the converting of the data over here '''
        #convert alertListId from string to int
        for row in myDict:
            row['alertListId'] = int(row['alertListId'])
        #readList(myDict)
        ########################################
        #2. transform dict into lines of string (to be inserted into template)
        myDict = transformToString(myDict)
        #3. read text file for the mongodb script template
        txtfile = read_txtfile(mongodbtxt_filepath)
        #4. transform the template to put the json object into the template
        myscript_list = transformToTemplate(txtfile, myDict)
        return myscript_list

def write_file(myprocessedlist,js_filename):
    #1. join all the text obj
    mytextObj = "\n".join(myprocessedlist)
    #2. create & set a destination file path
    js_filename = f"{js_filename}_dataset_generated.js"
    #3. write into a text file
    js_filename = os.path.join(script_dir, js_filename)
    f = open(js_filename,"w")
    f.write(mytextObj)
    f.close()
    #4. change the file extension

if __name__ == '__main__':
    main()