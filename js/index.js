function decodeJWT(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
}

$(document).ready(function() {
    $('#decode').click(function() {
        console.log("Clicked on convert button...");

        token = $('#token').val();
        console.log(token);
        const decoded = decodeJWT(token);
        console.log(decoded);
        $('#decoded').val(JSON.stringify(decoded, null, 2));
    });
});
