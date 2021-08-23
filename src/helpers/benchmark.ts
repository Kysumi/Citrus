export const benchMark = (func: () => void): number => {
    const startTime = performance.now();
    func();
    const completedTime = performance.now();

    return completedTime - startTime;
};
