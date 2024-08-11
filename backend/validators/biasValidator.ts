const isBiasValid = (bias: string) => {
    if (bias.trim() === '') {
        return true;
    }
    
    return bias.length === 1 && /^[a-zA-Z]$/.test(bias);
}

export default isBiasValid;