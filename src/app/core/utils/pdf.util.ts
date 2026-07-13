
export const PdfUtils = {


    // Crea este método en tu clase o en una utilidad (PdfUtils)
    downloadFromBase64(base64Data: string, fileName: string) {
        // Limpiar el prefijo si existe (ej: "data:application/pdf;base64,")
        const cleanBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;

        // Convertir a binario
        const byteCharacters = atob(cleanBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Crear el BLOB (Aquí ocurre la magia para evitar la alerta de seguridad)
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Crear enlace temporal
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;

        // Simular clic
        a.click();

        // Limpiar memoria
        window.URL.revokeObjectURL(url);
    }
};