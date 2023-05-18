#include <stdio.h>

int main(int argc, char *argv[]) {
    
    int arr[3][3] = {
        {1, 2, 3},
        {4, 5, 6}, 
        {7, 8, 9}
    };
    int temp[3][3] = {
        {0, 0, 0}, 
        {0, 0, 0}, 
        {0, 0, 0}
    };

    printf("--------------------\n");
    for(int i=0;i<3;i++) {
        for(int j=0;j<3;j++) {
            printf("%d ", arr[i][j]);
        } printf("\n");
    }
    printf("--------------------\n");

    for(int i=0;i<3;i++) {
        for(int j=0;j<3;j++) {
            temp[i][j] = arr[2-j][i];
        }
    }

    printf("-------Rotate------\n");
    for(int i=0;i<3;i++) {
        for(int j=0;j<3;j++) {
            printf("%d ", temp[i][j]);
        } printf("\n");
    }
    printf("--------------------\n");

    return 0;
}