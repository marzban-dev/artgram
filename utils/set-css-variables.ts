const setCssVariables = (containerSelector: string, variables: [name: string, value: string][]) => {
    const container = document.querySelector(containerSelector) as HTMLElement;
    
    variables.forEach((variable) => {
        container.style.setProperty(variable[0], variable[1]);
    });
};

export default setCssVariables;
