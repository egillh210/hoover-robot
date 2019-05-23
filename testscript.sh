#!/bin/bash 

node main.js test/inputfiles/input1.txt > test/outputfiles/output1.txt
node main.js test/inputfiles/input2.txt > test/outputfiles/output2.txt
node main.js test/inputfiles/input3.txt > test/outputfiles/output3.txt

node test/assertiontest.js test/outputfiles/output1.txt test/outputfiles/output2.txt test/outputfiles/output3.txt


