"use client";
import React, { useState } from 'react';
import { CldUploadWidget, CldImage } from "next-cloudinary"

interface CloudinaryResult {
    public_id: string
}

const UploadPage = () => {
    const [publicId, setPublicId] = useState("")

    return (
        <>
            {publicId &&
                <CldImage src={publicId} width={270} height={180} alt='cloudinary picture' />}
            <CldUploadWidget
                options={{
                    sources: ['local'],
                    multiple: false,
                    maxFiles: 5,
                    styles: {
                        palette: {
                            window: "#000000",
                            sourceBg: "#000000",
                            windowBorder: "#8E9FBF",
                            tabIcon: "#FFFFFF",
                            inactiveTabIcon: "#8E9FBF",
                            menuIcons: "#2AD9FF",
                            link: "#08C0FF",
                            action: "#336BFF",
                            inProgress: "#00BFFF",
                            complete: "#33ff00",
                            error: "#EA2727",
                            textDark: "#000000",
                            textLight: "#FFFFFF"
                        }
                    }
                }
                }
                uploadPreset='upload-test-nextjs'
                onSuccess={(result, widget) => {
                    if (result.event !== "success") return;
                    const info = result.info as CloudinaryResult
                    setPublicId(info.public_id)
                }}>
                {({ open }) => <button
                    className='btn btn-primary'
                    onClick={() => open()}>Upload</button>}
            </CldUploadWidget>
        </>)
}

export default UploadPage