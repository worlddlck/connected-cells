export const fetchData = async (): Promise<any> => {
    const matrix1 = [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [1, 0, 0, 0],
    ];

    const matrix2 = [
        [1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1],
    ];

    try {
        return new Promise<any>(res => {
            setTimeout(() => {
                return res([ matrix1, matrix2 ]);
            }, 500);
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}