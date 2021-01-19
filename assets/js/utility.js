
// Extracting data from forms - used in forms in modal and log in and register
export function extractFormData(formData) {
    const result = {};

    [...formData].forEach(value => {
        result[value[0]] = value[1]
    });

    return result;
}