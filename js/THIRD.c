#include <stdio.h>

int gcd (int,int);
int result;

int main(){
    int a,b,c;
    int temp; // 返り値を格納
    scanf("%d%d",&a,&b);
    
    printf("%d\n",result);
    temp = gcd(a,b);
    printf("%d\n",temp);
    return 0;
}

int gcd (int a,int b){
    int temp;
    if(a <= b){
        temp = a;
        a = b;
        b = temp;
    }

    for(;;){
        result = a % b;
        if (result == 0) break;
        a = b;
        b = result;
    }
    return b;
}
