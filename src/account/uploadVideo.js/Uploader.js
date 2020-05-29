import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { uploadVideo } from "../../api/videos";

const getColor = (props) => {
    if (props.isDragAccept) {
        return "#00e676";
    }
    if (props.isDragReject) {
        return "#ff1744";
    }
    if (props.isDragActive) {
        return "#2196f3";
    }
    return "#eeeeee";
};

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${(props) => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
`;

function Uploader(props) {
    const { handleLoading, handleError } = props;

    const onDrop = useCallback(async (acceptedFiles) => {
        handleError("");
        handleLoading(true);
        try {
            console.log(acceptedFiles[0]);
            const fd = new FormData();
            fd.append("video", acceptedFiles[0]);
            const response = await uploadVideo(fd);
            console.log(response);
            handleLoading(false);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                handleError(error.response.data.error);
            }
            handleLoading(false);
        }
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ accept: "video/*", onDrop });

    return (
        <div className="container">
            <Container
                {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Container>
        </div>
    );
}

export default Uploader;
