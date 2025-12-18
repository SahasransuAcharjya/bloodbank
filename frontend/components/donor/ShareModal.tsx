"use client";

import { Copy, Mail, Twitter, X, Facebook, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    requestData: any;
}

export function ShareModal({ isOpen, onClose, requestData }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    if (!isOpen || !requestData) return null;

    const shareText = `URGENT: ${requestData.bloodType} Blood needed for ${requestData.patientName} at ${requestData.hospitalName}, ${requestData.location?.city}. Please help! #JeevanDhaara #BloodDonation`;
    const shareUrl = "https://jeevandhaara.com"; // Replace with actual deep link if available

    const handleCopy = () => {
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        {
            name: "WhatsApp",
            icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
            color: "bg-[#25D366] text-white",
            url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
        },
        {
            name: "Facebook",
            icon: <Facebook className="h-6 w-6" />,
            color: "bg-[#1877F2] text-white",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="h-6 w-6" />,
            color: "bg-[#0A66C2] text-white",
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: "X (Twitter)",
            icon: <Twitter className="h-6 w-6" />,
            color: "bg-black text-white",
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: "Instagram",
            icon: <Instagram className="h-6 w-6" />,
            color: "bg-gradient-to-tr from-[#FFD600] via-[#FF0100] to-[#D800B9] text-white",
            url: "https://instagram.com",
            onClick: handleCopy,
        },
        {
            name: "Discord",
            icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.176 2.419 0 1.334-.966 2.419-2.176 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.176 2.419 0 1.334-.966 2.419-2.176 2.419z" />
                </svg>
            ),
            color: "bg-[#5865F2] text-white",
            url: "https://discord.com/channels/@me",
            onClick: handleCopy,
        },
        {
            name: "Snapchat",
            icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" fill="currentColor">
                    <path d="M12.003 1.02c-3.664 0-6.67 2.693-6.89 6.162-.224 3.52 1.84 5.46 3.033 6.425.433.35.53.64.39.99-.17.41-.83 2.01-1.03 2.46-.24.53-.87.75-1.45.39-.77-.48-1.76-.78-2.58-.39-.73.34-.84 1.35-.15 1.85 1.14.83 2.92 1.07 4.28 1.07.48 0 .93-.03 1.34-.08 1.03-.13 1.96-.65 3.05-.65 1.05 0 2.02.52 3.05.65.41.05.86.08 1.34.08 1.36 0 3.14-.24 4.28-1.07.69-.5.58-1.51-.15-1.85-.82-.39-1.81-.09-2.58.39-.58.36-1.21.14-1.45-.39-.2-.45-.86-2.05-1.03-2.46-.14-.35-.04-.64.39-.99 1.19-.96 3.25-2.9 3.03-6.425-.22-3.469-3.22-6.162-6.89-6.162z" />
                </svg>
            ),
            color: "bg-[#FFFC00] text-black",
            url: "https://snapchat.com",
            onClick: handleCopy,
        },
        {
            name: "Gmail",
            icon: <Mail className="h-6 w-6" />,
            color: "bg-[#EA4335] text-white",
            url: `mailto:?subject=Urgent Blood Request&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1e293b]">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#1D3557] dark:text-white">Share Request</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {shareLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={link.onClick}
                            className={`flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-transform hover:scale-105 ${link.color}`}
                        >
                            {link.icon}
                            <span className="text-[10px] font-bold">{link.name}</span>
                        </a>
                    ))}
                </div>

                <div className="mt-6">
                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Or copy link</p>
                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-[#0f172a]">
                        <input
                            type="text"
                            readOnly
                            value={shareUrl}
                            className="w-full bg-transparent text-sm text-gray-600 focus:outline-none dark:text-gray-300"
                        />
                        <button
                            onClick={handleCopy}
                            className="rounded-lg bg-[#1D3557] p-2 text-white transition-colors hover:bg-[#162a45]"
                        >
                            {copied ? <span className="text-xs font-bold">Copied!</span> : <Copy className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
