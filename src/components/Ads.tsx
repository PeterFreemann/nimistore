import React from 'react'
import image from '../../public/ads7.jpg'
import image2 from '../../public/ads8.png'
import image3 from '../../public/ads9.jpg'
import image4 from '../../public/ads10.jpg'
import image5 from '../../public/ds5.jpg'
import image6 from '../../public/ads6.jpg'

function Ads() {
  const adsImages = [
    image, image2, image3, image4, image5, image6
  ];

  return (
    <div className="w-full py-8 h bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {adsImages.map((adImage, index) => (
            <div key={index} className="aspect-video bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={adImage.src}
                alt={`Advertisement ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ads