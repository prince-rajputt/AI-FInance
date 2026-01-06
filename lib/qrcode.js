import QRCode from "qrcode";

/**
 * Generate QR code for an account
 * @param {string} accountId - The account ID
 * @param {string} accountName - The account name
 * @returns {Promise<string>} - QR code data URL
 */
export async function generateAccountQRCode(accountId, accountName) {
  try {
    // Create QR code data that contains account ID and name
    const qrData = JSON.stringify({
      accountId,
      accountName,
      type: "financeAccount",
    });

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 300,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    return qrCodeDataUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
}
