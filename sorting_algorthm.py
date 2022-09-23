import numpy as np

#Create list from file
def listFromFile():
    #f = open("C:\\Users\\muffi\\Desktop\\Python projects\\randnumber.txt") #Desktop
    f = open("C:\\Users\\muffi\\github reps\\muffiny-fastapi\\randnumber.txt") #Laptop
    listOriginal = []
    for i in f:
        listOriginal.append(i)
    f.close()
    return listOriginal


#Algorthm to convert any string to int
def toInt(listOriginal):
    j = 0
    z =0
    h=0
    third_list = []
    str_list = []
    while j < len(listOriginal): #Start itirating through list
        if isinstance(listOriginal[j], int) == False: #check whether the list each object is a string
            for x in listOriginal[j]: #if it is a string, start itirating through each char in object
                str_list.append(x) #add each char in a new list
                i = 0
                while i < len(str_list): #Itirate through the new list which contains each char
                    try: #Try making each char into int
                        n = int(str_list[i])
                    # print(n)
                    except: #If charachter can't be made into int combine previous char's as one whole char and remove the unchangable char
                        str_list.pop(i)
                        try:
                            h=0
                            l = ""
                            while h<(i-z):
                                l = str(l + str_list[z+h])
                                h=h+1
                            third_list.append(int(l))       
                            z=i
                        except:
                            break      
                    i = i+1
        j = j+1
    print("Unsorted array:")
    print(third_list) #Print unsorted list
    return third_list #Return list with only remaining int's


class sortingAlgorithms():
    #defining constructor  
    def __init__(self, listToSort):  
        self.listSort = listToSort
        
    #Selection sort algorithm
    def selectionSort(self):
        i = 0
        while i < len(self.listSort):
            min_index = i
            j = i+1
            while j < len(self.listSort):
                if self.listSort[j] < self.listSort[min_index]:
                    min_index = j
                j = j+1
            self.listSort[i], self.listSort[min_index] = self.listSort[min_index],self.listSort[i]
            i = i+1
        print("Selection sorted :")
        print(self.listSort) #Print sorted list
        return self.listSort

    #Bubble sort algortithm
    def bubbleSort(self):
        i=0
        j=0
        while i < (len(self.listSort)-1):
            if j<(len(self.listSort)-i-1):
                if self.listSort[j] > self.listSort[j+1]:
                    self.listSort[j], self.listSort[j+1] = self.listSort[j+1], self.listSort[j]
                    j = j+1
                else:
                    j = j+1
            else:
                j=0
                i=i+1
        print("Bubble sorted :")
        print(self.listSort)
        return self.listSort

    #Insertion sort algorithm
    def insertionSort(self):
        i=1
        while i < len(self.listSort):
            value = self.listSort[i]
            j=i-1
            if j>=0 and self.listSort[j]>value:
                self.listSort[j+1], self.listSort[j] = self.listSort[j], self.listSort[j+1]
                j=j-1
            else:
                self.listSort[j+1] = value
                i=i+1
        print("Insertion sorted: ")
        print(self.listSort)
        return self.listSort

    #Sorting with numPy module
    def numpySort(self):
        print(np.sort(self.listSort))
        return self.listSort

#Call functions
sorting = sortingAlgorithms(toInt(str(listFromFile())))
sorting.insertionSort()