function factorial(n) {
  let result = n > 1 ? n : 1; 
  while(n > 1){
    result *= n - 1;
    n--;
  }
  return result;
}

