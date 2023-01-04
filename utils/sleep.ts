const sleep = async (ms: number = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), ms);
    });
};

export default sleep;
