import React, { useState, useEffect } from "react";
import { Gluejar } from "@charliewilco/gluejar";
import Tesseract from 'tesseract.js';
import {ProgressBar} from '../../components/ProgressBar/ProgressBar';
import Swal from "sweetalert2";
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
    if(images_vector.length > 0){
        images_vector.forEach((picture) => {
            Tesseract.recognize(picture, "eng", { logger: m =>  setCurrentProgress(m)}).then(({data: {text}}) => {
                setOcrText((lastOcr) => [...lastOcr, text])
            })
        });
    }else{
        Swal.fire('No hay imagenes', 'Comienza pegando una o varias imagenes de un shipper', 'info')   
    }
  }
  return (
    <div>
      Crear reuqest
      <Gluejar
        onPaste={(files) => {
          setUpImages(files);
        }}
        onError={(err) => Swal.fire('Error', err, 'error')}
      >
        {({ images }) =>
          images.length > 0 &&
          images.map((image) => (
            <img src={image} key={image} alt={`Pasted: ${image}`} />
          ))
        }
      </Gluejar>
      {
          Object.entries(upImages).length > 0 && (
              <button className="btn ptimary" onClick={() => runOCR(upImages)}>comenzar a leer</button>
          )
      }
      {
          !currentProgress.progress ? null : (
              <ProgressBar current={currentProgress.progress} />
          )
      }{
          ocrText.map((text_image, index)=>(
              <p key={index}>{text_image}</p>
          ))
      }
    </div>
  );
};
