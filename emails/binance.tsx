/* eslint-disable @next/next/no-img-element */

import React from "react";

interface ReceiptProps {
    hash: string;
    data: {
        currency: string;
        fromAddress: string;
        toAddress: string;
        fromAmountUsd: number;
        toAmountUsd: number;
        fromAmountCoin: number;
        toAmountCoin: number;
    };
    type: string;
}



export const CryptoReceipt: React.FC<ReceiptProps> = ({ hash, data, type }) => (
    <div style={{
        maxWidth: 480,
        margin: "32px auto",
        fontFamily: "Segoe UI, Arial, sans-serif",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: 32,
        color: "#222"
    }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
            <img
                src="data:image/jpeg;base64,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"
                alt={data.currency}
                style={{ width: 48, height: 48, marginBottom: 8 }}
            />
            <h2 style={{ margin: 0, fontWeight: 700 }}>(PLUTUS) CryptoFlash Receipt</h2>
            <div style={{
                fontSize: 14,
                color: "#888",
                marginTop: 4,
                letterSpacing: 1,
                textTransform: "uppercase"
            }}>
                {type === "trial" ? "Trial Transaction" : data.currency.toUpperCase() + " Transaction"}
            </div>
        </div>
        <table style={{ width: "100%", fontSize: 16, marginBottom: 24 }}>
            <tbody>
                <tr>
                    <td style={{ fontWeight: 500, padding: "8px 0" }}>Transaction Hash:</td>
                    <td style={{ wordBreak: "break-all", textAlign: "right", color: "#12720f", fontWeight: "bold" }}>{hash}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 500, padding: "8px 0" }}>Currency:</td>
                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.currency}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 500, padding: "8px 0" }}>From Address:</td>
                    <td style={{ wordBreak: "break-all", textAlign: "right", fontWeight: "bold" }}>{data.fromAddress || "N/A"}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 500, padding: "8px 0" }}>To Address:</td>
                    <td style={{ wordBreak: "break-all", textAlign: "right", fontWeight: "bold" }}>{data.toAddress}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 500, padding: "8px 0" }}>Amount (USD):</td>
                    <td style={{ textAlign: "right", fontSize: "2rem", fontWeight: "bold" }}>${data.fromAmountUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 500, padding: "8px 0" }}>Amount ({data.currency}):</td>
                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.fromAmountCoin.toLocaleString(undefined, { maximumFractionDigits: 8 })}</td>
                </tr>
            </tbody>
        </table>
        <div style={{
            background: "#F3F6F9",
            borderRadius: 8,
            padding: 16,
            fontSize: 14,
            color: "#555",
            textAlign: "center"
        }}>
            Thank you for using <b>CryptoFlash</b>!<br />
            Your transaction has been processed successfully.
        </div>
        <div style={{ marginTop: 24, textAlign: "center", fontSize: 12, color: "#aaa" }}>
            &copy; {new Date().getFullYear()} CryptoFlash. All rights reserved.
        </div>
    </div>
);
