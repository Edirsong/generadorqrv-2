let qrdata = document.getElementById("qr-data");
let qrTitle = document.getElementById("qr-title");
let titleSize = document.getElementById("title-size");
let titleColor = document.getElementById("title-color");
let qrColor = document.getElementById("qr-color");
let qrCode = new QRCode(document.getElementById("qrcode"), {
    width: 500,
    height: 500,
    colorDark : "#000000",
    colorLight : "#ffffff"
});
let canvas = document.getElementById("qr-canvas");
let ctx = canvas.getContext("2d");

document.getElementById("generate-btn").addEventListener("click", generateQR);

function generateQR() {
    qrCode._htOption.colorDark = qrColor.value; // Actualiza el color del QR
    qrCode.makeCode(qrdata.value); // Genera el QR

    setTimeout(function () {
        let title = qrTitle.value;
        let size = titleSize.value || "8";
        let color = titleColor.value;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let qrSize = 500;
        let margin = 20;
        let titleHeight = title ? parseInt(size) + margin : 0;
        canvas.width = qrSize + 2 * margin;
        canvas.height = qrSize + 2 * margin + titleHeight;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibuja el título
        if (title) {
            ctx.fillStyle = color;
            ctx.font = `${size}px Arial`;
            ctx.textAlign = "center";
            ctx.fillText(title, canvas.width / 2, margin + parseInt(size));
        }

        // Dibuja el QR
        ctx.drawImage(document.querySelector('#qrcode img'), margin, titleHeight + margin, qrSize, qrSize);

        // Convierte a imagen
        let img = document.getElementById("qr-image");
        img.src = canvas.toDataURL("image/png");
    }, 300);
}