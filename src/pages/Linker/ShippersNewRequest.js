import React, { useState } from 'react'
import Tesseract from 'tesseract.js';
import Swal from "sweetalert2";
import './ShippersNewRequest.css';
export const ShippersNewRequest = () => {
    const [images, setImages] = useState([]);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [ocrText, setOcrText] = useState([]);
    const [size, setSize] = useState(0);
    const [imageVisible, setImageVisible] = useState('none');
    const [srcImage, setSrcImage] = useState('')

    document.onpaste = function (pasteEvent) {
        const item = pasteEvent.clipboardData.items[0];
        if (item.type.indexOf("image") === 0) {
            var blob = item.getAsFile();
            //console.log(blob)
            setSize(() => size + blob.size)
            var reader = new FileReader();
            reader.onload = function (event) {
                setImages(() => [
                    ...images,
                    event.target.result
                ])
            }
            reader.readAsDataURL(blob);
        } else {
            Swal.fire('Formato no válido', 'Comienza pegando una o varias imagenes de un shipper', 'error')
        }
    }
    const runOCR = (images_vector) => {

        if (images_vector.length > 0) {
            images_vector.forEach((picture) => {
                Tesseract.recognize(picture, "eng", { logger: m => setCurrentProgress(m) }).then(({ data: { text } }) => {
                    setOcrText((lastOcr) => [...lastOcr, text])
                })
            });
        } else {
            Swal.fire('No hay imagenes', 'Comienza pegando una o varias imagenes de un shipper', 'info')
        }
    }

    const deleteImage = (image_index) => {
        setImages(() => (
            images.filter((_, index) => index !== image_index)
        ))
    }
    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        //let dt = e.dataTransfer;
        //let files = dt.files;
        //console.log(files)
    };
    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        let dt = e.dataTransfer;
        let files = dt.files;
        //console.log(files)
        const item = files[0];
        if (item.type.indexOf("image") === 0) {
            var fr = new FileReader();
            fr.onload = function () {
                var imag_url = fr.result;
                setImages(() => [
                    ...images,
                    imag_url
                ])
            }
            fr.readAsDataURL(files[0]);

        } else {
            Swal.fire('Formato no válido', 'Comienza pegando una o varias imagenes de un shipper', 'error')
        }
    };
    const openModalImage = (src_image) =>{
        setImageVisible('block')
        setSrcImage(src_image)
    }
    return (
        <div className="row">
            <div id="divDropArea" onDrop={e => handleDrop(e)}
                onDragOver={e => handleDragOver(e)}
                onDragEnter={e => handleDragEnter(e)}
                onDragLeave={e => handleDragLeave(e)} className="col-xl-12 col-md-12 card drag-drop-zone">
                <p>Drag files here to upload</p>
            </div>
            <div className="col-xl-12 col-md-12">

                {
                    images.map((src_image, index) => (
                        <div key={index} className="show-image" >
                            <img className="img-fluid img-linker" src={src_image} alt="index" onClick={() => openModalImage(src_image)} />
                            <div class="overlay"></div>
                            <button type="button" className="img-buttons-times" onClick={() => deleteImage(index)}>&times; </button>
                        </div>
                        
                    ))
                }
            </div>
            <div className="col-xl-12 col-md-12">
                <button className="btn btn-primary" onClick={() => runOCR(images)}>comenzar a leer</button>
            </div>
            <div className="col-xl-12 col-md-12">
                <label htmlFor="">
                    Taaño total de imagenes subidas:
                    {size}
                </label>
            </div>
            {
                ocrText.map((text_image, index) => (
                    <div className="card" key={index}>
                        <div className="card-body">
                            {text_image}
                        </div>
                    </div>
                ))
            }
            <div className="col-xl-12 col-md-12 my-1">

                {
                    !currentProgress.progress || currentProgress.progress === 1 ? null : (
                        <>
                            <div className="card">
                                <div className="card-body">
                                    <i className="fa fa-spinner fa-spin">

                                    </i>
                                    <label htmlFor="">
                                        {
                                            currentProgress.progress * 100
                                        } %
                                    </label>
                                </div>
                            </div>
                        </>

                    )
                }

            </div>
            {
                imageVisible && (
                    <div id="myModal" className="modal" style={{ display: imageVisible }}>
                        <span className="close" onClick={() => {
                            setImageVisible('none');
                            setSrcImage('')
                        }}>&times;</span>
                        <img className="modal-content" src={srcImage} alt="image_asset" />
                        <div id="caption"></div>
                    </div>
                )
            }
        </div>
    )
}