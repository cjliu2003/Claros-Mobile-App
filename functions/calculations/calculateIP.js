export const calculateIP = (odds) => {
    return odds < 0 ? (Math.abs(odds) / (Math.abs(odds) + 100)) * 100 : 100 / (odds + 100) * 100;
}