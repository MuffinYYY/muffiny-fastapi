import numpy as np

def amogus():
  arr = np.array([[2,5,5],[1,6,8]])
  newarr = arr.reshape(-1)
  newarr = np.sort(newarr)
  return(newarr)
print(amogus())