import React, { useState, useEffect } from "react";
import { Gluejar } from "@charliewilco/gluejar";
import Tesseract from 'tesseract.js';
import Swal from "sweetalert2";

import './ShipperRequest.css';

export const ShipperRequest = () => {
  const [upImages, setUpImages] = useState({});
  const [currentProgress, setCurrentProgress] = useState(0);
  const [ocrText, setOcrText] = useState([]);
  useEffect(() => {
    console.log("imagenes subidas", upImages);
    //runOCR(upImages);
  }, [upImages]);

  const runOCR = (images) => {

    const images_vector = Object.entries(images).length === 0 ? [] : images.images;
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
  const deleteImage = (image) => {
    setUpImages(()=>({
      images: [
        upImages.images.filter((element) => element !== image)
      ]
    }))
  }
  return (
    <div className="container row" >
      <h1>Crear Request</h1>
      <div className="col-xl-12 col-md-12 col-sm-12">

        <Gluejar
          onPaste={(files) => {
            setUpImages(files);
          }}
          onError={(err) => Swal.fire('Error', err, 'error')}
          acceptedFiles={['image/gif', 'image/png', 'image/jpeg']}
          //children={(hijos) => console.log('hijos', hijos)}
        >
          {({ images = upImages.images || [] }) =>
            images.length > 0 &&
            images.map((image) => (
              <div key={image} className="show-image">
                <img src={image} key={image} className="img-fluid img-linker" alt={`Pasted: ${image}`} />
                <button type="button" className="img-buttons-times" onClick={() => deleteImage(image)} value="x"></button>
              </div>
            ))
          }
          
        </Gluejar>
      </div>
      <div className="col-xl-12 col-md-12">

        {
          Object.entries(upImages).length > 0 && (
            <button className="btn btn-primary" onClick={() => runOCR(upImages)}>comenzar a leer</button>
          )
        }
      </div>
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
        ocrText.map((text_image, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              {text_image}
            </div>
          </div>
        ))
      }
    </div>
  );
};


