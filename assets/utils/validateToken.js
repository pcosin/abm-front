export const validateToken = () => {
    let token = sessionStorage.getItem('tokenAuth')
    console.log(token);
    if (!token) {
        window.location = '../index.html'
    }
    // TODO else case
    else{
        console.log('[autenticado]');
        return token
    }
}
