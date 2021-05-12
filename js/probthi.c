#include <stdio.h>
#include <math.h>
int main(){
    int n,k,aaa;
    scanf("%d%d",&n,&k);
    while(1){
        aaa = n;
        n -= k;
        if (n < 0) break;
    }
    
    printf("%d\n",aaa);
    return 0;
}