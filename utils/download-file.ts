const downloadFile = async (url: string, filename: string) => {
    try {
        const data = await fetch(url, {
            mode: "no-cors",
        });
        const blob = await data.blob();
        const objectUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.setAttribute("href", objectUrl);
        link.setAttribute("download", filename);
        link.style.display = "none";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    } catch (e) {
        console.log(e);
    }
};

export default downloadFile;
