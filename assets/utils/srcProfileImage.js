export const srcProfileImage = (arrayArchivos) => {
    let profileImage;
    if (arrayArchivos.length > 0) {
        for (const archivo of arrayArchivos) {
            if (archivo.includes('profileImage')) {
                  // TODO for para encontrar la imagen
                profileImage = arrayArchivos[0].replace("\\", "/");
                profileImage = profileImage.slice(7);
            }
        }
    
    }

    return profileImage
}